
// @/src/lang/business/man/_routes//routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_langBusinessMan,
  GET_Schema_langBusinessMan,
  POST_Schema_langBusinessMan,
  PUT_Schema_langBusinessMan
} from './schema';
import {
  DELETE_Handler_langBusinessMan,
  GET_Handler_langBusinessMan,
  POST_Handler_langBusinessMan,
  PUT_Handler_langBusinessMan
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_langBusinessMan,
        response: globalResponseStatuses
      },
    },
    POST_Handler_langBusinessMan
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_langBusinessMan,
        response: globalResponseStatuses
      },
    },
    GET_Handler_langBusinessMan
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_langBusinessMan,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_langBusinessMan
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_langBusinessMan,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_langBusinessMan
  );
}

export default userRoutes;
