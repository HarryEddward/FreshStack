import {
  KC_URL_OPENID,
  readJsonKeyCloak,
  updateJsonKeyCloak,
} from "../config.ts";

export async function main(): Promise<void> {
  const currentJsonKeyCloak = await readJsonKeyCloak();

  const body = new URLSearchParams({
    grant_type: "password", // O "client_credentials" si no usas usuario/contraseña
    client_id: "fresh-client-mobile", // Cambia esto por tu Client ID
    username: "cliente1", // Cambia por el usuario
    password: "1234", // Cambia por la contraseña
    scope: "openid profile email",
  });

  const response = await fetch(`${KC_URL_OPENID}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //"Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWYUJiTGJrc2M4bzBiYWk3TFJENjNfVnBUN3gxWUV1WV91aXQzN3F3cncwIn0.eyJleHAiOjE3NDI1OTA3MzgsImlhdCI6MTc0MjU5MDQzOCwianRpIjoiY2RkNDAzMzgtN2EzMC00ZjE4LWE1Y2QtODg2OWY0YmQzNTBkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTg3L3JlYWxtcy9DYWZlQnV5IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQxNTI2ZmEyLTAxYmUtNDQ0My05ODMxLTU4NGFhNmI4ZWVkZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyZXNoLWNsaWVudC1tb2JpbGUiLCJzaWQiOiI2MDA1MmUyYS1kNTE4LTQ2ZGMtODYxOS05N2YwZmUzNGM4YjkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1jYWZlYnV5Iiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJBZHJpYW4gTWFydGluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2xpZW50ZTEiLCJnaXZlbl9uYW1lIjoiQWRyaWFuIiwiZmFtaWx5X25hbWUiOiJNYXJ0aW4iLCJlbWFpbCI6ImhlMDc4MDA3MEBnbWFpbC5jb20ifQ.EBXLgM_pHFjjJkmL0IRVYie_pPD9rwaPm3ItC73D1za6UJIdOL7CGsGSAJooS6RXcctIxd0_61V_pAIF1PnoprXH3Bgxs7LljVuJfRdjhYt6yE3I0DEYXlhLOef-Qs8YAZd1kcR7Uqu7SfCZkmsn9ERoQbO3fCnfMM2fPuYYk68j4uLMR0He80EROuNsofZG_GUeOFg4q-g7rbYE7ET-FN-yo3xISN4X5jDdJwtTPykKJNwVZve1WSwkFuXG_NlmADiHqTCNy_7o8hmXHbPAlvCXkztizBDpHwtNtQhP4Mb1hmpa4NBtXs2Ho3sxfFe8HU9gJIGcBRuMlSFNbDa43Q",
    },
    body,
  });

  // ✅ Verificamos si la respuesta es correcta
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${await response.text()}`);
  }

  interface IDataToken {
    access_token?: string;
    expires_in?: number;
    refresh_expires_in?: number;
    refresh_token?: string;
    token_type?: string;
    id_token?: string;
    "not-before-policy"?: number;
    session_state?: string;
    scope?: string;
  }

  const dataToken: Partial<IDataToken> = await response.json();
  console.log(dataToken);

  const updatedData = {
    ...currentJsonKeyCloak, // Mantiene los datos previos
    access_token: dataToken.access_token ?? currentJsonKeyCloak.access_token,
    refresh_token: dataToken.refresh_token ?? currentJsonKeyCloak.refresh_token,
  };

  await updateJsonKeyCloak(updatedData);
}
