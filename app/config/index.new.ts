// config.ts
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { getRedisClient } from '@config/redisClient.ts';

await load({ envPath: "../.env", export: true });

// ============================================
// UTILIDADES DE ENTORNO
// ============================================
const env = {
  required: (name: string): string => {
    const value = Deno.env.get(name);
    if (!value) throw new Error(`❌ Variable de entorno requerida: ${name}`);
    return value;
  },
  get: (name: string, defaultValue = ""): string => 
    Deno.env.get(name) || defaultValue,
  number: (name: string, defaultValue: number): number => 
    Number(Deno.env.get(name)) || defaultValue,
  boolean: (name: string, defaultValue = false): boolean => 
    Deno.env.get(name) === "true" || (Deno.env.get(name) === undefined && defaultValue),
};

const buildUrl = (ssl: boolean, host: string, port?: string | number): string => 
  `${ssl ? "https" : "http"}://${host}${port ? `:${port}` : ''}`;

// ============================================
// CONFIGURACIÓN BASE DE LA APLICACIÓN
// ============================================
const app = {
  host: env.get("APP_HOST", "localhost"),
  domain: env.get("APP_DOMAIN", "localhost"),
  ssl: env.boolean("APP_SSL"),
};

// ============================================
// CONFIGURACIÓN DE APIs
// ============================================
const mainApi = {
  port: env.number("MAIN_API_PORT", env.number("API_CONFIG_PORT", 3800)),
  host: env.get("API_CONFIG_HOST", app.host),
  ssl: env.boolean("API_CONFIG_SSL", app.ssl),
  version: env.get("API_CONFIG_VERSION", "v1"),
};

const backendApi = {
  port: env.get("BACKEND_API_PORT") || env.get("BACKEND_CONFIG_PORT"),
  host: env.get("BACKEND_CONFIG_HOST", app.host),
  ssl: env.boolean("BACKEND_CONFIG_SSL", app.ssl),
  version: mainApi.version,
};

// ============================================
// CONFIGURACIÓN DE KEYCLOAK
// ============================================
const keycloak = {
  realm: env.required("KEYCLOAK_REALM"),
  endpoint: env.get("KEYCLOAK_ENDPOINT") || `${buildUrl(app.ssl, app.domain)}/auth`,
  subdomain: env.get("KEYCLOAK_SERVER_URL") || `${app.domain}/realms/${env.required("KEYCLOAK_REALM")}`,
  clients: {
    server: {
      id: env.required("KEYCLOAK_CLIENT_SERVER_ID"),
      secret: env.required("KEYCLOAK_CLIENT_SERVER_SECRET"),
    },
    web: {
      id: env.required("KEYCLOAK_CLIENT_WEB_ID"),
      secret: env.required("KEYCLOAK_CLIENT_WEB_SECRET"),
    },
  },
};

// ============================================
// EXPORTACIÓN FINAL
// ============================================
export const config = {
  // APIs
  mainApiConfig: {
    port: mainApi.port,
    host: mainApi.host,
    version: mainApi.version,
  },
  mainApiUrl: buildUrl(mainApi.ssl, mainApi.host, mainApi.port),
  
  backendApiConfig: {
    port: backendApi.port,
    host: backendApi.host,
    version: backendApi.version,
  },
  backendApiUrl: buildUrl(backendApi.ssl, backendApi.host, backendApi.port),
  backendApiUrlDeepLink: buildUrl(backendApi.ssl, backendApi.host),

  // Secrets (deprecados - usar keycloak.clients)
  client_id: keycloak.clients.web.id,
  client_secret: keycloak.clients.web.secret,
  session_secret: env.get("SESSION_SECRET", "4Ft4GmWgvuUY9jRuG7Pxp/IEwzOWKTRRWjdnsDW64NU="),
  
  // Keycloak
  keycloakEndpoint: keycloak.endpoint,
  keycloak: {
    client: {
      server: {
        clientId: keycloak.clients.server.id,
        secret: keycloak.clients.server.secret,
      },
      web: {
        clientId: keycloak.clients.web.id,
        secret: keycloak.clients.web.secret,
      },
    },
    keycloakEndpoint: keycloak.endpoint,
    keycloakSubdomain: keycloak.subdomain,
    appOrigin: env.get("KEYCLOAK_APP_ORIGIN") || buildUrl(app.ssl, app.domain, mainApi.port),
    realm: keycloak.realm,
    issuerUrl: `http://${keycloak.subdomain}/.well-known/openid-configuration`,
  },
};

export const redisClient = getRedisClient() as import("npm:redis").RedisClientType;

console.log(config);