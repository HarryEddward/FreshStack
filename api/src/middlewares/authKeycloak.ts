import config from "@/config";
import { getKeycloakConfig } from "@/config/configKeycloak";
import { requestPath } from "@/utils/response";
import { FastifyReply, FastifyRequest } from "fastify";
import status from "http-status";
import { StatusCodes } from "http-status-codes";
import { fetchUserInfo, refreshTokenGrant } from "openid-client";
import * as client from 'openid-client';

declare module 'fastify' {
  interface FastifyRequest {
    refreshedTokens?: { access_token: string; refresh_token?: string; expires_in: number };
  }
}


function isPublicPath(url: string): boolean {
  return [
    '/public',
    '/documentation',
    '/documentation/static',
    '/documentation/json',
    '/favicon',
    '/static'
  ].some(path => url.startsWith(path));
}

export async function authKeycloakHandler(request: FastifyRequest, reply: FastifyReply) {

  console.log('authKeycloakHandler', request.url, request.method);

  if (isPublicPath(request.url)) return;

  console.log('authKeycloakHandler:  Validando acceso a Keycloak');

  const session = request.session;
  
  const access_token = session.get('access_token') || null;
  const refresh_token = session.get('refresh_token') || null;

  if (!access_token || !refresh_token) {
      return reply.code(StatusCodes.UNAUTHORIZED).send({
          v: config.currentApiVersion,
          method: requestPath(request.originalUrl),
          meta: {},
          data: {},
          error: {
            code: status[`${StatusCodes.UNAUTHORIZED}_NAME`],
            message: "No existen los JWT tokens para vlidarlos",
            
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
          return reply.code(StatusCodes.UNAUTHORIZED).send({
              v: config.currentApiVersion,
              method: requestPath(request.originalUrl),
              meta: {},
              data: {},
              error: {
                code: status[`${StatusCodes.UNAUTHORIZED}_NAME`],
                message: "Ambos tokens son invalidos",
                
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
          return reply.code(StatusCodes.UNAUTHORIZED).send({
              v: config.currentApiVersion,
              method: requestPath(request.originalUrl),
              meta: {},
              data: {},
              error: {
                code: status[`${StatusCodes.UNAUTHORIZED}_NAME`],
                message: "Hubo un error al refrescar los tokens en la sesión",
                
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
      return reply.code(StatusCodes.UNAUTHORIZED).send({
          v: config.currentApiVersion,
          method: requestPath(request.originalUrl),
          meta: {},
          data: {},
          error: {
            code: status[`${StatusCodes.UNAUTHORIZED}_NAME`],
            message: "Falta la licencia a aplicarse",
            
          }
      });
  }

  // Si llegamos aquí, el usuario está autenticado Y tiene un businessId.
  console.log("Usuario autenticado con business_id: " + businessId);

  
};