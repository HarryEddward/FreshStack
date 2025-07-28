/* 

// @middleware/sessionHandler.ts
import { FreshContext } from "$fresh/server.ts";
import { createHmac } from "node:crypto";
import { decodeBase64 } from "$std/encoding/base64.ts";
import { isStaticRoute } from '../utils/routing/staticFiles.ts';
// import { isAnApiRoute } from "@utils/routing/apiRoutes.ts"; // Comentado si no se usa

interface SessionOptions {
  cookieName?: string;
  sessionTtl?: number;
  maxSessions?: number;
  kvPrefix?: string;
  secretKey: string;
  cookieOptions?: {
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
    path?: string;
  };
}

// Acciones que puedes realizar con una sesión específica
export type SessionAccessors = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  destroy: () => Promise<void>;
  rotate: () => Promise<void>;
  getAll: () => Promise<Record<string, unknown>>; // NUEVO: Obtener todos los datos
  count: () => Promise<number>; // NUEVO: Contar elementos de datos
};

// Detalles para una instancia de sesión particular
export type SessionContextData = {
  id: string; // El ID de sesión firmado para ESTA cookie
  store: SessionAccessors; // Las funciones para interactuar con el almacenamiento de ESTA sesión
  userInfo?: string; // Si la información del usuario es específica de este contexto de sesión
};

// El estado global de Fresh, modificado para albergar múltiples sesiones
export type State = {
  sessions: {
    [sessionName: string]: SessionContextData;
  };
  translation?: string;
  lang?: string;
};

const defaultOptions: SessionOptions = {
  cookieName: "sessionId",
  sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000, // 4 minutos por defecto, ajusta según necesidad
  maxSessions: 1000,
  kvPrefix: "sessions",
  secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change",
  cookieOptions: {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    path: "/",
  },
};

async function encryptData(data: string, secret: string): Promise<string> {
  try {
    const keyBytes = decodeBase64(secret);
    if (keyBytes.length !== 32) {
      throw new Error(`Invalid key length: expected 32 bytes, got ${keyBytes.length}`);
    }
    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      new TextEncoder().encode(data)
    );
    const ivHex = Array.from(iv)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const encryptedHex = Array.from(new Uint8Array(encrypted))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return `${ivHex}:${encryptedHex}`;
  } catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }
}

export async function decryptData(encryptedData: string, secret: string): Promise<string | null> {
  try {
    const [ivHex, encryptedHex] = encryptedData.split(":");
    if (!ivHex || !encryptedHex) { // Verificación básica del formato
        console.error("Decryption error: Invalid encrypted data format");
        return null;
    }
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
    const encrypted = new Uint8Array(
      encryptedHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    const keyBytes = decodeBase64(secret);
    if (keyBytes.length !== 32) {
      throw new Error(`Invalid key length: expected 32 bytes, got ${keyBytes.length}`);
    }
    const key = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encrypted
    );
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

function signSessionId(sessionId: string, secret: string): string {
  const hmac = createHmac("sha256", secret);
  hmac.update(sessionId);
  return `${sessionId}.${hmac.digest("hex")}`;
}

export function verifySessionId(signedSessionId: string, secret: string): string | null {
  const parts = signedSessionId.split(".");
  if (parts.length !== 2) return null; // Asegurarse de que hay dos partes
  const [sessionId, signature] = parts;
  const hmac = createHmac("sha256", secret);
  hmac.update(sessionId);
  if (signature === hmac.digest("hex")) return sessionId;
  return null;
}

export function getSessionIdFromCookies(req: Request, cookieName: string): string | null {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const parts = cookie.split("=");
    if (parts[0] === cookieName) {
      return parts[1];
    }
  }
  return null;
}

function generateSessionId(): string {
  return crypto.randomUUID();
}

async function cleanupOldSessions(kv: Deno.Kv, prefix: string, maxSessions: number) {
  try {
    const sessions = new Map<string, number>();
    let count = 0;

    for await (const entry of kv.list({ prefix: [prefix] })) {
      const keyParts = entry.key as string[]; // e.g., [kvPrefix, sessionId, "created_at"]
      if (keyParts.length > 1) { // Asegurarse de que hay un sessionId
        const sessionId = keyParts[1];
        if (!sessions.has(sessionId)) {
          // Optimizamos: solo necesitamos contar sesiones distintas, no leer 'created_at' aquí
          // si ya tenemos la entrada. El createdAt se usará solo para ordenar si excedemos maxSessions.
          sessions.set(sessionId, 0); // Placeholder para la fecha, se llenará si es necesario
          count++;
        }
      }
    }
    
    if (count > maxSessions) {
        // Solo si excedemos maxSessions, obtenemos los `created_at` para ordenar
        for (const sessionId of sessions.keys()) {
            const createdAtEntry = await kv.get([prefix, sessionId, "created_at"]);
            sessions.set(sessionId, (createdAtEntry.value as number) || Date.now());
        }

      console.log(`Cleaning up ${count - maxSessions} old sessions for prefix ${prefix}`);
      const sortedSessions = Array.from(sessions.entries()).sort((a, b) => a[1] - b[1]);
      const toDelete = sortedSessions.slice(0, count - maxSessions);

      for (const [sessionIdToDelete] of toDelete) {
        const entriesToDelete = kv.list({ prefix: [prefix, sessionIdToDelete] });
        for await (const entry of entriesToDelete) {
          await kv.delete(entry.key);
        }
        console.log(`Deleted old session ${sessionIdToDelete} for prefix ${prefix}`);
      }
    }
  } catch (error) {
    console.error("Error cleaning up old sessions:", error);
  }
}

export function sessionHandler(options: SessionOptions = defaultOptions) {
  const {
    cookieName = defaultOptions.cookieName!,
    sessionTtl = defaultOptions.sessionTtl!,
    maxSessions = defaultOptions.maxSessions!,
    kvPrefix = defaultOptions.kvPrefix!,
    secretKey = defaultOptions.secretKey,
    cookieOptions = {},
  } = options;

  const finalCookieOptions = {
    ...defaultOptions.cookieOptions,
    ...cookieOptions,
    secure: cookieOptions.secure ?? (Deno.env.get("ENV") === "production"),
  };

  return async function middleware(req: Request, ctx: FreshContext<State>, next: () => Promise<Response>) {
    
    const staticExtensions = [".css", ".svg", ".js", ".map", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".xml", ".webmanifest", ".txt", ".json"]; // Añadido .map, .webmanifest, .txt
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    if (isStaticRoute(req.url) || staticExtensions.some((ext) => pathname.endsWith(ext))) {
      // No loguear para cada archivo estático para no llenar la consola
      // console.log(`🟡 SKIPPING SESSION HANDLER for static route: ${req.url}`);
      return await next();
    }

    console.log(`🟢 Session Middleware (${cookieName}) Active 🟢 for URL: ${req.url}`);

    try {
      const kv = await Deno.openKv();
      if (!ctx.state.sessions) {
        ctx.state.sessions = {};
      }

      let signedSessionIdFromCookie = getSessionIdFromCookies(req, cookieName);
      let signedSessionId = signedSessionIdFromCookie;
      let currentSessionId: string | undefined;
      // let isNewSession = false; // No se usa, se puede quitar si no se añade lógica que la necesite

      if (signedSessionId) {
        currentSessionId = verifySessionId(signedSessionId, secretKey);
        if (!currentSessionId) {
          console.warn(`Invalid ${cookieName} signature for "${signedSessionId}", generating new session.`);
          signedSessionId = undefined; 
        }
      }

      if (!signedSessionId || !currentSessionId) {
        currentSessionId = generateSessionId();
        signedSessionId = signSessionId(currentSessionId, secretKey);
        // isNewSession = true;
        await kv.set([kvPrefix, currentSessionId, "created_at"], Date.now(), { expireIn: sessionTtl });
        console.log(`New session (${cookieName}) created: ${currentSessionId}`);
      }

      await cleanupOldSessions(kv, kvPrefix, maxSessions);

      const createdAtEntry = await kv.get([kvPrefix, currentSessionId!, "created_at"]); // currentSessionId no será undefined aquí
      if (!createdAtEntry.value || (Date.now() - (createdAtEntry.value as number) > sessionTtl)) {
        console.log(`${cookieName} session ${currentSessionId} expired or invalid, destroying and creating new.`);
        const entries = kv.list({ prefix: [kvPrefix, currentSessionId!] });
        for await (const entry of entries) {
         await kv.delete(entry.key);
        }
        currentSessionId = generateSessionId(); 
        signedSessionId = signSessionId(currentSessionId, secretKey); 
        // isNewSession = true;
        await kv.set([kvPrefix, currentSessionId, "created_at"], Date.now(), { expireIn: sessionTtl });
        console.log(`Recreated session (${cookieName}): ${currentSessionId}`);
      }

      let isSessionDestroyed = false;
      let isSessionRotated = false;
      let newSignedSessionIdForCookie = signedSessionId; 

      const sessionStoreAccessors: SessionAccessors = {
        get: async (key: string) => {
          if (!currentSessionId) return null; // Seguridad extra
          const result = await kv.get([kvPrefix, currentSessionId, key]);
          if (result.value) {
            const decrypted = await decryptData(result.value as string, secretKey);
            return decrypted ? JSON.parse(decrypted) : null;
          }
          return null;
        },
        set: async (key: string, value: unknown) => {
          if (!currentSessionId) throw new Error("Session ID not available for set operation.");
          const encrypted = await encryptData(JSON.stringify(value), secretKey);
          await kv.set([kvPrefix, currentSessionId, key], encrypted, { expireIn: sessionTtl });
        },
        delete: async (key: string) => {
          if (!currentSessionId) return; // Seguridad extra
          await kv.delete([kvPrefix, currentSessionId, key]);
        },
        destroy: async () => {
          if (!currentSessionId) return; // Seguridad extra
          const entriesToDestroy = kv.list({ prefix: [kvPrefix, currentSessionId] });
          for await (const entry of entriesToDestroy) {
            await kv.delete(entry.key);
          }
          isSessionDestroyed = true;
          
          // Generamos nuevo ID para la cookie para invalidar la anterior del lado del cliente también.
          // La sesión en KV ya está vacía. No es necesario crear una nueva entrada "created_at"
          // hasta que se intente usar la sesión de nuevo (lo que ocurrirá en la siguiente petición).
          const newPlainId = generateSessionId(); // No se usa 'currentSessionId' aquí
          newSignedSessionIdForCookie = signSessionId(newPlainId, secretKey); // Un ID falso para la cookie
          // No actualizamos currentSessionId aquí, se regenerará en la próxima solicitud si es necesario.
          
          console.log(`Session (${cookieName}) ${currentSessionId} destroyed.`);
          // El estado de ctx.state.sessions[cookieName].id se actualizará con este newSignedSessionIdForCookie
          // para que la cookie saliente sea este nuevo ID "vacío" o "inválido".
          // La próxima vez que el cliente envíe este ID, no se encontrará y se creará una nueva sesión.
        },
        rotate: async () => {
          if (!currentSessionId) throw new Error("Session ID not available for rotate operation.");
          const newPlainSessionId = generateSessionId();
          const entries = kv.list({ prefix: [kvPrefix, currentSessionId] });
          let oldCreatedAt = Date.now(); // Por si no se encuentra el created_at

          for await (const entry of entries) {
            const entryKeySuffix = entry.key[entry.key.length -1] as string;
            if (entryKeySuffix === "created_at") {
                oldCreatedAt = entry.value as number; // Guardar el created_at original
            } else {
                // Copiar los datos tal cual (ya están encriptados)
                await kv.set([kvPrefix, newPlainSessionId, entryKeySuffix], entry.value, { expireIn: sessionTtl });
            }
          }
          // Usar el created_at original o el actual si no se encontró (poco probable)
          await kv.set([kvPrefix, newPlainSessionId, "created_at"], oldCreatedAt, { expireIn: sessionTtl });

          const oldEntries = kv.list({ prefix: [kvPrefix, currentSessionId] });
          for await (const entry of oldEntries) {
            await kv.delete(entry.key);
          }
          
          console.log(`Session (${cookieName}) rotated from ${currentSessionId} to ${newPlainSessionId}.`);
          currentSessionId = newPlainSessionId; 
          newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
          isSessionRotated = true;
          if (ctx.state.sessions && ctx.state.sessions[cookieName]) {
            ctx.state.sessions[cookieName].id = newSignedSessionIdForCookie;
          }
        },
        getAll: async (): Promise<Record<string, unknown>> => {
          if (!currentSessionId) return {}; // Seguridad extra
          const allData: Record<string, unknown> = {};
          const entries = kv.list({ prefix: [kvPrefix, currentSessionId] });
          for await (const entry of entries) {
            const entryKeySuffix = entry.key[entry.key.length - 1] as string;
            if (entryKeySuffix !== "created_at") {
              if (entry.value) {
                const decrypted = await decryptData(entry.value as string, secretKey);
                if (decrypted) {
                  try {
                    allData[entryKeySuffix] = JSON.parse(decrypted);
                  } catch (e) {
                    console.error(`Error parsing JSON for key ${entryKeySuffix} in session ${currentSessionId}:`, e);
                    allData[entryKeySuffix] = null; // O manejar de otra forma
                  }
                } else {
                  allData[entryKeySuffix] = null; // Fallo en desencriptación
                }
              }
            }
          }
          return allData;
        },
        count: async (): Promise<number> => {
          if (!currentSessionId) return 0; // Seguridad extra
          let dataCount = 0;
          const entries = kv.list({ prefix: [kvPrefix, currentSessionId] });
          for await (const entry of entries) {
            const entryKeySuffix = entry.key[entry.key.length - 1] as string;
            if (entryKeySuffix !== "created_at") {
              dataCount++;
            }
          }
          return dataCount;
        },
      };

      ctx.state.sessions[cookieName] = {
        id: newSignedSessionIdForCookie,
        store: sessionStoreAccessors,
      };

      const response = await next();

      if (!(response instanceof Response)) {
        console.warn(`Middleware (${cookieName}) received a non-Response object from next(). This should not happen.`);
        // Intenta crear una respuesta de error genérica si es posible, o simplemente re-lanza si es crítico.
        return new Response("Internal Server Error from middleware chain", { status: 500 });
       }

      // Solo establecer la cookie si no es una ruta estática
      if (!isStaticRoute(req.url) && !staticExtensions.some((ext) => pathname.endsWith(ext))) {
        let cookieValue = newSignedSessionIdForCookie;
        let maxAge = Math.floor(sessionTtl / 1000);

        if (isSessionDestroyed && !isSessionRotated) {
            // Si la sesión fue destruida y no inmediatamente rotada a una nueva con datos,
            // queremos que la cookie expire inmediatamente.
            // El newSignedSessionIdForCookie ya es un ID "falso" o nuevo y vacío.
            // Podríamos también enviar un valor vacío para la cookie, pero enviar un ID basura
            // y Max-Age=0 es más estándar para eliminarla.
            cookieValue = ""; // Opcional: algunos prefieren enviar un valor vacío.
            maxAge = 0;
        }
        
        const cookieParts = [
          `${cookieName}=${cookieValue}`,
          `Max-Age=${maxAge}`,
          finalCookieOptions.httpOnly ? "HttpOnly" : "",
          `SameSite=${finalCookieOptions.sameSite}`,
          `Path=${finalCookieOptions.path}`,
          finalCookieOptions.secure ? "Secure" : "",
        ].filter(Boolean);

        try {
          response.headers.append("Set-Cookie", cookieParts.join("; "));
        } catch (error) {
          console.error(`Error setting cookie ${cookieName} for ${req.url}:`, error);
        }
      }
      return response;
    } catch (error) {
      console.error(`Session middleware (${cookieName}) error:`, error);
      // Considera devolver una respuesta de error más informativa o una página de error
      return new Response("Internal Server Error during session processing", { status: 500 });
    }
  };
}

export async function destroyAllSessions(kvPrefix: string = "sessions") {
  try {
    const kv = await Deno.openKv();
    const entries = kv.list({ prefix: [kvPrefix] }); // Esto lista todas las sesiones bajo este prefijo general
    let deletedCount = 0;
    for await (const entry of entries) {
      await kv.delete(entry.key);
      deletedCount++;
    }
    console.log(`All (${deletedCount} entries) sessions destroyed for prefix ${kvPrefix}`);
  } catch (error) {
    console.error("Error destroying all sessions:", error);
    throw error;
  }
}

*/
/*
// @middleware/sessionHandler.ts
import { FreshContext } from "$fresh/server.ts";
import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "node:crypto";
import { decodeBase64 } from "$std/encoding/base64.ts";
import { createClient, RedisClientType } from "npm:redis"; // Importar el cliente de Redis
import { isStaticRoute } from '../utils/routing/staticFiles.ts';
import { Buffer } from "node:buffer";

// --- CONFIGURACIÓN E INTERFACES ---

interface SessionOptions {
  cookieName?: string;
  sessionTtl?: number; // TTL en milisegundos, como en Deno.Kv
  // maxSessions?: number; // No es necesario para Redis con TTL
  prefix?: string;
  secretKey: string;
  redisClient: RedisClientType; // ¡NUEVO! Pasa el cliente de Redis
  cookieOptions?: {
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
    path?: string;
  };
}

// Acciones que puedes realizar con una sesión específica
export type SessionAccessors = {
  get: <T>(key: string) => Promise<T | null>; // Añadido genérico para mejor tipado
  set: (key: string, value: unknown) => Promise<void>;
  delete: (key: string) => Promise<void>;
  destroy: () => Promise<void>;
  rotate: () => Promise<void>;
  getAll: () => Promise<Record<string, unknown>>;
  count: () => Promise<number>;
};

// Detalles para una instancia de sesión particular
export type SessionContextData = {
  id: string; // El ID de sesión firmado para ESTA cookie
  store: SessionAccessors; // Las funciones para interactuar con el almacenamiento de ESTA sesión
  userInfo?: string; // Si la información del usuario es específica de este contexto de sesión
};

// El estado global de Fresh, modificado para albergar múltiples sesiones
export type State = {
  sessions: {
    [sessionName: string]: SessionContextData;
  };
  translation?: string;
  lang?: string;
};

// --- OPCIONES POR DEFECTO (Ajustadas para Redis y TTL) ---
// Notar que `defaultOptions` ya no incluye `redisClient` ya que debe ser inyectado.
const defaultOptions: Omit<SessionOptions, 'redisClient' | 'secretKey'> & { secretKey?: string } = {
  cookieName: "sessionId",
  sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000, // 10 años en ms
  prefix: "sessions",
  cookieOptions: {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    path: "/",
  },
};

// --- LÓGICA DE ENCRIPTACIÓN Y FIRMA (Sin cambios, es independiente del almacenamiento) ---
// --- LÓGICA DE CRIPTOGRAFÍA Y FIRMA (MODIFICADA PARA COMPATIBILIDAD) ---

// Secreto como Buffer para crypto de Node
let _secretKeyBuffer: Buffer;

function getSecretKeyBuffer(secret: string): Buffer {
    if (!_secretKeyBuffer) {
        _secretKeyBuffer = Buffer.from(secret, 'base64');
        if (_secretKeyBuffer.length !== 32) {
            throw new Error('Secret key must be a base64-encoded 32-byte string');
        }
    }
    return _secretKeyBuffer;
}

async function encryptData(data: string, secret: string): Promise<string> {
    const secretKey = getSecretKeyBuffer(secret);
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    // Formato compatible con Fastify: iv:authTag:encrypted
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

export async function decryptData(encryptedData: string, secret: string): Promise<string | null> {
    try {
        const secretKey = getSecretKeyBuffer(secret);
        const parts = encryptedData.split(':');
        if (parts.length !== 3) {
            console.error("Decryption error: Invalid encrypted data format (expected 3 parts).");
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

function signSessionId(sessionId: string, secret: string): string {
    const secretKey = getSecretKeyBuffer(secret);
    const hmac = createHmac('sha256', secretKey); // Usar el buffer de la clave
    hmac.update(sessionId);
    return `${sessionId}.${hmac.digest('hex')}`;
}

export function verifySessionId(signedSessionId: string, secret: string): string | null {
    const secretKey = getSecretKeyBuffer(secret);
    const [sessionId, signature] = signedSessionId.split('.');
    if (!sessionId || !signature) return null;

    const hmac = createHmac('sha256', secretKey);
    hmac.update(sessionId);
    return hmac.digest('hex') === signature ? sessionId : null;
}

export function getSessionIdFromCookies(req: Request, cookieName: string): string | null {
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
        const [name, ...rest] = cookie.split("=");
        if (name === cookieName) {
            return rest.join("=");
        }
    }
    return null;
}

// Generación de ID compatible con Fastify/express-session
function generateSessionId(): string {
    return randomBytes(16).toString('hex');
}

// --- LIMPIEZA DE SESIONES (Reemplazada para Redis) ---
// La función `cleanupOldSessions` específica de Deno.Kv no es necesaria en Redis
// porque Redis maneja la expiración de claves con TTL automáticamente.
// Hemos eliminado `maxSessions` de las opciones del middleware ya que Redis no lo utiliza de la misma forma.

// --- MIDDLEWARE PRINCIPAL (Refactorizado para Redis) ---

export function sessionHandler(options: SessionOptions) {
  // Asegurarse de que el cliente Redis y la clave secreta estén presentes
  if (!options.redisClient) {
    throw new Error("Redis client instance must be provided to sessionHandler options.");
  }
  if (!options.secretKey) {
    throw new Error("Secret key must be provided to sessionHandler options.");
  }

  const {
    cookieName = defaultOptions.cookieName!,
    sessionTtl = defaultOptions.sessionTtl!, // TTL en ms
    // maxSessions ya no se usa
    prefix = defaultOptions.prefix!,
    secretKey,
    redisClient, // Extraemos el cliente de Redis
    cookieOptions = {},
  } = options;

  const finalCookieOptions = {
    ...defaultOptions.cookieOptions,
    ...cookieOptions,
    secure: cookieOptions.secure ?? (Deno.env.get("ENV") === "production"),
  };

  const sessionTtlSeconds = Math.floor(sessionTtl / 1000); // Convertir TTL a segundos para Redis

  return async function middleware(req: Request, ctx: FreshContext<State>, next: () => Promise<Response>) {
    
    const staticExtensions = [".css", ".svg", ".js", ".map", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".xml", ".webmanifest", ".txt", ".json"];
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    if (isStaticRoute(req.url) || staticExtensions.some((ext) => pathname.endsWith(ext))) {
      return await next();
    }

    console.log(`🟢 Session Middleware (${cookieName}) Active 🟢 for URL: ${req.url}`);

    try {
      if (!ctx.state.sessions) {
        ctx.state.sessions = {};
      }

      let signedSessionIdFromCookie = getSessionIdFromCookies(req, cookieName);
      let currentSessionId: string | null = null;

      if (signedSessionIdFromCookie) {
        currentSessionId = verifySessionId(signedSessionIdFromCookie, secretKey);
        // Además de verificar la firma, comprueba si la sesión existe en Redis
        if (currentSessionId && !(await redisClient.exists(`${prefix}:${currentSessionId}`))) {
          console.warn(`Session ID ${currentSessionId} not found in Redis or expired. Generating new session.`);
          currentSessionId = null; // Fuerza la creación de una nueva sesión
        }
      }

      let signedSessionId: string;
      if (!currentSessionId) {
        currentSessionId = generateSessionId();
        signedSessionId = signSessionId(currentSessionId, secretKey);
        // Inicializa la sesión en Redis con un campo `created_at` y el TTL
        await redisClient.hSet(`${prefix}:${currentSessionId}`, "created_at", Date.now());
        await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
        console.log(`New session (${cookieName}) created: ${currentSessionId}`);
      } else {
        // Si la sesión existe y es válida, refresca su TTL para mantenerla viva
        await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
        signedSessionId = signedSessionIdFromCookie!; // Usamos el que ya teníamos si es válido
      }

      // La lógica de `cleanupOldSessions` no se necesita aquí.
      // La lógica de expiración de `createdAtEntry` tampoco es necesaria porque Redis TTL lo maneja.

      let isSessionDestroyed = false;
      let isSessionRotated = false; // Mantenemos para la lógica de la cookie
      let newSignedSessionIdForCookie = signedSessionId; 

      const sessionStoreAccessors: SessionAccessors = {
        get: async <T>(key: string): Promise<T | null> => {
          if (!currentSessionId) return null;
          const result = await redisClient.hGet(`${prefix}:${currentSessionId}`, key);
          if (result) {
            const decrypted = await decryptData(result, secretKey);
            return decrypted ? JSON.parse(decrypted) as T : null;
          }
          return null;
        },
        set: async (key: string, value: unknown) => {
          if (!currentSessionId) throw new Error("Session ID not available for set operation.");
          const encrypted = await encryptData(JSON.stringify(value), secretKey);
          await redisClient.hSet(`${prefix}:${currentSessionId}`, key, encrypted);
          await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds); // Refrescar TTL
        },
        delete: async (key: string) => {
          if (!currentSessionId) return;
          await redisClient.hDel(`${prefix}:${currentSessionId}`, key);
          await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds); // Refrescar TTL
        },
        destroy: async () => {
          if (!currentSessionId) return;
          await redisClient.del(`${prefix}:${currentSessionId}`);
          isSessionDestroyed = true;
          // No necesitamos generar un nuevo ID aquí para la cookie, simplemente la borraremos.
          // El próximo request generará una sesión completamente nueva si es necesario.
          newSignedSessionIdForCookie = ""; // Señal para la cookie que será eliminada
          console.log(`Session (${cookieName}) ${currentSessionId} destroyed.`);
        },
        rotate: async () => {
          if (!currentSessionId) throw new Error("Session ID not available for rotate operation.");
          const oldSessionKey = `${prefix}:${currentSessionId}`;
          const newPlainSessionId = generateSessionId();
          const newSessionKey = `${prefix}:${newPlainSessionId}`;
          
          try {
            // Renombrar la clave hash en Redis, esto es atómico y preserva el TTL
            await redisClient.rename(oldSessionKey, newSessionKey);
            
            console.log(`Session (${cookieName}) rotated from ${currentSessionId} to ${newPlainSessionId}.`);
            currentSessionId = newPlainSessionId; 
            newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
            isSessionRotated = true;
            // Si la sesión se rotó, actualizamos el ID en el estado de Fresh
            if (ctx.state.sessions && ctx.state.sessions[cookieName]) {
              ctx.state.sessions[cookieName].id = newSignedSessionIdForCookie;
            }
          } catch(e) {
            // Si la clave antigua no existe, rename fallará. Manejar esto o relanzar otros errores.
            if ((e as Error).message.includes("no such key")) {
              console.warn(`Attempted to rotate non-existent session ${currentSessionId}. Generating new session.`);
              // Si la sesión ya no existe, actuamos como si fuera una nueva
              currentSessionId = generateSessionId();
              newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
              await redisClient.hSet(`${prefix}:${currentSessionId}`, "created_at", Date.now());
              await redisClient.expire(`${prefix}:${currentSessionId}`, sessionTtlSeconds);
              isSessionRotated = true; // Consideramos que se "rotó" a una nueva válida
              if (ctx.state.sessions && ctx.state.sessions[cookieName]) {
                ctx.state.sessions[cookieName].id = newSignedSessionIdForCookie;
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
          const redisData = await redisClient.hGetAll(`${prefix}:${currentSessionId}`);
          for (const key in redisData) {
            if (key !== "created_at") { // No incluir el campo `created_at`
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
          const len = await redisClient.hLen(`${prefix}:${currentSessionId}`);
          return len > 0 ? len - 1 : 0; // Restar 'created_at' del conteo
        },
      };

      ctx.state.sessions[cookieName] = {
        id: newSignedSessionIdForCookie,
        store: sessionStoreAccessors,
      };

      const response = await next();

      if (!(response instanceof Response)) {
        console.warn(`Middleware (${cookieName}) received a non-Response object from next(). This should not happen.`);
        return new Response("Internal Server Error from middleware chain", { status: 500 });
      }

      if (!isStaticRoute(req.url) && !staticExtensions.some((ext) => pathname.endsWith(ext))) {
        let cookieValue = newSignedSessionIdForCookie;
        let maxAge = sessionTtlSeconds; // Usar segundos para Max-Age

        if (isSessionDestroyed) {
            cookieValue = ""; // Envía una cookie vacía
            maxAge = 0; // Expira inmediatamente
        } else if (isSessionRotated) {
            // Si la sesión fue rotada, queremos que la nueva cookie con el nuevo ID
            // tenga el TTL completo. `newSignedSessionIdForCookie` ya tiene el nuevo ID.
            // maxAge ya está configurado a `sessionTtlSeconds`
        }
        
        const cookieParts = [
          `${cookieName}=${cookieValue}`,
          `Max-Age=${maxAge}`,
          finalCookieOptions.httpOnly ? "HttpOnly" : "",
          `SameSite=${finalCookieOptions.sameSite}`,
          `Path=${finalCookieOptions.path}`,
          finalCookieOptions.secure ? "Secure" : "",
        ].filter(Boolean);

        try {
          response.headers.append("Set-Cookie", cookieParts.join("; "));
        } catch (error) {
          console.error(`Error setting cookie ${cookieName} for ${req.url}:`, error);
        }
      }
      return response;
    } catch (error) {
      console.error(`Session middleware (${cookieName}) error:`, error);
      return new Response("Internal Server Error during session processing", { status: 500 });
    }
  };
}

// --- FUNCIÓN DESTRUIR TODAS LAS SESIONES (Adaptada para Redis) ---
export async function destroyAllSessions(redisClient: RedisClientType, prefix: string = "sessions") {
  try {
    // Para destruir todas las sesiones de un prefijo específico,
    // necesitamos escanear todas las claves que comiencen con ese prefijo y borrarlas.
    // Usaremos un patrón glob para `KEYS` o `SCAN` para ser más robustos en producción.
    const keys = await redisClient.keys(`${prefix}:*`); // Esto puede ser lento en DBs grandes.
    if (keys.length > 0) {
      await redisClient.del(keys); // Borra todas las claves encontradas en una sola operación
    }
    console.log(`All (${keys.length} keys) sessions destroyed for prefix ${prefix}`);
  } catch (error) {
    console.error("Error destroying all sessions:", error);
    throw error;
  }
}*/



import { FreshContext } from "$fresh/server.ts";
import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  createHash,
  randomBytes,
} from "node:crypto";
import { nanoid } from "nanoid";
import { createClient, RedisClientType } from "npm:redis";
import { isStaticRoute } from "../utils/routing/staticFiles.ts";
import { Buffer } from "node:buffer";

// --- CONFIGURACIÓN E INTERFACES ---

interface SessionOptions {
  cookieName?: string;
  sessionTtl?: number;
  prefix?: string;
  secretKey: string;
  redisClient: RedisClientType;
  cookieOptions?: {
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
    path?: string;
    maxAge?: number; // Añadido para compatibilidad con Fastify
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

export type SessionContextData = {
  id: string;
  store: SessionAccessors;
  userInfo?: string;
};

export type State = {
  sessions: {
    [sessionName: string]: SessionContextData;
  };
  translation?: string;
  lang?: string;
};

// --- OPCIONES POR DEFECTO ---

const defaultOptions: Omit<SessionOptions, "redisClient" | "secretKey"> & {
  secretKey?: string;
} = {
  cookieName: "sessionId", // Igual que en Fastify
  sessionTtl: 86400 * 1000, // 1 día, igual que en Fastify
  prefix: "http_sessions:", // Igual que en Fastify
  cookieOptions: {
    httpOnly: true,
    sameSite: "Lax",
    secure: true, // Igual que en Fastify (seguro por defecto en producción)
    path: "/",
    maxAge: 86400, // Igual que en Fastify
  },
};

// --- LÓGICA DE CRIPTOGRAFÍA Y FIRMA (Compatible con Fastify) ---

function getAesKey(secret: string): Buffer {
  return createHash("sha256").update(secret).digest();
}

async function encryptData(data: string, secret: string): Promise<string> {
  const secretKey = getAesKey(secret);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

export async function decryptData(
  encryptedData: string,
  secret: string,
): Promise<string | null> {
  try {
    const secretKey = getAesKey(secret);
    const parts = encryptedData.split(":");
    if (parts.length !== 3) return null;
    const [ivHex, tagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(tagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = createDecipheriv("aes-256-gcm", secretKey, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}


function signSessionId(sessionId: string, secret: string): string {
  console.log('--- Debug signSessionId ---');
  console.log('sessionId:', sessionId);
  console.log('secret:', secret);

  const message = Buffer.from(sessionId); // Buffer del sessionId
  const base64Message = message.toString('base64'); // Codificar sessionId en base64
  console.log('base64Message:', base64Message);

  const hmac = createHmac('sha256', secret);
  hmac.update(message); // Usar el Buffer del sessionId para el HMAC
  const signature = hmac.digest('base64').replace(/=+$/, ''); // Firma en base64, sin '='
  console.log('Firma generada (base64):', signature);

  const signedSessionId = `${base64Message}.${signature}`;
  console.log('signedSessionId final:', signedSessionId);
  return signedSessionId;
}

export function verifySessionId(signedSessionId: string, secret: string): string | null {
  console.log('--- Debug verifySessionId ---');
  console.log('signedSessionId recibido:', signedSessionId);
  console.log('secret:', secret);

  const [base64Message, signature] = signedSessionId.split('.');
  console.log('base64Message extraído:', base64Message);
  console.log('signature extraída:', signature);

  if (!base64Message || !signature) {
    console.log('Falta base64Message o signature');
    return null;
  }

  const message = Buffer.from(base64Message, 'base64'); // Decodificar el sessionId desde base64
  console.log('message (Buffer):', message);
  console.log('sessionId decodificado:', message.toString());

  const hmac = createHmac('sha256', secret);
  hmac.update(message); // Usar el Buffer del sessionId
  const computedSignature = hmac.digest('base64').replace(/=+$/, ''); // Firma en base64, sin '='
  console.log('Firma calculada (base64):', computedSignature);

  if (computedSignature === signature) {
    console.log('La firma coincide');
    return message.toString(); // Devolver el sessionId original
  } else {
    console.log('La firma NO coincide');
    console.log('Firma esperada:', signature);
    console.log('Firma calculada:', computedSignature);
    return null;
  }
}


export function getSessionIdFromCookies(
  req: Request,
  cookieName: string,
): string | null {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split("=");
    if (name === cookieName) {
      return rest.join("=");
    }
  }
  return null;
}

function generateSessionId(): string {
  return nanoid();
}

// --- MIDDLEWARE PRINCIPAL ---

export function sessionHandler(options: SessionOptions) {
  if (!options.redisClient) throw new Error("Redis client instance must be provided.");
  if (!options.secretKey) throw new Error("Secret key must be provided.");

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
    secure: cookieOptions.secure ?? Deno.env.get("ENV") === "production",
  };

  const sessionTtlSeconds = Math.floor(sessionTtl / 1000);

  return async function middleware(
    req: Request,
    ctx: FreshContext<State>,
    next: () => Promise<Response>,
  ) {
    if (isStaticRoute(req.url)) return await next();

    try {
      if (!ctx.state.sessions) ctx.state.sessions = {};

      let signedSessionIdFromCookie = getSessionIdFromCookies(req, cookieName);
      let currentSessionId: string | null = null;

      if (signedSessionIdFromCookie) {
        currentSessionId = verifySessionId(signedSessionIdFromCookie, secretKey);
        if (currentSessionId) {
          const exists = await redisClient.exists(`${prefix}${currentSessionId}`);
          if (!exists) {
            currentSessionId = null;
          }
        }
      }

      let signedSessionId: string;
      if (!currentSessionId) {
        currentSessionId = generateSessionId();
        signedSessionId = signSessionId(currentSessionId, secretKey);
        console.log("Fresh generated signedSessionId:", signedSessionId);
        
        const emptySession = await encryptData("{}", secretKey);
        await redisClient.set(`${prefix}${currentSessionId}`, emptySession, {
          PX: sessionTtlSeconds * 1000,
        });
      } else {
        await redisClient.PEXPIRE(`${prefix}${currentSessionId}`, sessionTtlSeconds * 1000);
        signedSessionId = signedSessionIdFromCookie!;
      }

      let isSessionDestroyed = false;
      let newSignedSessionIdForCookie = signedSessionId;

      const getFullSession = async (): Promise<Record<string, unknown>> => {
        if (!currentSessionId) return {};
        const encrypted = await redisClient.get(`${prefix}${currentSessionId}`);
        if (!encrypted) return {};
        const decrypted = await decryptData(encrypted, secretKey);
        return decrypted ? JSON.parse(decrypted) : {};
      };

      const sessionStoreAccessors: SessionAccessors = {
        get: async <T>(key: string): Promise<T | null> => {
          const sessionData = await getFullSession();
          return (sessionData[key] as T) ?? null;
        },

        set: async (key: string, value: unknown) => {
          if (!currentSessionId) throw new Error("Session ID not available for set operation.");
          const sessionData = await getFullSession();
          sessionData[key] = value;
          const encrypted = await encryptData(JSON.stringify(sessionData), secretKey);
          await redisClient.set(`${prefix}${currentSessionId}`, encrypted, {
            PX: sessionTtlSeconds * 1000,
          });
        },

        delete: async (key: string) => {
          if (!currentSessionId) return;
          const sessionData = await getFullSession();
          delete sessionData[key];
          const encrypted = await encryptData(JSON.stringify(sessionData), secretKey);
          await redisClient.set(`${prefix}${currentSessionId}`, encrypted, {
            PX: sessionTtlSeconds * 1000,
          });
        },

        getAll: async (): Promise<Record<string, unknown>> => {
          return await getFullSession();
        },

        count: async (): Promise<number> => {
          const sessionData = await getFullSession();
          return Object.keys(sessionData).length;
        },

        destroy: async () => {
          if (!currentSessionId) return;
          await redisClient.del(`${prefix}${currentSessionId}`);
          isSessionDestroyed = true;
          newSignedSessionIdForCookie = "";
        },

        rotate: async () => {
          if (!currentSessionId) throw new Error("Session ID not available for rotate operation.");
          const oldSessionKey = `${prefix}${currentSessionId}`;
          const newPlainSessionId = generateSessionId();
          const newSessionKey = `${prefix}${newPlainSessionId}`;
          const sessionData = await redisClient.get(oldSessionKey);
          if (sessionData) {
            await redisClient.set(newSessionKey, sessionData, {
              PX: sessionTtlSeconds * 1000,
            });
            await redisClient.del(oldSessionKey);
            currentSessionId = newPlainSessionId;
            newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
            if (ctx.state.sessions && ctx.state.sessions[cookieName]) {
              ctx.state.sessions[cookieName].id = newSignedSessionIdForCookie;
            }
          } else {
            currentSessionId = newPlainSessionId;
            newSignedSessionIdForCookie = signSessionId(currentSessionId, secretKey);
            const emptySession = await encryptData("{}", secretKey);
            await redisClient.set(newSessionKey, emptySession, {
              PX: sessionTtlSeconds * 1000,
            });
            if (ctx.state.sessions && ctx.state.sessions[cookieName]) {
              ctx.state.sessions[cookieName].id = newSignedSessionIdForCookie;
            }
          }
        },
      };

      ctx.state.sessions[cookieName] = {
        id: newSignedSessionIdForCookie,
        store: sessionStoreAccessors,
      };

      const response = await next();

      if (!(response instanceof Response)) {
        return new Response("Internal Server Error from middleware chain", { status: 500 });
      }

      if (!isStaticRoute(req.url)) {
        let cookieValue = newSignedSessionIdForCookie;
        let maxAge = sessionTtlSeconds;

        if (isSessionDestroyed) {
          cookieValue = "";
          maxAge = 0;
        }

        const cookieParts = [
          `${cookieName}=${cookieValue}`,
          `Max-Age=${maxAge}`,
          finalCookieOptions.httpOnly ? "HttpOnly" : "",
          `SameSite=${finalCookieOptions.sameSite}`,
          `Path=${finalCookieOptions.path}`,
          finalCookieOptions.secure ? "Secure" : "",
        ].filter(Boolean);

        try {
          response.headers.append("Set-Cookie", cookieParts.join("; "));
        } catch (error) {
          console.error(`Error setting cookie ${cookieName} for ${req.url}:`, error);
        }
      }

      return response;
    } catch (error) {
      console.error(`Session middleware (${cookieName}) error:`, error);
      return new Response("Internal Server Error during session processing", { status: 500 });
    }
  };
}

// --- FUNCIÓN DESTRUIR TODAS LAS SESIONES ---

export async function destroyAllSessions(
  redisClient: RedisClientType,
  prefix: string = "session:",
) {
  try {
    const keys = await redisClient.keys(`${prefix}*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    console.log(`All (${keys.length} keys) sessions destroyed for prefix ${prefix}`);
  } catch (error) {
    console.error("Error destroying all sessions:", error);
    throw error;
  }
}
