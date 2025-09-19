import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import Stripe from 'stripe';
import { createClient } from "redis";
import { init } from "./init.ts";
import { getRedisClient } from '@config/redisClient.ts';

await load({ envPath: "../.env", export: true });

// Validaciones y helpers
const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
};

//const stripeSecretKey = new Stripe(Deno.env.get("API_KEY_STRIPE") || "");

const mainApiConfigPort = Number(Deno.env.get("API_CONFIG_PORT")) || 3800;
const mainApiConfigHost = Deno.env.get("API_CONFIG_HOST") || "localhost";
const mainApiConfigSSL = Deno.env.get("API_CONFIG_SSL") === "true" || false;
const mainApiVersion = Deno.env.get("API_CONFIG_VERSION") || "v1";

const backendApiConfigPort = Deno.env.get("BACKEND_CONFIG_PORT");
const backendApiConfigHost = Deno.env.get("BACKEND_CONFIG_HOST") || "localhost";
const backendApiConfigSSL = Deno.env.get("BACKEND_CONFIG_SSL") === "true" || false;


const keycloakEndpoint = /*Deno.env.get("KEYCLOAK_ENDPOINT") ||*/ "http://10.241.157.225:8186";
const keycloakSubdomain = required(Deno.env.get("KEYCLOAK_SERVER_URL"), "KEYCLOAK_SERVER_URL");
const keycloakConfigSSL = required(Deno.env.get("KEYCLOAK_CONFIG_SSL"), "KEYCLOAK_CONFIG_SSL") === "true" || false;


export const config = {
    mainApiConfig: {
        port: mainApiConfigPort,
        host: mainApiConfigHost,
        version: mainApiVersion,
    },
    mainApiUrl: `${mainApiConfigSSL ? "https" : "http"}://${mainApiConfigHost}:${mainApiConfigPort}`,
    backendApiConfig: {
        port: backendApiConfigPort,
        host: backendApiConfigHost,
        version: mainApiVersion,
    },
    /*paymentProvider: {
        stripeSecretKey,
    },*/
    backendApiUrl: `${backendApiConfigSSL ? "https" : "http"}://${backendApiConfigHost}${backendApiConfigPort && ':' + backendApiConfigPort}`,
    backendApiUrlDeepLink: `${backendApiConfigSSL ? "https" : "http"}://${backendApiConfigHost}`,
    client_id: Deno.env.get("CLIENT_ID") || "client_id",
    client_secret: Deno.env.get("CLIENT_SECRET") || "client_secret",
    session_secret: "4Ft4GmWgvuUY9jRuG7Pxp/IEwzOWKTRRWjdnsDW64NU=", //Deno.env.get("SESSION_SECRET") || "default-secret-please-change", // ¡Cambia esto en producción!
    keycloakEndpoint,
    keycloak: {
        client: {
            server: {
                clientId: required(Deno.env.get("KEYCLOAK_CLIENT_SERVER_ID"), 'KEYCLOAK_CLIENT_SERVER_ID'),
                secret: required(Deno.env.get("KEYCLOAK_CLIENT_SERVER_SECRET"), 'KEYCLOAK_CLIENT_SERVER_SECRET'),
            },
            web: {
                clientId: required(Deno.env.get("KEYCLOAK_CLIENT_WEB_ID"), 'KEYCLOAK_CLIENT_WEB_ID'),
                secret: required(Deno.env.get("KEYCLOAK_CLIENT_WEB_SECRET"), 'KEYCLOAK_CLIENT_WEB_SECRET'),
            }
        },
        keycloakEndpoint,
        keycloakSubdomain,
        
        appOrigin: required(Deno.env.get("KEYCLOAK_APP_ORIGIN"), "KEYCLOAK_APP_ORIGIN"),
        realm: required(Deno.env.get("KEYCLOAK_REALM"), "KEYCLOAK_REALM"),
        issuerUrl: `http://` + keycloakSubdomain + '/.well-known/openid-configuration'
    }
};


export const redisClient = getRedisClient() as import("npm:redis").RedisClientType;


console.log(config);