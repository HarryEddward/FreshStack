// src/plugins/s3.ts
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import * as Stripe from 'stripe';
import config from '@/config';

declare module 'fastify' {
  interface FastifyInstance {
    stripe: Stripe.Stripe;
  }
}


async function stripePlugin(fastify: FastifyInstance) {

  const stripe = new Stripe.Stripe(config.stripe.secretKey);
  fastify.decorate('stripe', stripe);
}

export default fp(stripePlugin);
