import fp from 'fastify-plugin';
import { fastifyS3BucketsPlugin, BucketConfiguration } from 'fastify-s3';
import { S3Client, S3ClientConfigType } from '@aws-sdk/client-s3';

export default fp<{ buckets: BucketConfiguration[] }>(async (fastify, opts) => {
    const s3Config: S3ClientConfigType = {
        endpoint: 'https://10.241.157.225:8334',
        forcePathStyle: true,
        region: 'eu-west-1',
        credentials: {
            accessKeyId: "AK1234567890",
            secretAccessKey: "SK1234567890"
        },
    };   
    const s3Client = new S3Client(s3Config);
    fastify.register(fastifyS3BucketsPlugin, {
        s3Client,
        buckets: opts.buckets,
    });
});