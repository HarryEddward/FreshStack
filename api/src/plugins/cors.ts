// src/plugins/cors.ts
import fp from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import { FastifyInstance } from 'fastify';

async function corsPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      // Permitir todos los orígenes en desarrollo o si no hay origin (ej. Postman)
      if (!origin || process.env.NODE_ENV !== 'production') {
        cb(null, true);
        return;
      }
      // Lista de orígenes permitidos en producción
      const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '').split(',');
      if (allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Si necesitas enviar cookies o encabezados de autorización
  });
}

export default fp(corsPlugin);