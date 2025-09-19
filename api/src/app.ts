import { getKeycloakConfig } from '@/config/configKeycloak';

// src/app.ts
import Fastify, { FastifyBaseLogger, FastifyHttpOptions, FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions, RawServerDefault } from 'fastify';
import { fileURLToPath } from 'url';
import { StatusCodes } from 'http-status-codes';
import { enhance } from '@zenstackhq/runtime';
import Redis from 'ioredis';
import { Prisma } from '@prisma/client';
import { createClient } from 'redis';
import  client from 'openid-client';
import path, { dirname } from 'path';
import * as fs from 'fs';
import * as https from 'https';
import jwt from '@fastify/jwt';
import { createHmac } from 'crypto';
import bytes from 'bytes';

// Plugins
import prismaPlugin from '@/plugins/prisma';
import helmetPlugin from '@/plugins/helmet';
import multipartPlugin from '@fastify/multipart';
import corsPlugin from '@/plugins/cors';
import cors from '@fastify/cors';
import swaggerPlugin from '@/plugins/swagger';
import sensiblePlugin from '@/plugins/sensible';
import stripePlugin from '@/plugins/stripe';
import { ZenStackFastifyPlugin } from '@zenstackhq/server/fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import session from '@fastify/session';
import fastifySession from "@mgcrea/fastify-session";
import s3Plugin from '@/plugins/s3';

import fastifyCookie from '@fastify/cookie';
import fastifyPassport from '@fastify/passport';
import autoload from '@fastify/autoload';
import status from 'http-status';
import { requestPath } from '@/utils/response';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { nanoid } from 'nanoid';
import { sessionPlugin } from '@/plugins/session';
import fastifyRedis from '@fastify/redis';
import RedisStore from "@mgcrea/fastify-session-redis-store";
import { EncryptedRedisStore } from '@/utils/session/store/encryptedRedisStore';
import { authTesting } from './middlewares/authTesting';
import config from '@/config';
import { authKeycloakHandler } from '@/middlewares/authKeycloak';

export async function build(opts = {
    
}): Promise<FastifyInstance> {

    process.env.ZENSTACK_DEBUG = 'true';
    
    // Configura el cliente de Redis
    const redisClient = new Redis({
        host: '127.0.0.1', // Dirección de tu servidor Redis
        port: 6381,        // Puerto por defecto de Redis
        password: 'SECRETPWS', // Opcional, si Redis tiene autenticación
        
    });


    // 🔥 Manejo de errores de Redis
    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });

    redisClient.on('connect', () => {
        console.log('🔥 Connected to Redis with IORedis!');
    });


    const app = Fastify({
        https: {
            key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
            cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem'))
        },
        logger: {
            level: config.logLevel,
            ...(config.nodeEnv === 'development' && {
                transport: {
                target: 'pino-pretty', // Para logs bonitos en desarrollo
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
                },
            }),
        },
        ajv: {
            // Adds the file plugin to help @fastify/swagger schema generation
            plugins: [require('@fastify/multipart').ajvFilePlugin]
        },
        
        ...opts,
    }).withTypeProvider<JsonSchemaToTsProvider>();
    app.register(require('@fastify/under-pressure'), {
        maxEventLoopDelay: 1000,
        message: 'Under pressure!',
        retryAfter: 50
    })
    app.register(swaggerPlugin);
    app.register(cors, {
        origin: true, //'https://freshclientapp.ngrok.app',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.register(fastifyCookie, {
        secret: config.session.secret,
    });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT_SECRET no definido");

    // Hook onRequest para manejar JWT y cookies
    //app.addHook('onRequest', authTesting);

    const secureRedis = new EncryptedRedisStore({
        client: redisClient,
        secret: config.session.secret,
        prefix: 'http_sessions:',
        ttl: 86400, // 1 día
    })
    app.register(jwt, {
        secret: jwtSecret,
    });
    app.decorate('redis_secure', secureRedis);
    app.decorate('prefix_sessions_http', 'http_sessions:');
    app.register(fastifyRedis, { host: '127.0.0.1', port: 6381, password: 'SECRETPWS', });

    //app.addHook('onRequest', authTesting);

    app.register(fastifySession, {
        secret: config.session.secret,
        store: secureRedis,
        cookieName: 'sessionId', // Nombre de la cookie de sesión
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: 86400 * 1000,
            sameSite: 'strict',
            path: '/'
        },
    });

    app.register(
        s3Plugin, {
            buckets: [
                { Bucket: 'freshstack', ACL: 'public-read-write' },
            ]
        }
    );
    
    app.register(multipartPlugin, {
        limits: {
            //fieldNameSize: 100, // Max field name size in bytes
            //fieldSize: 100,     // Max field value size in bytes
            //fields: 10,         // Max number of non-file fields
            fileSize: bytes('15MB') || 15 * 1024 * 1024,  // For multipart forms, the max file size in bytes
            files: 1,           // Max number of file fields
            //headerPairs: 2000,  // Max number of header key=>value pairs
            //parts: 1000         // For multipart forms, the max number of parts (fields + files)
        },
        attachFieldsToBody: "keyValues",
    });
    

    // Registrar Plugins
    app.register(prismaPlugin);
    
    //app.register(corsPlugin);
    app.register(sensiblePlugin);
    app.register(helmetPlugin);
    app.register(stripePlugin);
    //app.register(keycloak, keycloakOptions);
    
    /*app.register(import('fastify-minio'), {
        endPoint: config.minio.host,
        port: config.minio.port,
        useSSL: false,
        accessKey: config.minio.api_keys.access,
        secretKey: config.minio.api_keys.secret,
    });*/

    


    

    // Registrar Rutas
    // El prefijo global '/api/v1' es opcional pero común
    app.register(autoload, {
        dir: path.join(__dirname, 'routes'),
        options: {
            prefix: config.prefixApi,
        },
        autoHooks: true,
        cascadeHooks: true,
        autoHooksPattern: /.*hooks(\.ts)$/i
    });
    
    app.register(async (server) => {
        server.addHook('preHandler', authKeycloakHandler);
        await server.register(import('./routes/private/routes'), { prefix: '/private' });
    });


    app.register(ZenStackFastifyPlugin, {
        prefix: '/api/v1/model',

        getPrisma: async (request) => {
            const session = request.session;

            console.log(request.session.sessionId);

            const access_token = session.get('access_token') || null;
            const refresh_token = session.get('refresh_token') || null;
            const lang = session.get('lang') || null;
            console.log('lang: ' + lang);

            console.log(`Access Token: ${access_token}`);
            console.log(`Refresh Token: ${refresh_token}`);

            if (!access_token || !refresh_token) {
                console.log("Nothing :)");
                return enhance(app.prisma, {
                    user: {
                        id: nanoid(),
                        businessId: 'INVALID_NO_BUSINESS_ID'
                    }
                });
            }

            const configClientKeycloak = await getKeycloakConfig();

            let userTokenData = await client.tokenIntrospection(configClientKeycloak, access_token);

            // Si el access_token está inactivo o expirado, intentamos usar el refresh_token
            if (!userTokenData?.active) {
                const refreshTokenData = await client.tokenIntrospection(configClientKeycloak, refresh_token);

                if (!refreshTokenData?.active) {
                    // Ambos tokens inválidos → sesión inválida
                    console.log("Ambos tokens inválidos :(");
                    return enhance(app.prisma, {
                        user: {
                            id: nanoid(),
                            businessId: 'INVALID_NO_BUSINESS_ID'
                        }
                    });
                }

                try {
                    // Refrescamos tokens
                    const refreshed = await client.refreshTokenGrant(configClientKeycloak, refresh_token);
                    
                    // Guardamos los nuevos tokens en la sesión
                    await session.set('access_token', refreshed.access_token);
                    await session.set('refresh_token', refreshed.refresh_token);

                    await session.save();

                    // Reintrospectamos el nuevo token
                    userTokenData = await client.tokenIntrospection(configClientKeycloak, refreshed.access_token);

                } catch (err) {
                    console.error('Error al refrescar token:', err);
                    return enhance(app.prisma, {
                        user: {
                            id: nanoid(),
                            businessId: 'INVALID_NO_BUSINESS_ID'
                        }
                    });
                }
            }

            // 🔥 LA SOLUCIÓN ESTÁ AQUÍ
            const businessId = await session.get('business_id');

            // Si el usuario está autenticado pero NO tiene un businessId en la sesión...
            if (!businessId) {
                console.log("Usuario autenticado sin businessId en sesión. Se denegará el acceso a modelos protegidos por businessId.");
                // ...le asignamos un contexto que HARÁ FALLAR la política de seguridad.
                // Usar un ID que nunca existirá garantiza que `auth().businessId == this.businessId` sea siempre falso.
                return enhance(app.prisma, {
                    user: {
                        id: nanoid(), // o el ID de usuario del token
                        businessId: 'INVALID_NO_BUSINESS_ID' // Un valor garantizado para no coincidir
                    }
                });
            }

            // Si llegamos aquí, el usuario está autenticado Y tiene un businessId.
            console.log("Usuario autenticado con business_id: " + businessId);


            return enhance(app.prisma, {
                user: {
                    id: nanoid(),
                    businessId
                }
            });
        },
    });



    // Middleware para verificar cookies y JWT
    // Middleware para verificar cookies y JWT
    

    // app.register(anotherModuleRoutes, { prefix: '/api/v1/another' });

    /*
    app.get('/healthcheck', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });*/

    // En src/app.ts
    app.setErrorHandler((error, request, reply) => {
        const { validation, statusCode } = error; // 'validation' está si es un error de validación de schema
    
        request.log.error(error); // Siempre loguea el error completo
    
        if (validation) {
            reply.status(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'Error de validación de entrada.',
                } //errors: error.validation, // Detalles de la validación
            });
            return;
        }
    
        if (statusCode && statusCode >= 400 && statusCode < 500) {
        // Errores del cliente que ya tienen un statusCode (ej. de @fastify/sensible)
        reply.status(statusCode).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
                code: error.code || `HTTP_${statusCode}`,
                message: error.message,
            }    
        });
        return;
        }
    
        // Para errores 500 o no manejados, respuesta genérica
        reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            data: {},
            error: {
                code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
                message: 'Ha ocurrido un error inesperado en el servidor.',
            }
            
        });
        
    });

    return app;
}