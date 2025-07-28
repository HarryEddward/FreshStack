
// @/src/lang/business/man/testing//routes.ts

import fastify, { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_testing,
  GET_Schema_testing,
  POST_Schema_testing,
  PUT_Schema_testing
} from './schema';
import {
  DELETE_Handler_testing,
  GET_Handler_testing,
  POST_Handler_testing,
  PUT_Handler_testing
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.addHook('preHandler', async (request, reply) => {
    console.log('Pre-handler hook for testing route');
  });

  

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_testing,
        response: globalResponseStatuses
      },
    },
    POST_Handler_testing
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_testing,
        response: globalResponseStatuses
      },
    },
    GET_Handler_testing
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_testing,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_testing
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_testing,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_testing
  );
}

export default userRoutes;
