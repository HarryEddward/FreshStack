
// @/src/routes/public/app/session/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_publicAppSession,
  GET_Schema_publicAppSession,
  POST_Schema_publicAppSession,
  PUT_Schema_publicAppSession
} from './schema';
import {
  DELETE_Handler_publicAppSession,
  GET_Handler_publicAppSession,
  POST_Handler_publicAppSession,
  PUT_Handler_publicAppSession
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_publicAppSession,
        response: globalResponseStatuses
      },
    },
    POST_Handler_publicAppSession
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_publicAppSession,
        response: globalResponseStatuses
      },
    },
    GET_Handler_publicAppSession
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_publicAppSession,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_publicAppSession
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_publicAppSession,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_publicAppSession
  );
}

export default userRoutes;
