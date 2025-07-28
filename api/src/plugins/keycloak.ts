
// src/plugins/auth.ts
import '@fastify/session';
import { Grant } from 'keycloak-connect';


import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import Keycloak from 'keycloak-connect';
import { keycloakConfig } from '@/config/configKeycloak'; // Importamos la config
import { session } from '@fastify/session';

// Opciones que nuestro plugin aceptará. Necesitamos el store.
export interface AuthPluginOptions {
  store: Store;
}

// Adaptador para usar middleware de Express/Connect en Fastify
function expressMiddleware(middleware: any) {
  return (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Usamos request.raw y reply.raw que son los objetos nativos de Node.js http
      middleware(request.raw, reply.raw, (err?: Error) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  };
}

const authPlugin: FastifyPluginAsync<AuthPluginOptions> = async (fastify, options) => {
  if (!options.store) {
    throw new Error('Redis session store must be provided to the auth plugin.');
  }

  // 1. Inicializar Keycloak, pasándole el store de sesión de Redis.
  // ¡Este es el paso más importante!
  const keycloak = new Keycloak({ store: options.store }, keycloakConfig);

  // 2. Decorar la instancia de Fastify para poder acceder a keycloak si es necesario
  fastify.decorate('keycloak', keycloak);

  // 3. Crear adaptadores para los middlewares de Keycloak
  const adaptedKeycloakMiddleware = expressMiddleware(keycloak.middleware({
    // Define la URL de logout. Keycloak la interceptará.
    logout: '/logout', 
    // Define el prefijo de las rutas de admin (si las usas)
    admin: '/'
  }));
  
  const adaptedKeycloakProtect = expressMiddleware(keycloak.protect());

  // 4. Registrar un hook `preHandler` para manejar las rutas de Keycloak (login, callback, etc.)
  fastify.addHook('preHandler', async (request, reply) => {
    // Este middleware gestiona las redirecciones a la página de login,
    // el callback después del login, y el logout.
    await adaptedKeycloakMiddleware(request, reply);
  });

  // 5. Registrar un hook `onRequest` para proteger TODAS las demás rutas
  fastify.addHook('onRequest', async (request, reply) => {
    const excludedPaths = [
        '/healthcheck',
        '/api/v1/docs', // Excluir Swagger
        // La URL de logout es manejada por el middleware, pero es bueno ser explícito
        '/api/v1/logout', 
        // Las rutas públicas deben ser excluidas
        '/api/v1/public' 
    ];

    const isExcluded = excludedPaths.some(path => request.raw.url?.startsWith(path));
    if (isExcluded) {
      return; // No proteger esta ruta
    }

    try {
      // Para todas las demás rutas, aplicar la protección.
      // Si el usuario no está logueado, esto lo redirigirá a Keycloak.
      await adaptedKeycloakProtect(request, reply);
    } catch (error) {
      fastify.log.error(error, 'Fallo en la protección de Keycloak');
      // En un flujo de sesión, el middleware suele manejar la redirección.
      // Este catch es para errores inesperados.
      reply.code(500).send({ error: 'Error interno de autenticación' });
    }
  });

  fastify.log.info('Plugin de autenticación Keycloak (con sesión Redis) registrado globalmente.');
};

export default fp(authPlugin);
