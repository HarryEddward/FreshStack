// src/config/index.ts
import dotenv from 'dotenv';
dotenv.config(); // Carga variables desde .env



const currentApiVersion: string = "v1";
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'info'),
  // Agrega otras variables de configuración aquí
  databaseUrl: process.env.DATABASE_URL || "", // Asegúrate de que Prisma la use
  currentApiVersion,
  prefixApi: `/api/${currentApiVersion}`,
  minio: {
    region: process.env.MINIO_REGION || "west-europe-1",
    endpoint: process.env.MINIO_ENDPOINT || "http://localhost:9000",
    port: Number(process.env.MINIO_PORT) || 9000,
    host: process.env.MINIO_HOST || "localhost",
    api_keys: {
      access: process.env.MINIO_CREDENTIALS_ACCESS_KEY || "",
      secret: process.env.MINIO_CREDENTIALS_SECRET_KEY || ""
    }
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ""
  },
  session: {
    secret: process.env.SESSION_SECRET || ""
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
  keycloak: {
    appOrigin: process.env.KEYCLOAK_APP_ORIGIN || 'http://10.241.157.225:8186',
    keycloakSubdomain: process.env.KEYCLOAK_SERVER_URL || '',
    clientIdExpoApp: process.env.KEYCLOAK_CLIENT_ID_EXPO_APP || '',
    realm: process.env.KEYCLOAK_REALM || 'CafeBuy'
  }

};

console.log(config);

export default config;