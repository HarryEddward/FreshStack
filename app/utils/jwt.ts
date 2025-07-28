import { config } from '@config/index.ts';
import { verify, decode } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

const SUPPORTED_ALGORITHMS = ["RS256", "PS256", "ES256"]; // Algoritmos que soportas

export async function verifyJwt(token: string) {
  const [{ alg, kid }] = decode(token) as [{ alg: string; kid: string }, any, any];

  if (!SUPPORTED_ALGORITHMS.includes(alg)) {
    throw new Error(`Algoritmo no soportado: ${alg}`);
  }

  const key = await getPublicKey(kid);
  if (!key) throw new Error("Clave pública no encontrada");

  const payload = await verify(token, key);

  // Validar issuer
  if (payload.iss !== `${config.keycloakEndpoint}/realms/CafeBuy`) {
    throw new Error("Issuer no válido");
  }

  // Validar expiración
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    throw new Error("Token expirado");
  }

  return payload;
}

async function getPublicKey(kid: string): Promise<CryptoKey | null> {
  const res = await fetch(`${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/certs`);
  const { keys } = await res.json();

  const jwk = keys.find((key: any) => key.kid === kid);

  if (!jwk) return null;

  return await crypto.subtle.importKey(
    "jwk",
    jwk,
    {
      name: "RSASSA-PKCS1-v1_5", // para RS256 (asegúrate que tu Keycloak usa RS256)
      hash: "SHA-256",
    },
    true,
    ["verify"]
  );
}

// Función para refrescar el token usando el refresh token
async function refreshAccessToken(refreshToken: string): Promise<{ access_token: string, refresh_token?: string }> {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", config.client_id); // Cambia por tu client_id
  // Si tu cliente tiene client_secret, añadirlo aquí:
  params.append("client_secret", config.client_secret);
  params.append("refresh_token", refreshToken);

  const res = await fetch(`${config.keycloakEndpoint}/realms/CafeBuy/protocol/openid-connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`No se pudo refrescar el token: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  //console.log("Token refrescado:", data);
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token, // Opcional, puede venir o no
  };
}

// Función principal que verifica y refresca el token si hace falta
export async function verifyOrRefreshToken(accessToken: string, refreshToken: string) {
  try {
    const payload = await verifyJwt(accessToken);
    return { valid: true, payload, accessToken, refreshToken };
  } catch (error) {
    console.log("Access token inválido o expirado, intentando refrescar:", error.message);

    try {
      const refreshedTokens = await refreshAccessToken(refreshToken);
      // Verificamos el nuevo access token
      const newPayload = await verifyJwt(refreshedTokens.access_token);

      return {
        valid: true,
        payload: newPayload,
        accessToken: refreshedTokens.access_token,
        refreshToken: refreshedTokens.refresh_token ?? refreshToken,
      };
    } catch (refreshError) {
      console.error("No se pudo refrescar el token:", refreshError.message);
      return { valid: false, error: refreshError.message };
    }
  }
}


/*
const payload = {
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWYUJiTGJrc2M4bzBiYWk3TFJENjNfVnBUN3gxWUV1WV91aXQzN3F3cncwIn0.eyJleHAiOjE3NDgwMDUwNzgsImlhdCI6MTc0ODAwNDc3OCwianRpIjoiMjIxN2UyNGYtMWVhNS00NDM1LTkxZDAtNGI1MmIzNmFmYjUwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQ2ODA4NWU3LWM0MzUtNGM0ZC04NDA1LWY5M2NjMjExMWE4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyZXNoLWNsaWVudC1tb2JpbGUiLCJzaWQiOiJiYmM3M2UwMi0xZGMwLTQ1MWItYWJhZC0zZjdhYjQ5ODRlMTkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1jYWZlYnV5Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImhlMDc4MDA3MEBnbWFpbC5jb20iLCJlbWFpbCI6ImhlMDc4MDA3MEBnbWFpbC5jb20ifQ.MX8NYqoS7p6lbsAQZJxpj5VM6y8y3nQ_VO7ZQ0ir0QDe0eCLwwmq-wzV1xIVG9i14IcdcODJc39tWwvNKllZwelRfHKR03oIpwQIk0g5iw6CQAwHo6JD6BM73sFtCx4J-0s6CNzt_xEfPyGxWUsWsQzs2ErRU3VeGvzTbuC9oEKmA4DMv5VsZLmCoW9GIEVG6rqi9879P_SD0WO4Bzn2UB8_UdI9QHCLQV4vF0auKa8zy1jYfHretvZLl0_dYr-CTudyKWHnL17i-Nn8OybCGzGfXcGNkmh0yXJJXnrs458rY_RmNzyh4wX7MVnQMT5FSepipj5XfDuYGwoPpcINsw",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5ZDhiNTkxMS05MGNkLTRhMDEtYTJhMi0zMDIyYjM3NTI0OTEifQ.eyJleHAiOjE3NDgwMDY1NzgsImlhdCI6MTc0ODAwNDc3OCwianRpIjoiNjA5ZTE2ZjUtNTM4Ni00NGY2LTgzOWMtZWVhMmMxYjNmNGZkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5Iiwic3ViIjoiZDY4MDg1ZTctYzQzNS00YzRkLTg0MDUtZjkzY2MyMTExYTg5IiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImZyZXNoLWNsaWVudC1tb2JpbGUiLCJzaWQiOiJiYmM3M2UwMi0xZGMwLTQ1MWItYWJhZC0zZjdhYjQ5ODRlMTkiLCJzY29wZSI6Im9wZW5pZCBiYXNpYyB3ZWItb3JpZ2lucyBwcm9maWxlIGVtYWlsIGFjciByb2xlcyJ9.PyRtc1-TaRMSlH8K_NwJrIAVAczpV9TktZBDRqBqNP-wmE5Yzidbus5jZ3QHlkXydKMzyUTH9IxkGE1P8oDwZw",
  "token_type": "Bearer",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWYUJiTGJrc2M4bzBiYWk3TFJENjNfVnBUN3gxWUV1WV91aXQzN3F3cncwIn0.eyJleHAiOjE3NDgwMDUwNzgsImlhdCI6MTc0ODAwNDc3OCwianRpIjoiZDUxMzY0MjItYTA1Ny00ZmQ3LTg3OTgtOGQwNjFiZjhjZDNlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5IiwiYXVkIjoiZnJlc2gtY2xpZW50LW1vYmlsZSIsInN1YiI6ImQ2ODA4NWU3LWM0MzUtNGM0ZC04NDA1LWY5M2NjMjExMWE4OSIsInR5cCI6IklEIiwiYXpwIjoiZnJlc2gtY2xpZW50LW1vYmlsZSIsInNpZCI6ImJiYzczZTAyLTFkYzAtNDUxYi1hYmFkLTNmN2FiNDk4NGUxOSIsImF0X2hhc2giOiJzbmNlNzI0LXhJU2FQNjZRVnZCNlVRIiwiYWNyIjoiMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGUwNzgwMDcwQGdtYWlsLmNvbSIsImVtYWlsIjoiaGUwNzgwMDcwQGdtYWlsLmNvbSJ9.cpUcou6l0xuiMFIVbmy9qjCQ_f2K6krBwz8p8yPQxqyn1pDSYlc6d2tnfbRjgE6pG4VV51hFs3FBd0p-oRu1D5BFQHJy7gI_9USb4ErJiAU9pepCK0zd4rs27r2DGtjsjsHVso8T3hqPr8WMDcMQ6AIun1MKvvO9JZ2HttxKbHpeH-MLyK82_6d-pHPbgByjPThzqWIYY9itRS5C72PJJRB-wQLT10aZkWasBkk-VsNaiyH6xqPzRhx46qDFOArvXNipbop8AsUeYCc4HmWjn5Px3KJwyZYIOXkOQlivFGVZVESSDNLqkmQFfK4kWRAZSbkEB_0H9CbebIs6C24IRQ",
  "not-before-policy": 0,
  "session_state": "bbc73e02-1dc0-451b-abad-3f7ab4984e19",
  "scope": "openid profile email"
}

// Ejemplo de uso
const accessToken = payload.access_token;
const refreshToken = payload.refresh_token;

const result = await verifyOrRefreshToken(accessToken, refreshToken);

if (result.valid) {
  console.log("Usuario autenticado:", result.payload.preferred_username);
  // Aquí usas result.accessToken y result.refreshToken actualizados si cambió
} else {
  console.error("No autenticado:", result.error);
}
*/