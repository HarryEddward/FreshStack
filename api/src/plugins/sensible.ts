// src/plugins/sensible.ts
import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';
import { FastifyInstance } from 'fastify';

async function sensiblePlugin(fastify: FastifyInstance) {
  fastify.register(sensible);
}

export default fp(sensiblePlugin);