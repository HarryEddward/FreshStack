import { FreshContext, Handlers } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { oauth2Client } from "@utils/oauth_client.ts";
import { sessionApiManager } from '@utils/api/cookieProcessor.ts';

// Almacena los tokens en la sesión
async function storeTokensInSession(
  sessionHttpContext: State["sessions"]["sessionId"]["store"],
  sessionWsContext: State["sessions"]["wsSession"]["store"], // <--- Aquí está el punto clave
  tokens: { accessToken: string; refreshToken?: string; expiresIn?: number }
) {
  try {
    console.log("access_token it's ok?");
    await sessionHttpContext.set("access_token", tokens.accessToken);
    await sessionWsContext.set("access_token", tokens.accessToken);

    console.log("access_token yes!");

    console.log(await sessionWsContext.get("access_token"));

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

// Maneja el callback de OAuth 2.0 con PKCE
export const handler: Handlers<unknown, State> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const sessionHttp = ctx.state.sessions?.["sessionId"];
    const sessionWs = ctx.state.sessions?.["wsSession"];
    const sessionHttpContext = await sessionApiManager.getSession(req);


    console.log("🟡 Procesando callback de OAuth en:", url.toString());

    console.log(await sessionHttpContext.store.getAll());

    const allSession = await sessionHttp.store.getAll();
    console.log("All Session");
    console.log(JSON.stringify(allSession));

    try {
      // Recuperar el codeVerifier de la sesión
      const codeVerifier = await sessionHttp.store.get("code_verifier");
      console.log("Code Verifier");
      console.log(codeVerifier);

      if (typeof codeVerifier !== "string" || !codeVerifier) {
        console.error("❌ Code verifier inválido o no encontrado");
        return new Response(
          JSON.stringify({ error: "Invalid or missing code verifier" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Obtener tokens usando el código de autorización y el codeVerifier
      const tokens = await oauth2Client.code.getToken(url, { codeVerifier });

      console.log("Tokens: ", JSON.stringify(tokens));
      if (!tokens.accessToken) {
        console.error("❌ No se obtuvo access_token");
        return new Response(
          JSON.stringify({ error: "Failed to obtain access token" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      

      // Almacenar tokens en la sesión
      await storeTokensInSession(sessionHttp.store, sessionWs.store, tokens);

      // Limpiar el codeVerifier de la sesión
      await sessionHttp.store.set("code_verifier", null);
      console.log("🧹 Code verifier eliminado de la sesión");

      // Redirigir a la página principal
      return new Response(null, {
        status: 302,
        headers: { Location: Deno.env.get("APP_HOME_URL") || "/" },
      });
    } catch (error) {
      console.error("❌ Error en el callback de OAuth:", error);
      // Destruir la sesión en caso de error para evitar estados inconsistentes
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