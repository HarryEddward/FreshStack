import { FreshContext, Handlers } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import {
  oauth2Client,
  oauth2ClientWeb,
  oauth2ClientSumUp
} from "@utils/oauth_client.ts";
import { sessionApiManager } from "@utils/api/cookieProcessor.ts";
import { OAuth2Client } from "@cmd-johnson/oauth2-client";

async function storeTokensInSession(
  sessionHttpContext: State["sessions"]["sessionId"]["store"],
  sessionWsContext: State["sessions"]["wsSession"]["store"],
  tokens: { accessToken: string; refreshToken?: string; expiresIn?: number }
) {
  try {
    await sessionHttpContext.set("access_token", tokens.accessToken);
    await sessionWsContext.set("access_token", tokens.accessToken);

    if (tokens.refreshToken) {
      await sessionHttpContext.set("refresh_token", tokens.refreshToken);
    }
    if (tokens.expiresIn) {
      await sessionHttpContext.set("token_expires_in", tokens.expiresIn);
      await sessionHttpContext.set("token_issued_at", Date.now());
    }

    console.log("✅ Tokens almacenados en la sesión");
  } catch (error) {
    console.error("❌ Error almacenando tokens en la sesión:", error);
    throw error;
  }
}

export const handler: Handlers<unknown, State> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const pathname = url.pathname;

    const sessionHttp = ctx.state.sessions?.["sessionId"];
    const sessionWs = ctx.state.sessions?.["wsSession"];
    const sessionHttpContext = await sessionApiManager.getSession(req);

    console.log("🟡 Procesando callback de OAuth en:", pathname);

    // Detectar qué cliente usar según la URL
    const clientMap: Record<string, OAuth2Client> = {
      "/api/v1/public/oauth/callback/web": oauth2ClientWeb,
      "/api/v1/public/oauth/callback/app": oauth2Client,
      "/api/v1/public/oauth/callback": oauth2ClientSumUp,
    };

    const client = clientMap[pathname];

    if (!client) {
      console.error("❌ Ruta de callback no reconocida:", pathname);
      return new Response(
        JSON.stringify({ error: "Invalid callback path" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const codeVerifier = await sessionHttp.store.get("code_verifier");

      if (typeof codeVerifier !== "string" || !codeVerifier) {
        return new Response(
          JSON.stringify({ error: "Invalid or missing code verifier" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Obtener tokens con el cliente correcto
      const tokens = await client.code.getToken(url, { codeVerifier });

      if (!tokens.accessToken) {
        return new Response(
          JSON.stringify({ error: "Failed to obtain access token" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Guardar tokens
      await storeTokensInSession(sessionHttp.store, sessionWs.store, tokens);

      // Limpiar verifier
      await sessionHttp.store.set("code_verifier", null);

      // Redirigir al home
      return new Response(null, {
        status: 302,
        headers: { Location: Deno.env.get("APP_HOME_URL") || "/business/web/www" },
      });
    } catch (error) {
      console.error("❌ Error en el callback de OAuth:", error);
      await sessionHttp.store.destroy();
      return new Response(
        JSON.stringify({ error: "Authentication failed", message: (error as Error).message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
