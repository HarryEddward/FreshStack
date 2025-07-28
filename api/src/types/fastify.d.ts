import { Redis } from 'ioredis';
// src/types/fastify.d.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { Session } from '@fastify/session';

declare module 'fastify' {
  interface FastifyRequest {
    cookies: { [key: string]: string };
    session: Session & { user?: { userId: string; [key: string]: any }; lang?: string };
    user?: { userId: string; [key: string]: any };
  }

  interface FastifyInstance {
    auth: (handlers: any[]) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    redis: Redis;
    redis_secure: EncryptedRedisStore;
  }
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

import { FastifyRequest } from 'fastify';

declare module '@fastify/session' {
  interface SessionData {
    user?: any; // Replace `any` with a specific user type if known
    tokens?: { access_token: string; refresh_token: string };
    sessionId: string;
  }
}

// types/fastify-jwt.d.ts
import '@fastify/jwt';
import { JWTPayload } from 'jose';

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify<T = JWTPayload>(): Promise<T>;
  }

  interface FastifyInstance {
    jwt: {
      sign: (payload: object, options?: object) => Promise<string>;
      verify: <T = JWTPayload>(token: string) => T;
      decode: <T = JWTPayload>(token: string) => null | T;
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    s3Client: S3Client;
  }

  interface FastifyRequest {
    body: {
      file?: Buffer;
      [key: string]: any;
    };
  }
}