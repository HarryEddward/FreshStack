// @middleware/authHandler.ts
import { FreshContext, HandlerContext } from '$fresh/server.ts';
import { IAllowLangs } from "@type/index.d.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";
import { excludePathsMiddleware } from "@utils/path.ts";
import { isStaticRoute } from "@utils/routing/staticFiles.ts";
import { State } from "@middleware/sessionHandler.ts";
import { isAnApiRoute } from "@utils/routing/apiRoutes.ts";
import { sessionApiManager } from '@utils/api/cookieProcessor.ts';
import { oauth2ClientWeb } from "@utils/oauth_client.ts";
import { getKeycloakServerConfig } from '@config/configKeycloak.ts';
import * as client from 'openid-client';

const supportedLangs: IAllowLangs[] = ["ca-mall", "es", "de", "en", "fr", "ar", "it"];
const DEFAULT_LANG: IAllowLangs = supportedLangs[0];
const staticExtensions = [".css", ".svg", ".js", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".xml", ".js.map"];

// Rutas públicas que no requieren autenticación
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

export async function verifyAuthHandler(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Saltar rutas API
  if (isAnApiRoute(req.url)) {
    return await next();
  }

  // Saltar rutas estáticas y extensiones
  if (isStaticRoute(req.url) || staticExtensions.some((ext) => pathname.endsWith(ext))) {
    return await next();
  }

  // Saltar rutas excluidas
  if (excludePathsMiddleware(pathname)) {
    return await next();
  }

  // Saltar rutas públicas
  if (isPublicPath(pathname)) {
    return await next();
  }

  console.log(`🟢 Auth Handler: ${req.url}`);

  const session = ctx.state.sessions?.["sessionId"];
  if (!session) {
    // Redirigir a página de login si no hay sesión
    const licenseUrl = `/${DEFAULT_LANG}/business/web/www/login`;
    return new Response(null, {
        status: 302,
        headers: {
            Location: licenseUrl
        }
    });
  }

  const access_token = String(await session.store.get('access_token'));
  const refresh_token = String(await session.store.get('refresh_token'));

  // Si no hay tokens, redirigir a login
  if (!access_token || !refresh_token) {
    console.log('No existen los JWT tokens para validarlos');
    const licenseUrl = `/${DEFAULT_LANG}/business/web/www/login`;
    return new Response(null, {
        status: 302,
        headers: {
            Location: licenseUrl
        }
    });
  }

  const configClientKeycloak = await getKeycloakServerConfig();
  
  try {
    let userTokenData = await client.tokenIntrospection(configClientKeycloak, access_token);

    // Si el access_token está inactivo o expirado, intentamos usar el refresh_token
    if (!userTokenData?.active) {
      const refreshTokenData = await client.tokenIntrospection(configClientKeycloak, refresh_token);
      
      if (!refreshTokenData?.active) {
        // Ambos tokens inválidos → redirigir a login
        console.log('Ambos tokens son invalidos');
        const licenseUrl = `/${DEFAULT_LANG}/client/app/public/services/login`;
        return new Response(null, {
            status: 302,
            headers: {
                Location: licenseUrl
            }
        });
      }

      try {
        // Refrescamos tokens
        const refreshed = await client.refreshTokenGrant(configClientKeycloak, refresh_token);
        
        // Guardamos los nuevos tokens en la sesión
        await session.store.set('access_token', refreshed.access_token);
        if (refreshed.refresh_token) {
          await session.store.set('refresh_token', refreshed.refresh_token);
        }
        
        // Reintrospectamos el nuevo token
        userTokenData = await client.tokenIntrospection(configClientKeycloak, refreshed.access_token);
        
      } catch (err) {
        console.error('Error al refrescar token:', err);
        
        const licenseUrl = `/${DEFAULT_LANG}/client/app/public/services/login`;
        return new Response(null, {
            status: 302,
            headers: {
                Location: licenseUrl
            }
        });
      }
    }


    // Todo está bien, continuar con la request
    
    return await next();
    
  } catch (error) {
    console.error('Error en auth handler:', error);
    const licenseUrl = `/${DEFAULT_LANG}/client/app/public/services/login`;
        return new Response(null, {
            status: 302,
            headers: {
                Location: licenseUrl
            }
        });
  }
};
