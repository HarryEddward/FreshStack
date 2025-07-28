// middleware/[lang]/languageRouter.ts
import { FreshContext } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { oauth2Client } from "@utils/oauth_client.ts";

// Constantes para seguridad
const KEYCLOAK_USERINFO_URL = "http://localhost:8187/realms/CafeBuy/protocol/openid-connect/userinfo";
const LOGIN_REDIRECT_URL = "/es/client/app/login";
const TOKEN_REFRESH_MARGIN = 60 * 1000; // 60 segundos antes de expirar

// Interfaz para los tokens
interface TokenData {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export async function mainAuth(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  console.log("🟡 MIDDLEWARE Auth iniciando");
  const sessionHttp = ctx.state.sessions?.["sessionId"];
  const sessionWs = ctx.state.sessions?.["wsSession"];

  console.log("sessionHttp", sessionHttp);
  console.log("sessionWs", sessionWs);
  
  try {
    // 1. Recuperar tokens de la sesión
    const tokenData = await getTokensFromSession(sessionHttp, sessionWs);
    
    // 2. Verificar si tenemos tokens
    if (!tokenData.accessToken || !tokenData.refreshToken || !tokenData.expiresAt) {
      console.log("No hay tokens disponibles, redirigiendo a login");
      await clearSession(sessionHttp, sessionWs);
      return redirectToLogin();
    }
    
    // 3. Verificar expiración y refrescar si es necesario
    const isTokenExpired = Date.now() >= (tokenData.expiresAt - TOKEN_REFRESH_MARGIN);
    
    if (isTokenExpired) {
      console.log("Token expirado o a punto de expirar, intentando refrescar");
      const refreshResult = await refreshTokens(tokenData.refreshToken, sessionHttp, sessionWs);
      
      if (!refreshResult.success) {
        console.log("Falló la renovación del token, redirigiendo a login");
        await clearSession(sessionHttp, sessionWs);
        return redirectToLogin();
      }
      
      console.log("Token refrescado exitosamente");
    }
    
    // 4. Validar acceso con token actual
    const accessToken = await sessionHttp.store.get("access_token");
    const userInfo = await validateAccessToken(accessToken);
    
    if (!userInfo) {
      console.log("Token inválido, redirigiendo a login");
      await clearSession(sessionHttp, sessionWs);
      return redirectToLogin();
    }
    
    // 5. Almacenar información del usuario en el estado para usarla en los handlers
    ctx.state.userInfo = userInfo;
    
    // 6. Continuar con la solicitud
    const resp = await next();
    return resp;
    
  } catch (error) {
    console.error("Error en middleware de autenticación:", error);
    await clearSession(sessionHttp, sessionWs);
    return redirectToLogin();
  }
}

/**
 * Obtiene los tokens desde la sesión
 */
async function getTokensFromSession(sessionHttp: any, sessionWs: any): Promise<TokenData> {
  const accessToken = await sessionHttp.store.get("access_token");
  const refreshToken = await sessionHttp.store.get("refresh_token");
  const expiresAt = await sessionHttp.store.get("expires_at");
  
  return {
    accessToken,
    refreshToken,
    expiresAt: expiresAt ? parseInt(expiresAt) : null,
  };
}

/**
 * Limpia todos los datos de sesión relacionados con la autenticación
 */
async function clearSession(sessionHttp: any, sessionWs: any): Promise<void> {
  await sessionHttp.store.delete("access_token");
  await sessionWs.store.delete("access_token");

  await sessionHttp.store.delete("refresh_token");
  await sessionHttp.store.delete("expires_at");
  await sessionHttp.store.delete("id_token");
}

/**
 * Redirecciona al usuario a la página de login
 */
function redirectToLogin(): Response {
  return new Response(null, {
    status: 302,
    headers: { Location: LOGIN_REDIRECT_URL },
  });
}

/**
 * Valida el token de acceso contra el endpoint de userinfo de Keycloak
 */
async function validateAccessToken(accessToken: string | null): Promise<any | null> {
  if (!accessToken) return null;
  
  try {
    const response = await fetch(KEYCLOAK_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error validando token:", error);
    return null;
  }
}

/**
 * Refresca los tokens usando el refresh_token
 */
async function refreshTokens(refreshToken: string, sessionHttp: any, sessionWs: any): Promise<{ success: boolean }> {
  try {
    // Usar el cliente OAuth2 para refrescar los tokens
    const tokenResponse = await oauth2Client.refreshToken.refresh(refreshToken);
    
    if (!tokenResponse || !tokenResponse.accessToken) {
      return { success: false };
    }
    
    // Calcular tiempo de expiración y guardar los nuevos tokens
    const expiresAt = Date.now() + (tokenResponse.expiresIn * 1000);
    
    await sessionHttp.store.set("access_token", tokenResponse.accessToken);
    await sessionWs.store.set("access_token", tokenResponse.accessToken);

    await sessionHttp.store.set("refresh_token", tokenResponse.refreshToken || refreshToken);
    await sessionHttp.store.set("expires_at", expiresAt.toString());
    
    return { success: true };
  } catch (error) {
    console.error("Error refrescando tokens:", error);
    return { success: false };
  }
}