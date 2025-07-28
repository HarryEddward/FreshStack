import config from "@/config/index";
import * as client from 'openid-client';

let keycloakClient: client.Configuration | null = null;

export async function getKeycloakConfig(): Promise<client.Configuration> {
    if (keycloakClient) {
        return keycloakClient;
    }

    const configKeycloak: Promise<client.Configuration> = client.discovery(
        new URL(config.keycloak.issuerUrl),
        config.keycloak.clientId,
        config.keycloak.secret,
    );


  return configKeycloak;
}
