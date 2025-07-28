// src/plugins/s3.ts
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { S3Client } from "@aws-sdk/client-s3";
import config from '@/config';

declare module 'fastify' {
  interface FastifyInstance {
    s3: S3Client;
  }
}


async function s3Plugin(fastify: FastifyInstance) {
  const s3 = new S3Client({
    region: config.minio.region,
    endpoint: config.minio.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.minio.api_keys.access,
      secretAccessKey: config.minio.api_keys.secret
    },
  });

  fastify.decorate('s3', s3);
}

export default fp(s3Plugin);
