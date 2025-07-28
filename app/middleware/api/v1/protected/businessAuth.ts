// middleware/api/v1/protected/businessAuth.ts

import { FreshContext } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { oauth2Client } from "@utils/oauth_client.ts";
import { config } from "@config/index.ts";

// Función para validar el access_token usando /userinfo
async function validateAccessToken(accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error al validar access_token:", error);
    return false;
  }
}

export async function businessAuth(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  console.log("🟡 businessAuth");
  const session = ctx.state.sessions?.["sessionId"];
  const sessionWs = ctx.state.sessions?.["wsSession"];
  console.log(await sessionWs.store.getAll());

  let accessToken = await session.store.get("access_token") as string | null;
  const refreshToken = await session.store.get("refresh_token") as string | null;
  const tokenExpiresIn = await session.store.get("token_expires_in") as number | null;

  console.log("TOKEEEENS");
  console.log(accessToken, refreshToken, tokenExpiresIn);

  // Si no hay tokens, redirigir al login
  if (!accessToken || !refreshToken || !tokenExpiresIn) {
    console.log("No hay tokens, destruyendo sesión");
    await session.store.destroy();
    return new Response(null, {
      status: 302,
      headers: { Location: "/es/client/app/login" },
    });
  }

  // Validar el access_token
  let isAccessTokenValid = await validateAccessToken(accessToken);

  // Si el access_token no es válido, intentar refrescar los tokens
  if (!isAccessTokenValid) {
    console.log("Access token inválido, intentando refrescar...");
    try {
      // Usar el método getTokensByRefreshToken de OAuth2Client
      const newTokens = await oauth2Client.refreshToken.refresh(
        refreshToken,
      );

      // Actualizar la sesión con los nuevos tokens
      await session.store.set("access_token", newTokens.accessToken);
      await session.store.set("refresh_token", newTokens.refreshToken);
      await session.store.set("token_expires_in", newTokens.expiresIn);

      await sessionWs.store.set("access_token", newTokens.accessToken);

      console.log("Tokens refrescados exitosamente:", newTokens);

      // Actualizar el access_token para usar en el resto del middleware
      accessToken = newTokens.accessToken;
      isAccessTokenValid = true;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      // Si falla el refresco, destruir la sesión y redirigir al login
      await session.store.destroy();
      return new Response(null, {
        status: 302,
        headers: { Location: "/es/client/app/login" },
      });
    }
  }

  // Si el access_token es válido (o fue refrescado), continuar
  if (isAccessTokenValid) {
    // Opcional: Obtener información del usuario si es necesario
    const userInfoResponse = await fetch(
      `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      console.error("Error al obtener userinfo después de refrescar");
      await session.store.destroy();
      return new Response(null, {
        status: 302,
        headers: { Location: "/es/client/app/login" },
      });
    }

    const userInfo = await userInfoResponse.json();
    console.log("Información del usuario:", userInfo);

    // Continuar con el siguiente middleware
    const resp = await next();

    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers: resp.headers,
    });
  }

  // Fallback: si algo falla, redirigir al login
  await session.store.destroy();
  return new Response(null, {
    status: 302,
    headers: { Location: "/es/client/app/login" },
  });
}