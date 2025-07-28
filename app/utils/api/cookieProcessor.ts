import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  createHash,
  randomBytes,
} from "node:crypto";
import { nanoid } from "nanoid";
import { Buffer } from "node:buffer";
import { RedisClientType } from "npm:redis";
import { redisClient } from '@config/index.ts';

// --- INTERFACES Y TIPOS (Consistentes con sessionHandler) ---

interface SessionOptions {
  cookieName?: string;
  sessionTtl?: number; // en milisegundos
  prefix?: string;
  secretKey: string;
  redisClient: RedisClientType; // Se requiere un cliente Redis
  cookieOptions?: {
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
    path?: string;
    maxAge?: number; // en segundos
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

export interface SessionContext {
  id: string; // El ID de sesión firmado, listo para la cookie
  store: SessionAccessors;
  isNew: boolean;
}

// --- OPCIONES POR DEFECTO (Idénticas a sessionHandler) ---

const defaultOptions: Omit<SessionOptions, "secretKey" | "redisClient"> = {
  cookieName: "sessionId",
  sessionTtl: 86400 * 1000, // 1 día
  prefix: "http_sessions:",
  cookieOptions: {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
    path: "/",
    maxAge: 86400,
  },
};

// --- LÓGICA DE CRIPTOGRAFÍA Y FIRMA (Idéntica a sessionHandler) ---

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

async function decryptData(
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
    console.error("API Session Decryption error:", error);
    return null;
  }
}

function signSessionId(sessionId: string, secret: string): string {
  const message = Buffer.from(sessionId);
  const base64Message = message.toString('base64');
  const hmac = createHmac('sha256', secret);
  hmac.update(message);
  const signature = hmac.digest('base64').replace(/=+$/, '');
  return `${base64Message}.${signature}`;
}

function verifySessionId(signedSessionId: string, secret: string): string | null {
  const [base64Message, signature] = signedSessionId.split('.');
  if (!base64Message || !signature) return null;
  try {
    const message = Buffer.from(base64Message, 'base64');
    const hmac = createHmac('sha256', secret);
    hmac.update(message);
    const computedSignature = hmac.digest('base64').replace(/=+$/, '');
    return computedSignature === signature ? message.toString() : null;
  } catch (e) {
      console.error("API Session: Error decoding base64 session ID.", (e as Error).message);
      return null;
  }
}

function getSessionIdFromCookies(req: Request, cookieName: string): string | null {
    const cookieHeader = req.headers.get("Cookie");
    if (!cookieHeader) return null;
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
        const [name, ...rest] = cookie.split("=");
        if (name === cookieName) {
            return decodeURIComponent(rest.join("="));
        }
    }
    return null;
}

function generateSessionId(): string {
  return nanoid();
}

// --- CLASE API SESSION CON REDIS ---

export class ApiSession {
  private options: Required<SessionOptions>;
  private redis: RedisClientType;

  constructor(options: SessionOptions) {
    if (!options.secretKey) {
      throw new Error("ApiSession: La `secretKey` es obligatoria.");
    }
    if (!options.redisClient) {
        throw new Error("ApiSession: La instancia de `redisClient` es obligatoria.");
    }
    
    this.options = {
      ...defaultOptions,
      ...options,
      cookieName: options.cookieName ?? defaultOptions.cookieName!,
      sessionTtl: options.sessionTtl ?? defaultOptions.sessionTtl!,
      prefix: options.prefix ?? defaultOptions.prefix!,
      cookieOptions: {
        ...defaultOptions.cookieOptions,
        ...options.cookieOptions,
      },
    };
    this.redis = options.redisClient;
  }
  
  private getRedisKey(sessionId: string): string {
      return `${this.options.prefix}${sessionId}`;
  }

  public async getSession(req: Request): Promise<SessionContext> {
    const { secretKey, cookieName, prefix, sessionTtl } = this.options;
    const sessionTtlSeconds = Math.floor(sessionTtl / 1000);

    const signedSessionIdFromCookie = getSessionIdFromCookies(req, cookieName);
    let currentSessionId: string | null = null;
    let isNew = false;
    
    if (signedSessionIdFromCookie) {
      currentSessionId = verifySessionId(signedSessionIdFromCookie, secretKey);
      if (currentSessionId) {
        const exists = await this.redis.exists(this.getRedisKey(currentSessionId));
        if (!exists) {
          currentSessionId = null; // El ID es válido pero no está en Redis, crear uno nuevo
        }
      }
    }

    let finalSignedSessionId: string;
    if (!currentSessionId) {
      isNew = true;
      currentSessionId = generateSessionId();
      finalSignedSessionId = signSessionId(currentSessionId, secretKey);
      
      const emptySession = await encryptData("{}", secretKey);
      await this.redis.set(this.getRedisKey(currentSessionId), emptySession, {
        PX: sessionTtl, // TTL en milisegundos
      });
    } else {
      finalSignedSessionId = signedSessionIdFromCookie!;
      // Refrescar el TTL de la sesión existente
      await this.redis.PEXPIRE(this.getRedisKey(currentSessionId), sessionTtl);
    }

    // Variables que pueden cambiar durante el ciclo de vida (rotación, destrucción)
    let activeSessionId = currentSessionId;
    let activeSignedSessionId = finalSignedSessionId;

    const getFullSession = async (sessionId: string): Promise<Record<string, unknown>> => {
        const encrypted = await this.redis.get(this.getRedisKey(sessionId));
        if (!encrypted) return {};
        const decrypted = await decryptData(encrypted, secretKey);
        return decrypted ? JSON.parse(decrypted) : {};
    };

    const store: SessionAccessors = {
      get: async <T>(key: string): Promise<T | null> => {
        const sessionData = await getFullSession(activeSessionId);
        return (sessionData[key] as T) ?? null;
      },
      set: async (key: string, value: unknown): Promise<void> => {
        const sessionData = await getFullSession(activeSessionId);
        sessionData[key] = value;
        const encrypted = await encryptData(JSON.stringify(sessionData), secretKey);
        await this.redis.set(this.getRedisKey(activeSessionId), encrypted, {
            PX: sessionTtl
        });
      },
      delete: async (key: string): Promise<void> => {
        const sessionData = await getFullSession(activeSessionId);
        delete sessionData[key];
        const encrypted = await encryptData(JSON.stringify(sessionData), secretKey);
        await this.redis.set(this.getRedisKey(activeSessionId), encrypted, {
            PX: sessionTtl
        });
      },
      getAll: () => getFullSession(activeSessionId),
      count: async (): Promise<number> => {
          const sessionData = await getFullSession(activeSessionId);
          return Object.keys(sessionData).length;
      },
      destroy: async (): Promise<void> => {
        await this.redis.del(this.getRedisKey(activeSessionId));
        activeSignedSessionId = ""; // Prepara para que la cookie se borre
      },
      rotate: async (): Promise<void> => {
        const oldSessionKey = this.getRedisKey(activeSessionId);
        const sessionData = await this.redis.get(oldSessionKey);
        
        // Generar nueva sesión independientemente de si la antigua existía
        const newPlainSessionId = generateSessionId();
        const newSignedId = signSessionId(newPlainSessionId, secretKey);

        if (sessionData) {
            // Migrar datos antiguos a la nueva clave de sesión
            await this.redis.set(this.getRedisKey(newPlainSessionId), sessionData, {
                PX: sessionTtl,
            });
            await this.redis.del(oldSessionKey);
        } else {
            // Crear una sesión vacía si no había datos que migrar
            const emptySession = await encryptData("{}", secretKey);
            await this.redis.set(this.getRedisKey(newPlainSessionId), emptySession, {
                PX: sessionTtl,
            });
        }
        
        // Actualizar los IDs activos para el resto de la solicitud
        activeSessionId = newPlainSessionId;
        activeSignedSessionId = newSignedId;
      },
    };

    return {
        id: activeSignedSessionId,
        store,
        isNew,
    };
  }
  
  public setCookie(headers: Headers, signedSessionId: string) {
     const opts = this.options.cookieOptions;
     // Si el ID está vacío (después de destroy), Max-Age es 0 para borrar la cookie
     const maxAge = signedSessionId ? opts.maxAge : 0;
     const cookieValue = signedSessionId ? encodeURIComponent(signedSessionId) : '';

     const cookieParts = [
          `${this.options.cookieName}=${cookieValue}`,
          `Max-Age=${maxAge}`,
          opts.httpOnly ? "HttpOnly" : "",
          `SameSite=${opts.sameSite}`,
          `Path=${opts.path}`,
          opts.secure ? "Secure" : "",
        ].filter(Boolean);

     headers.append("Set-Cookie", cookieParts.join("; "));
  }
}


export const sessionApiManager = new ApiSession({
    // La secretKey DEBE ser una cadena Base64 que represente 32 bytes para AES-GCM.
    secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change",
    cookieName: "sessionId",
    prefix: "http_sessions",
    redisClient,
    sessionTtl: 60_000, // 1 hora en ms
    cookieOptions: {
      // secure: true, // Descomentar en producción si usas HTTPS
    }
});

export const sessionApiAppConfiguration = new ApiSession({

  secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change",
  cookieName: "appConfiguration",
  prefix: "http_sessions",
  redisClient,
  sessionTtl: 60_000, // 1 hora en ms
  cookieOptions: {
    // secure: true, // Descomentar en producción si usas HTTPS
  }
})

export const sessionApiWebConfiguration = new ApiSession({

  secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change",
  cookieName: "webConfiguration",
  prefix: "http_sessions",
  sessionTtl: 60_000, // 1 hora en ms
  redisClient,
  cookieOptions: {
    // secure: true, // Descomentar en producción si usas HTTPS
  }
})

export const sessionWsApiManager = new ApiSession({
  // La secretKey DEBE ser una cadena Base64 que represente 32 bytes para AES-GCM.
  secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change",
  cookieName: "wsSession",
  prefix: "websocket_sessions",
  sessionTtl: 60_000, // 1 hora en ms
  redisClient,
  cookieOptions: {
    // secure: true, // Descomentar en producción si usas HTTPS
    httpOnly: false, // Cambiado a false para WebSocket
  }
});