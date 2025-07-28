import {config} from "@config/index.ts";
import * as client from 'openid-client';


let keycloakServerClient: client.Configuration | null = null;

export async function getKeycloakServerConfig(): Promise<client.Configuration> {
    if (keycloakServerClient) {
        return keycloakServerClient;
    }

    const configKeycloak: Promise<client.Configuration> = client.discovery(
        new URL(config.keycloak.issuerUrl),
        config.keycloak.client.server.clientId,
        config.keycloak.client.server.secret,
    );


  return configKeycloak;
}



let keycloakWebClient: client.Configuration | null = null;

export async function getKeycloakWebConfig(): Promise<client.Configuration> {
    if (keycloakWebClient) {
        return keycloakWebClient;
    }

    const configKeycloak: Promise<client.Configuration> = client.discovery(
        new URL(config.keycloak.issuerUrl),
        config.keycloak.client.web.clientId,
        config.keycloak.client.web.secret,
    );


  return configKeycloak;
}
