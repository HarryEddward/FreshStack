// src/plugins/helmet.ts
import fp from 'fastify-plugin';
import fastifyHelmet from '@fastify/helmet';
import { FastifyInstance } from 'fastify';

async function helmetPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyHelmet, {
    // Opciones de Helmet aquí
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        // agrega más directivas según necesites
      }
    } : false, // deshabilitar CSP en desarrollo para evitar problemas
    // puedes agregar más configuraciones personalizadas
  });
}

export default fp(helmetPlugin);
