// config.ts
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { getRedisClient } from '@config/redisClient.ts';

await load({ envPath: "../.env", export: true });

// ============================================
// UTILIDADES INTERNAS
// ============================================
const env = {
  required: (name: string): string => {
    const value = Deno.env.get(name);
    if (!value) throw new Error(`❌ Missing required environment variable: ${name}`);
    return value;
  },
  get: (name: string, defaultValue = ""): string => 
    Deno.env.get(name) || defaultValue,
  number: (name: string, defaultValue: number): number => 
    Number(Deno.env.get(name) || defaultValue),
  boolean: (name: string, defaultValue = false): boolean => 
    Deno.env.get(name) === "true" || defaultValue,
};

const buildUrl = (ssl: boolean, host: string, port?: string | number) => 
  `${ssl ? "https" : "http"}://${host}${port ? ':' + port : ''}`;

// ============================================
// CARGA DE VARIABLES BASE
// ============================================
// Variables centralizadas que se derivan a las específicas
const appHost = env.get("APP_HOST", "localhost");
const appDomain = env.get("APP_DOMAIN", "localhost");
const appSSL = env.boolean("APP_SSL");

// ============================================
// VARIABLES DE CONFIGURACIÓN
// Fallback a las centralizadas si no existen las específicas
// ============================================
const mainApiConfigPort = env.number("MAIN_API_PORT", env.number("API_CONFIG_PORT", 3800));
const mainApiConfigHost = env.get("API_CONFIG_HOST", appHost);
const mainApiConfigSSL = env.boolean("API_CONFIG_SSL", appSSL);
const mainApiVersion = env.get("API_CONFIG_VERSION", "v1");

const backendApiConfigPort = Deno.env.get("BACKEND_API_PORT") || Deno.env.get("BACKEND_CONFIG_PORT");
const backendApiConfigHost = env.get("BACKEND_CONFIG_HOST", appHost);
const backendApiConfigSSL = env.boolean("BACKEND_CONFIG_SSL", appSSL);

const keycloakRealm = env.required("KEYCLOAK_REALM");
const keycloakEndpoint = env.get("KEYCLOAK_ENDPOINT") || buildUrl(appSSL, appDomain, undefined) + "/auth";
const keycloakSubdomain = env.get("KEYCLOAK_SERVER_URL") || `${appDomain}/realms/${keycloakRealm}`;
const keycloakConfigSSL = env.boolean("KEYCLOAK_CONFIG_SSL", appSSL);

// ============================================
// EXPORTACIÓN - ESTRUCTURA IDÉNTICA A LA ORIGINAL
// ============================================
export const config = {
  mainApiConfig: {
    port: mainApiConfigPort,
    host: mainApiConfigHost,
    version: mainApiVersion,
  },
  mainApiUrl: buildUrl(mainApiConfigSSL, mainApiConfigHost, mainApiConfigPort),
  
  backendApiConfig: {
    port: backendApiConfigPort,
    host: backendApiConfigHost,
    version: mainApiVersion,
  },
  
  backendApiUrl: buildUrl(backendApiConfigSSL, backendApiConfigHost, backendApiConfigPort),
  backendApiUrlDeepLink: buildUrl(backendApiConfigSSL, backendApiConfigHost),

  client_id: env.get("KEYCLOAK_CLIENT_WEB_ID", env.get("KEYCLOAK_CLIENT_WEB_ID", "client_id")),
  client_secret: env.get("KEYCLOAK_CLIENT_WEB_SECRET", env.get("KEYCLOAK_CLIENT_WEB_SECRET", "client_secret")),
  session_secret: env.get("SESSION_SECRET", "4Ft4GmWgvuUY9jRuG7Pxp/IEwzOWKTRRWjdnsDW64NU="),
  
  keycloakEndpoint,
  keycloak: {
    client: {
      server: {
        clientId: env.required("KEYCLOAK_CLIENT_SERVER_ID"),
        secret: env.required("KEYCLOAK_CLIENT_SERVER_SECRET"),
      },
      web: {
        clientId: env.required("KEYCLOAK_CLIENT_WEB_ID"),
        secret: env.required("KEYCLOAK_CLIENT_WEB_SECRET"),
      }
    },
    keycloakEndpoint,
    keycloakSubdomain,
    appOrigin: env.get("KEYCLOAK_APP_ORIGIN") || buildUrl(appSSL, appDomain, mainApiConfigPort),
    realm: keycloakRealm,
    issuerUrl: `https://${keycloakSubdomain}/.well-known/openid-configuration`
  }
};

export const redisClient = getRedisClient() as import("npm:redis").RedisClientType;

console.log(config);