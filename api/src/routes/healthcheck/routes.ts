
// @/routes/healthcheck//routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_healthcheck,
  GET_Schema_healthcheck,
  POST_Schema_healthcheck,
  PUT_Schema_healthcheck
} from './schema';
import {
  DELETE_Handler_healthcheck,
  GET_Handler_healthcheck,
  POST_Handler_healthcheck,
  PUT_Handler_healthcheck
} from './controller';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { authKeycloakHandler } from '@/middlewares/authKeycloak';


async function userRoutes(server: FastifyInstance) {

  //server.addHook('preHandler', authMiddleware(server.redis_secure));


  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_healthcheck,
        response: globalResponseStatuses
      },
    },
    POST_Handler_healthcheck
  );

  server.get(
    '/',
    {
      schema: {
        //params: GET_Schema_healthcheck,
        response: globalResponseStatuses
      },
    },
    GET_Handler_healthcheck
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_healthcheck,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_healthcheck
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_healthcheck,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_healthcheck
  );
}

export default userRoutes;
