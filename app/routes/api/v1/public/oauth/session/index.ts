import { FreshContext, Handlers } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { oauth2Client } from "@utils/oauth_client.ts";

// Almacena los tokens en la sesión
async function storeTokensInSession(
  sessionHttpContext: State["sessions"]["sessionId"]["store"],
  sessionWsContext: State["sessions"]["wsSession"]["store"], // <--- Aquí está el punto clave
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

// Maneja el callback de OAuth 2.0 con PKCE
export const handler: Handlers<unknown, State> = {
  async POST(req, ctx) {

    const reqForm = await req.formData();
    const code = reqForm.get("code") || "";
    const codeVerifier = reqForm.get("code_verifier") || "";

    const url = new URL(req.url);
    const sessionHttp = ctx.state.sessions?.["sessionId"];
    const sessionWs = ctx.state.sessions?.["wsSession"];
    console.log("🟡 Procesando callback de OAuth en:", url.toString());

    await sessionHttp.store.set("code_verifier", codeVerifier);

    return new Response(null, {
      status: 303,
      headers: { Location: oauth2Client.config.redirectUri || "myapp://callback" },
    });
  },
};