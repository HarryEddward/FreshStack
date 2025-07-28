import { FastifyRequest, FastifyReply, preHandlerHookHandler } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '@/config';
import status from 'http-status';
import { Redis } from 'ioredis';
import { decryptData } from '@/utils/crypto';
import { EncryptedRedisStore } from '@/utils/session/store/encryptedRedisStore';

interface JwtPayload {
  userId: string;
  sessionId: string;
  [key: string]: any;
}

interface ErrorResponse {
  v: string;
  method: string;
  meta: object;
  data: object;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

export const authMiddleware = (store: EncryptedRedisStore): preHandlerHookHandler => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const cookies = request.cookies;
      
      const hasCookies = Object.keys(cookies).length > 0;
      const authHeader = request.headers.authorization;
      const hasJwt = authHeader && authHeader.startsWith('Bearer ');

      console.log('Cookies:', cookies);
      console.log('Session ID from session:', request.session.sessionId);

      if (hasCookies && hasJwt) {
        return reply.code(StatusCodes.BAD_REQUEST).send({
          v: config.currentApiVersion,
          method: request.originalUrl,
          meta: {},
          data: {},
          error: {
            code: status[`${StatusCodes.BAD_REQUEST}_NAME`] || 'BAD_REQUEST',
            message: 'Cannot provide both cookies and JWT token',
          },
        });
      }

      if (!hasCookies && !hasJwt) {
        return reply.code(StatusCodes.UNAUTHORIZED).send({
          v: config.currentApiVersion,
          method: request.originalUrl,
          meta: {},
          data: {},
          error: {
            code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
            message: 'Must provide cookies or a JWT token',
          },
        });
      }

      if (hasCookies) {
        const signedSessionId = cookies.sessionId;
        console.log('Session ID from session:', signedSessionId);

        
        if (!signedSessionId) {
          return reply.code(StatusCodes.UNAUTHORIZED).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
              code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
              message: 'Invalid or missing session ID',
            },
          });
        }

        const sessionData = await store.get(signedSessionId);
        if (!sessionData || Object.keys(sessionData).length === 0) {
          return reply.code(StatusCodes.UNAUTHORIZED).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
              code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
              message: 'No session data found',
            },
          });
        }
      }

      if (hasJwt) {
        const token = authHeader!.replace('Bearer ', '');
        let decoded: JwtPayload;
        try {
          decoded = jwt.verify(token, config.jwt.secret, {
            algorithms: ['RS256'],
          }) as JwtPayload;
        } catch (error) {
          return reply.code(StatusCodes.UNAUTHORIZED).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
              code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
              message: `Invalid or expired JWT token: ${(error as Error).message}`,
            },
          });
        }

        const sessionData = await store.get(decoded.sessionId);
        if (!sessionData || Object.keys(sessionData).length === 0) {
          return reply.code(StatusCodes.UNAUTHORIZED).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
              code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
              message: 'Session ID from JWT not found or expired',
            },
          });
        }

        const [sessionObj] = Array.isArray(sessionData) ? sessionData : [sessionData];
        const tokens = sessionObj?.tokens;
        if (!tokens || !tokens.access_token || !tokens.refresh_token) {
          return reply.code(StatusCodes.UNAUTHORIZED).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
              code: status[`${StatusCodes.UNAUTHORIZED}_NAME`] || 'UNAUTHORIZED',
              message: 'Invalid tokens in session',
            },
          });
        }

        /*request.user = decoded;
        request.session.set('user', decoded);
        request.session.set('tokens', tokens);
        */
      }
    } catch (error) {
      return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
        v: config.currentApiVersion,
        method: request.originalUrl,
        meta: {},
        data: {},
        error: {
          code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`] || 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
          details: (error as Error).message,
        },
      });
    }
  };
};