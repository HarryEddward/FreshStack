// src/config/index.ts
import dotenv from 'dotenv';
import path from 'path';

// Cargar .env (busca también en otros entornos)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Validaciones y helpers
const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${name}`);
  }
  return value;
};

const currentApiVersion = 'v1';
const keycloakSubdomain = required(process.env.KEYCLOAK_SERVER_URL, 'KEYCLOAK_SERVER_URL');

const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  logLevel: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug'),

  // App versioning
  currentApiVersion,
  prefixApi: `/api/${currentApiVersion}`,

  // Base de datos (Prisma)
  databaseUrl: required(process.env.DATABASE_URL, 'DATABASE_URL'),

  // MinIO
  minio: {
    region: process.env.MINIO_REGION || 'west-europe-1',
    endpoint: required(process.env.MINIO_ENDPOINT, 'MINIO_ENDPOINT'),
    bucketName: required(process.env.MINIO_BUCKET_NAME, 'MINIO_BUCKET_NAME'),
    port: Number(process.env.MINIO_PORT) || 9000,
    host: process.env.MINIO_HOST || 'localhost',
    api_keys: {
      access: required(process.env.MINIO_CREDENTIALS_ACCESS_KEY, 'MINIO_CREDENTIALS_ACCESS_KEY'),
      secret: required(process.env.MINIO_CREDENTIALS_SECRET_KEY, 'MINIO_CREDENTIALS_SECRET_KEY')
    }
  },

  // Stripe
  stripe: {
    secretKey: required(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY'),
    publishableKey: required(process.env.STRIPE_PUBLISHABLE_KEY, 'STRIPE_PUBLISHABLE_KEY')
  },

  // JWT / sesiones
  session: {
    secret: required(process.env.SESSION_SECRET, 'SESSION_SECRET')
  },
  jwt: {
    secret: required(process.env.JWT_SECRET, 'JWT_SECRET')
  },

  // Keycloak
  keycloak: {
    appOrigin: process.env.KEYCLOAK_APP_ORIGIN || 'https://localhost:3000',
    keycloakSubdomain,
    clientId: required(process.env.KEYCLOAK_CLIENT_ID, 'KEYCLOAK_CLIENT_ID'),
    realm: process.env.KEYCLOAK_REALM || 'CafeBuy',
    secret: required(process.env.KEYCLOAK_CLIENT_SECRET, 'KEYCLOAK_CLIENT_SECRET'),
    issuerUrl: 'https://' + keycloakSubdomain + '/.well-known/openid-configuration'
  },
};

export default config;
