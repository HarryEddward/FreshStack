
// @/src/routes/private/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_private,
  GET_Schema_private,
  POST_Schema_private,
  PUT_Schema_private
} from './schema';
import {
  DELETE_Handler_private,
  GET_Handler_private,
  POST_Handler_private,
  PUT_Handler_private
} from './controller';
import { authKeycloakHandler } from '@/middlewares/authKeycloak';
import fastifyAutoload from '@fastify/autoload';
import { join } from 'path';

async function userRoutes(server: FastifyInstance) {

  
  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_private,
        response: globalResponseStatuses
      },
    },
    POST_Handler_private
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_private,
        response: globalResponseStatuses
      },
    },
    GET_Handler_private
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_private,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_private
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_private,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_private
  );

}

export default userRoutes;
