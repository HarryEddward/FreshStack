import { dirname } from "$std/path/dirname.ts";
import { join } from "$std/path/join.ts";
import { config } from '@config/index.ts';

export const KEYCLOAK_URL = config.keycloakEndpoint;
export const KC_URL_REALME_CAFEBUY = `${KEYCLOAK_URL}/realms/CafeBuy`;
export const KC_URL_OPENID = `${KC_URL_REALME_CAFEBUY}/protocol/openid-connect`;

export function obtainFilePathJsonKeyCloak(): string {
  const currentDir = dirname(new URL(import.meta.url).pathname);

  return join(currentDir, "keycloak.json");
}

export async function readJsonKeyCloak(): Promise<Record<string, string>> {
  try {
    const filePath = obtainFilePathJsonKeyCloak();

    const jsonText = await Deno.readTextFile(filePath);
    return JSON.parse(jsonText);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log("El archivo no existe, se creará uno nuevo.");
      return {}; // Retornamos un objeto vacío
    } else {
      throw error; // Si es otro error, lo relanzamos
    }
  }
}

export async function updateJsonKeyCloak(
  updateData: Record<string, unknown>,
): Promise<void> {
  const filePath = obtainFilePathJsonKeyCloak();

  const resultString = JSON.stringify(updateData, null, 2);

  await Deno.writeTextFile(filePath, resultString);
}
