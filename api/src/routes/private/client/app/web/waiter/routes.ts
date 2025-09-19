
// @/src/routes/private/client/app/web/call_waiter/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateClientAppWebWaiter,
  GET_Schema_privateClientAppWebWaiter,
  POST_Schema_privateClientAppWebWaiter,
  PUT_Schema_privateClientAppWebWaiter
} from './schema';
import {
  DELETE_Handler_privateClientAppWebWaiter,
  GET_Handler_privateClientAppWebWaiter,
  POST_Handler_privateClientAppWebWaiter,
  PUT_Handler_privateClientAppWebWaiter
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/call',
    {
      schema: {
        body: POST_Schema_privateClientAppWebWaiter,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateClientAppWebWaiter
  );

  server.get(
    '/call',
    {
      schema: {
        params: GET_Schema_privateClientAppWebWaiter,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateClientAppWebWaiter
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateClientAppWebWaiter,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateClientAppWebWaiter
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateClientAppWebWaiter,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateClientAppWebWaiter
  );
}

export default userRoutes;
