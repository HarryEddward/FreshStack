
// @/src/routes/private/services/zenstack/BusinessOrderUbication/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateServicesZenstackBusinessOrderUbication,
  GET_Schema_privateServicesZenstackBusinessOrderUbication,
  POST_Schema_privateServicesZenstackBusinessOrderUbication,
  PUT_Schema_privateServicesZenstackBusinessOrderUbication
} from './schema';
import {
  DELETE_Handler_privateServicesZenstackBusinessOrderUbication,
  GET_Handler_privateServicesZenstackBusinessOrderUbication,
  POST_Handler_privateServicesZenstackBusinessOrderUbication,
  PUT_Handler_privateServicesZenstackBusinessOrderUbication
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/create',
    {
      schema: {
        body: POST_Schema_privateServicesZenstackBusinessOrderUbication,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateServicesZenstackBusinessOrderUbication
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateServicesZenstackBusinessOrderUbication,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateServicesZenstackBusinessOrderUbication
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateServicesZenstackBusinessOrderUbication,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateServicesZenstackBusinessOrderUbication
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateServicesZenstackBusinessOrderUbication,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateServicesZenstackBusinessOrderUbication
  );
}

export default userRoutes;
