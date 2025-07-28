

// @middleware/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { languageRouter } from '@middleware/languageRouter.ts';
import { sessionHandler } from "@middleware/sessionHandler.ts";
import { getRedisClient } from "@config/redisClient.ts";
import { redisClient } from '@config/index.ts';


// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    
    
    sessionHandler({
      redisClient,
      cookieName: "sessionId",
      sessionTtl: 86400 * 1000,
      //maxSessions: 1000,
      prefix: "http_sessions:",
      secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change", // ¡Cambia esto en producción!
      cookieOptions: {
        httpOnly: true,
        sameSite: "None",
        secure: true, // Cambia a true en producción con HTTPS
        path: "/",
        maxAge: 86400,
      },
    }),
    sessionHandler({
      redisClient,
      cookieName: "webConfiguration",
      sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000,
      prefix: "http_sessions:",
      //maxSessions: 1000
      secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change", // ¡Cambia esto en producción!
      cookieOptions: {
        httpOnly: true,
        sameSite: "Strict",
        secure: true, // Cambia a true en producción con HTTPS
        path: "/",
      },
    }),
    sessionHandler({
      redisClient,
      cookieName: "sessionSumUp",
      sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000,
      //maxSessions: 1000,
      prefix: "http_sessions:",
      secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change", // ¡Cambia esto en producción!
      cookieOptions: {
        httpOnly: true,
        sameSite: "Strict",
        secure: true, // Cambia a true en producción con HTTPS
        path: "/",
      },
    }),
    sessionHandler({
      redisClient,
      cookieName: "appConfiguration",
      sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000,
      prefix: "http_sessions:",

      //maxSessions: 1000,
      secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change", // ¡Cambia esto en producción!
      cookieOptions: {
        httpOnly: true,
        sameSite: "Strict",
        secure: true, // Cambia a true en producción con HTTPS
        path: "/",
      },
    }),
    sessionHandler({
      redisClient,
      cookieName: "wsSession",
      sessionTtl: 10 * 365 * 24 * 60 * 60 * 1000,
      //maxSessions: 1000,
      prefix: "websocket_sessions:",
      secretKey: Deno.env.get("SESSION_SECRET") || "default-secret-please-change", // ¡Cambia esto en producción!
      cookieOptions: {
        httpOnly: false,
        sameSite: "Strict",
        secure: true, // Cambia a true en producción con HTTPS
        path: "/",
      },
    }),
    
    languageRouter,
    
];