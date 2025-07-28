import { config } from '@config/index.ts';
import { OAuth2Client } from "@cmd-johnson/oauth2-client";

/*
export const oauth2Client = new OAuth2Client({
  clientId: Deno.env.get("CLIENT_ID")!,
  clientSecret: Deno.env.get("CLIENT_SECRET")!,
  authorizationEndpointUri: "https://github.com/login/oauth/authorize",
  tokenUri: "https://github.com/login/oauth/access_token",
  redirectUri: "http://localhost:8000/callback",
  defaults: {
    scope: "read:user", // Permiso para leer datos del usuario
  },
});
*/

class KeycloakOAuth2Client extends OAuth2Client {
  // Método para cerrar la sesión en Keycloak
  async logout(refreshToken: string, options: { redirectUri?: string } = {}): Promise<{ success: boolean; redirectUrl?: string }> {
    // Construir el endpoint de logout basado en el authorizationEndpointUri
    const baseUrl = this.config.authorizationEndpointUri.split("/realms/")[0];
    const realm = this.config.authorizationEndpointUri.split("/realms/")[1].split("/")[0];
    const logoutUri = `${baseUrl}/realms/${realm}/protocol/openid-connect/logout`;

    // Parámetros para la solicitud de logout
    const body = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret || "", // client_secret es opcional para clientes públicos
      refresh_token: refreshToken,
    });

    try {
      const response = await fetch(logoutUri, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (response.status !== 204) {
        const errorData = await response.json();
        throw new Error(`Error al cerrar sesión: ${errorData.error_description || response.statusText}`);
      }

      // Si se proporciona un redirectUri, construir la URL de logout global de Keycloak
      let redirectUrl: string | undefined;
      if (options.redirectUri) {
        redirectUrl = `${logoutUri}?redirect_uri=${encodeURIComponent(options.redirectUri)}`;
      }

      return { success: true, redirectUrl };
    } catch (error) {
      console.error("Error durante el logout:", error);
      throw error;
    }
  }
}




export const oauth2ClientWeb = new KeycloakOAuth2Client({
    clientId: Deno.env.get("CLIENT_ID")!,
    clientSecret: Deno.env.get("CLIENT_SECRET")!,
    redirectUri: `${config.backendApiUrl}/api/v1/public/oauth/callback/web`,
    authorizationEndpointUri: `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/auth`,
    tokenUri: `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/token`,
    defaults: {
        scope: "openid profile email", // Alcances necesarios
    },
});

export const oauth2Client = new KeycloakOAuth2Client({
    clientId: Deno.env.get("CLIENT_ID")!,
    clientSecret: Deno.env.get("CLIENT_SECRET")!,
    redirectUri: `${config.backendApiUrl}/api/v1/public/oauth/callback/app`,
    authorizationEndpointUri: `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/auth`,
    tokenUri: `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/token`,
    defaults: {
        scope: "openid profile email", // Alcances necesarios
    },
});


export const oauth2ClientSumUp = new OAuth2Client({
    clientId: Deno.env.get("CLIENT_ID")!,
    clientSecret: Deno.env.get("CLIENT_SECRET")!,
    redirectUri: `${config.backendApiUrl}/api/v1/public/oauth/callback`,
    authorizationEndpointUri: `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/auth`,
    tokenUri: `${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/token`,
    defaults: {
        scope: "openid profile email", // Alcances necesarios
    },
});
