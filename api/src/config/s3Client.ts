// s3Client.js
import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'us-east-1', // la región es irrelevante para SeaweedFS
  endpoint: 'http://localhost:8333', // o la IP/Puerto de tu instancia C3/SeaweedFS S3
  credentials: {
    accessKeyId: 'tu-access-key',
    secretAccessKey: 'tu-secret-key',
  },
  forcePathStyle: true // obligatorio para compatibilidad con S3 no-AWS
});

export default s3Client;
