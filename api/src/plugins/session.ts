// @middleware/sessionHandler.ts
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { createCipheriv, createDecipheriv, createHmac, createHash, randomBytes } from "node:crypto";
import { nanoid } from "nanoid";
import Redis from "ioredis";
import { Buffer } from "node:buffer";

// --- CONFIGURACIÓN E INTERFACES ---

interface SessionOptions {
  cookieName?: string;
  sessionTtl?: number;
  prefix?: string;
  secretKey: string;
  redisClient: Redis;
  cookieOptions?: {
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
    secure?: boolean;
    path?: string;
  };
}

export type SessionAccessors = {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, value: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  destroy: () => Promise<void>;
  rotate: () => Promise<void>;
  getAll: () => Promise<Record<string, unknown>>;
  count: () => Promise<number>;
};

export type SessionData = {
  id: string;
  store: SessionAccessors;
  userInfo?: string;
};

// Extender los tipos de Fastify para incluir sessions
declare module 'fastify' {
  interface FastifyRequest {
    sessions: {
      [sessionName: string]: SessionData;
    };
  }
}

// --- OPCIONES POR DEFECTO ---
const defaultOptions: Omit<SessionOptions, 'redisClient' | 'secretKey'> & { secretKey?: string } = {
  cookieName: "sessionId",
  sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000,
  prefix: "sessions",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  },
};

// --- LÓGICA DE CRIPTOGRAFÍA Y FIRMA ---

/**
 * Deriva una clave de 32 bytes para cifrado AES-256-GCM a partir de la clave secreta principal.
 */
function getAesKey(secret: string): Buffer {
  return createHash('sha256').update(secret).digest();
}

/**
 * Cifra los datos usando AES-256-GCM.
 */
async function encryptData(data: string, secret: string): Promise<string> {
  const secretKey = getAesKey(secret);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Descifra los datos.
 */
export async function decryptData(encryptedData: string, secret: string): Promise<string | null> {
  try {
    const secretKey = getAesKey(secret);
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
      console.error("Decryption error: Invalid encrypted data format.");
      return null;
    }
    const [ivHex, tagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(tagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    const decipher = createDecipheriv('aes-256-gcm', secretKey, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

/**
 * Firma el sessionId usando la clave secreta como una CADENA DE TEXTO.
 */
function signSessionId(sessionId: string, secret: string): string {
  const hmac = createHmac('sha256', secret);
  hmac.update(sessionId);
  return `${sessionId}.${hmac.digest('hex')}`;
}

/**
 * Verifica la firma del sessionId usando la clave secreta como una CADENA DE TEXTO.
 */
export function verifySessionId(signedSessionId: string, secret: string): string | null {
  const [sessionId, signature] = signedSessionId.split('.');
  if (!sessionId || !signature) return null;

  const hmac = createHmac('sha256', secret);
  hmac.update(sessionId);
  return hmac.digest('hex') === signature ? sessionId : null;
}

/**
 * Generación de ID compatible con Fastify usando nanoid.
 */
function generateSessionId(): string {
  return nanoid();
}

// --- MIDDLEWARE PRINCIPAL PARA FASTIFY ---

export function sessionHandler(options: SessionOptions) {
  if (!options.redisClient) {
    throw new Error("Redis client instance must be provided.");
  }
  if (!options.secretKey) {
    throw new Error("Secret key must be provided.");
  }

  const {
    cookieName = defaultOptions.cookieName!,
    sessionTtl = defaultOptions.sessionTtl!,
    prefix = defaultOptions.prefix!,
    secretKey,
    redisClient,
    cookieOptions = {},
  } = options;

  const finalCookieOptions = {
    ...defaultOptions.cookieOptions,
    ...cookieOptions,
    secure: cookieOptions.secure ?? (process.env.NODE_ENV === "production"),
  };

  const sessionTtlSeconds = Math.floor(sessionTtl / 1000);

  return async function middleware(request: FastifyRequest, reply: FastifyReply) {
    console.log(`🟢 Session Middleware (${cookieName}) Active 🟢 for URL: ${request.url}`);

    try {
      if (!request.sessions) {
        request.sessions = {};
      }

      let signedSessionIdFromCookie = request.cookies[cookieName];
      let currentSessionId: string | null = null;

      if (signedSessionIdFromCookie) {
        currentSessionId = verifySessionId(signedSessionIdFromCookie, secretKey);
        if (currentSessionId && !(await redisClient.exists(`${prefix}:${currentSessionId}`))) {
          console.warn(`Session ID ${currentSessionId} valid signature but not found in Redis. Generating new session.`);
          currentSessionId = null;
        }
      }

      let signedSessionId: string;
      if (!currentSessionId) {
        currentSessionId = generateSessionId();
        signedSessionId = signSessionId(currentSessionId, secretKey);
        await redisClient.hset(`${prefix}:${currentSessionId}`, "created_at", Date.now());
        await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
        console.log(`New session (${cookieName}) created: ${currentSessionId}`);
      } else {
        await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
        signedSessionId = signedSessionIdFromCookie!;
      }

      let isSessionDestroyed = false;
      let isSessionRotated = false;
      let newSignedSessionIdForCookie = signedSessionId;

      const sessionStoreAccessors: SessionAccessors = {
        get: async <T>(key: string): Promise<T | null> => {
          if (!currentSessionId) return null;
          const result = await redisClient.hget(`${prefix}:${currentSessionId}`, key);
          if (result) {
            const decrypted = await decryptData(result, secretKey);
            return decrypted ? JSON.parse(decrypted) as T : null;
          }
          return null;
        },
        set: async (key: string, value: unknown) => {
          // 🔥 LÓGICA DE INICIALIZACIÓN AUTOMÁTICA 🔥
          // Si no hay sesión actual, crear una nueva automáticamente
          if (!currentSessionId) {
            console.log(`🚀 Auto-creating session (${cookieName}) because data is being set`);
            currentSessionId = generateSessionId();
            signedSessionId = signSessionId(currentSessionId, secretKey);
            newSignedSessionIdForCookie = signedSessionId;
            
            // Crear la sesión en Redis
            await redisClient.hset(`${prefix}:${currentSessionId}`, "created_at", Date.now());
            await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
            
            // Actualizar el objeto de sesión en el request
            request.sessions[cookieName].id = newSignedSessionIdForCookie;
            
            console.log(`✅ Auto-created session (${cookieName}): ${currentSessionId}`);
          }
          
          const encrypted = await encryptData(JSON.stringify(value), secretKey);
          await redisClient.hset(`${prefix}:${currentSessionId}`, key, encrypted);
          await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
        },
        delete: async (key: string) => {
          // 🔥 LÓGICA DE INICIALIZACIÓN AUTOMÁTICA 🔥
          // Si no hay sesión actual, crear una nueva automáticamente
          if (!currentSessionId) {
            console.log(`🚀 Auto-creating session (${cookieName}) because delete operation was called`);
            currentSessionId = generateSessionId();
            signedSessionId = signSessionId(currentSessionId, secretKey);
            newSignedSessionIdForCookie = signedSessionId;
            
            // Crear la sesión en Redis
            await redisClient.hset(`${prefix}:${currentSessionId}`, "created_at", Date.now());
            await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
            
            // Actualizar el objeto de sesión en el request
            request.sessions[cookieName].id = newSignedSessionIdForCookie;
            
            console.log(`✅ Auto-created session (${cookieName}): ${currentSessionId}`);
            return; // No hay nada que eliminar en una sesión nueva
          }
          
          await redisClient.hdel(`${prefix}:${currentSessionId}`, key);
          await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
        },
        destroy: async () => {
          if (!currentSessionId) return;
          await redisClient.del(`${prefix}:${currentSessionId}`);
          isSessionDestroyed = true;
          newSignedSessionIdForCookie = "";
          console.log(`Session (${cookieName}) ${currentSessionId} destroyed.`);
        },
        rotate: async () => {
          // 🔥 LÓGICA DE INICIALIZACIÓN AUTOMÁTICA 🔥
          // Si no hay sesión actual, crear una nueva automáticamente
          if (!currentSessionId) {
            console.log(`🚀 Auto-creating session (${cookieName}) because rotate operation was called`);
            currentSessionId = generateSessionId();
            signedSessionId = signSessionId(currentSessionId, secretKey);
            newSignedSessionIdForCookie = signedSessionId;
            
            // Crear la sesión en Redis
            await redisClient.hset(`${prefix}:${currentSessionId}`, "created_at", Date.now());
            await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
            
            // Actualizar el objeto de sesión en el request
            request.sessions[cookieName].id = newSignedSessionIdForCookie;
            
            console.log(`✅ Auto-created session (${cookieName}): ${currentSessionId}`);
            return; // La sesión ya está "rotada" porque es nueva
          }
          
          const oldSessionKey = `${prefix}:${currentSessionId}`;
          const newPlainSessionId = generateSessionId();
          const newSessionKey = `${prefix}:${newPlainSessionId}`;
          try {
            await redisClient.rename(oldSessionKey, newSessionKey);
            console.log(`Session (${cookieName}) rotated from ${currentSessionId} to ${newPlainSessionId}.`);
            currentSessionId = newPlainSessionId;
            newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
            isSessionRotated = true;
            if (request.sessions && request.sessions[cookieName]) {
              request.sessions[cookieName].id = newSignedSessionIdForCookie;
            }
          } catch(e) {
            if ((e as Error).message.includes("no such key")) {
              console.warn(`Attempted to rotate non-existent session ${currentSessionId}. Generating new session.`);
              currentSessionId = generateSessionId();
              newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
              await redisClient.hset(`${prefix}:${currentSessionId}`, "created_at", Date.now());
              await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
              isSessionRotated = true;
              if (request.sessions && request.sessions[cookieName]) {
                request.sessions[cookieName].id = newSignedSessionIdForCookie;
              }
            } else {
              console.error(`Error rotating session ${currentSessionId}:`, e);
              throw e;
            }
          }
        },
        getAll: async (): Promise<Record<string, unknown>> => {
          if (!currentSessionId) return {};
          const allData: Record<string, unknown> = {};
          const redisData = await redisClient.hgetall(`${prefix}:${currentSessionId}`);
          for (const key in redisData) {
            if (key !== "created_at") {
              const decrypted = await decryptData(redisData[key], secretKey);
              if (decrypted) {
                try {
                  allData[key] = JSON.parse(decrypted);
                } catch (e) {
                  console.error(`Error parsing JSON for key ${key} in session ${currentSessionId}:`, e);
                  allData[key] = null;
                }
              } else {
                allData[key] = null;
              }
            }
          }
          return allData;
        },
        count: async (): Promise<number> => {
          if (!currentSessionId) return 0;
          const len = await redisClient.hlen(`${prefix}:${currentSessionId}`);
          return len > 0 ? len - 1 : 0;
        },
      };

      request.sessions[cookieName] = {
        id: newSignedSessionIdForCookie,
        store: sessionStoreAccessors,
      };

      (request as any).session = {
        get: async (key: string) => sessionStoreAccessors.get(key),
        set: async (key: string, value: unknown) => sessionStoreAccessors.set(key, value),
        destroy: async () => sessionStoreAccessors.destroy(),
        // Opcional: puedes agregar más métodos si otro plugin los requiere
      };

      // Configurar la cookie en el reply (incluso si la sesión se creó automáticamente)
      if (isSessionDestroyed) {
        reply.clearCookie(cookieName);
      } else {
        // Solo establecer la cookie si hay una sesión (creada automáticamente o existente)
        if (newSignedSessionIdForCookie) {
          reply.setCookie(cookieName, newSignedSessionIdForCookie, {
            maxAge: sessionTtlSeconds * 1000, // Fastify espera milisegundos
            httpOnly: finalCookieOptions.httpOnly,
            sameSite: finalCookieOptions.sameSite,
            secure: finalCookieOptions.secure,
            path: finalCookieOptions.path,
          });
        }
      }

    } catch (error) {
      console.error(`Session middleware (${cookieName}) error:`, error);
      reply.code(500).send({ error: "Internal Server Error during session processing" });
    }
  };
}

// --- FUNCIÓN DESTRUIR TODAS LAS SESIONES ---
export async function destroyAllSessions(redisClient: Redis, prefix: string = "sessions") {
  try {
    const keys = await redisClient.keys(`${prefix}:*`);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
    console.log(`All (${keys.length} keys) sessions destroyed for prefix ${prefix}`);
  } catch (error) {
    console.error("Error destroying all sessions:", error);
    throw error;
  }
}

// --- PLUGIN PARA FASTIFY ---
export async function sessionPlugin(fastify: FastifyInstance, opts: SessionOptions) {
  // Registrar el decorador requerido por @fastify/flash
  

  // Registrar el middleware de sesión
  fastify.addHook('preHandler', sessionHandler(opts));
  
}

// --- EJEMPLO DE USO CON IOREDIS Y INICIALIZACIÓN AUTOMÁTICA ---
/*
import Fastify from 'fastify';
import Redis from 'ioredis';
import { sessionPlugin } from './middleware/sessionHandler';

const fastify = Fastify({ logger: true });

// 🔥 Configurar IORedis (mucho mejor rendimiento) 🔥
const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0,
  // 🚀 Configuraciones adicionales para mejor rendimiento
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
  lazyConnect: true,
  // 🔥 Pool de conexiones para mejor rendimiento asíncrono
  family: 4,
  keepAlive: true,
  // 🚀 Configuraciones para Redis Cluster (si usas cluster)
  // enableOfflineQueue: false,
});

// 🔥 Manejo de errores de Redis
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('🔥 Connected to Redis with IORedis!');
});

// Registrar el plugin de sesión
await fastify.register(sessionPlugin, {
  secretKey: 'your-secret-key-here',
  redisClient,
  cookieName: 'myapp-session',
  sessionTtl: 24 * 60 * 60 * 1000, // 24 horas
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  }
});

// 🔥 EJEMPLO: Operaciones asíncronas con IORedis 🔥
fastify.get('/bulk-operations', async (request, reply) => {
  const session = request.sessions['myapp-session'];
  
  // ✅ IORedis maneja múltiples operaciones asíncronas mejor
  const promises = [];
  
  // Configurar múltiples valores de sesión de forma asíncrona
  promises.push(session.store.set('user', { id: 123, name: 'John Doe' }));
  promises.push(session.store.set('preferences', { theme: 'dark', lang: 'es' }));
  promises.push(session.store.set('cart', { items: [], total: 0 }));
  promises.push(session.store.set('loginTime', new Date().toISOString()));
  
  // ✅ Ejecutar todas las operaciones en paralelo
  await Promise.all(promises);
  
  // ✅ Obtener estadísticas de sesión
  const sessionCount = await session.store.count();
  const allData = await session.store.getAll();
  
  return { 
    message: 'Bulk operations completed with IORedis',
    sessionId: session.id,
    dataCount: sessionCount,
    data: allData
  };
});

// 🔥 EJEMPLO: Pipeline de Redis para operaciones ultra-rápidas 🔥
fastify.get('/pipeline-example', async (request, reply) => {
  const session = request.sessions['myapp-session'];
  
  // ✅ Usar pipeline de IORedis para máximo rendimiento
  const pipeline = redisClient.pipeline();
  
  // Añadir operaciones al pipeline
  pipeline.hset('temp:stats', 'visits', 1);
  pipeline.hset('temp:stats', 'lastVisit', Date.now());
  pipeline.expire('temp:stats', 3600); // 1 hora
  
  // Ejecutar pipeline
  const results = await pipeline.exec();
  
  // También usar sesión normal
  await session.store.set('pipelineTest', { executed: true, results: results?.length });
  
  return { 
    message: 'Pipeline executed successfully',
    pipelineResults: results?.length,
    sessionId: session.id
  };
});

// Iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('🚀 Server listening on port 3000');
    console.log('🔥 Using IORedis for better async performance!');
    console.log('📦 Sessions will be created automatically when you add data!');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
*/