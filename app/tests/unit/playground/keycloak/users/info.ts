import { KC_URL_OPENID, readJsonKeyCloak } from "../config.ts";

export async function main(): Promise<void> {
  const currentJsonKeyCloak = await readJsonKeyCloak();

  const response = await fetch(`${KC_URL_OPENID}/userinfo`, {
    method: "POST",
    headers: {
      //"Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${currentJsonKeyCloak.access_token}`,
    },
  });

  // ✅ Verificamos si la respuesta es correcta
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${await response.text()}`);
  }

  // ✅ Convertimos la respuesta en JSON
  const data = await response.json();
  console.log(data);
}
