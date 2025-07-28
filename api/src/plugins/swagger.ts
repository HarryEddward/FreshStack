// src/plugins/swagger.ts
import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import config from '../config'; // Para NODE_ENV
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

async function swaggerPlugin(fastify: FastifyInstance) {
  if (config.nodeEnv !== 'production') { // Generalmente no se expone en producción
    await fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Mi API Profesional con Fastify',
          description: 'Documentación de la API',
          version: '1.0.0',
        },
        components: {
          // Aquí podrías añadir esquemas globales o de seguridad si no usas $ref desde los módulos
          // schemas: { ...userSchemas }, // Opcional si ya los registras en cada ruta
          securitySchemes: {
            bearerAuth: { // Ejemplo de esquema de seguridad para JWT
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        // security: [{ bearerAuth: [] }], // Aplica seguridad globalmente
        tags: [ // Definir tags para organizar las rutas
          { name: 'Users', description: 'Operaciones relacionadas con usuarios' },
          // { name: 'OtroModulo', description: 'Descripción del otro módulo' }
        ],
      },
    });

    await fastify.register(fastifySwaggerUI, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'list', // 'full', 'none'
        deepLinking: true,
      },
      staticCSP: true,
      transformSpecificationClone: true,
    });

    // Necesitas registrar los esquemas que usas con $ref antes de que Swagger los compile
    // Si usas `buildJsonSchemas` de `fastify-zod`, esto se puede manejar mejor
    // registrando los esquemas en el plugin o al inicio de las rutas.
    // Ya lo hacemos en user.routes.ts con server.addSchema()
  }
}

export default fp(swaggerPlugin);