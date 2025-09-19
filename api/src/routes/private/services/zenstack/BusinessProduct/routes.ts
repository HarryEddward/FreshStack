
// @/src/routes/private/services/zenstack/BusinessProduct/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateServicesZenstackBusinessProduct,
  GET_Schema_privateServicesZenstackBusinessProduct,
  POST_Schema_privateServicesZenstackBusinessProduct,
  PUT_Schema_privateServicesZenstackBusinessProduct
} from './schema';
import {
  DELETE_Handler_privateServicesZenstackBusinessProduct,
  GET_Handler_privateServicesZenstackBusinessProduct,
  POST_Handler_privateServicesZenstackBusinessProduct,
  PUT_Handler_privateServicesZenstackBusinessProduct,
  PUT_Handler_privateServicesZenstackBusinessProduct_UpdateFile
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/create',
    {
      schema: {
        body: POST_Schema_privateServicesZenstackBusinessProduct,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateServicesZenstackBusinessProduct
  );

  server.put(
    '/update/file',
    {
      schema: {
        body: POST_Schema_privateServicesZenstackBusinessProduct,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateServicesZenstackBusinessProduct_UpdateFile
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateServicesZenstackBusinessProduct,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateServicesZenstackBusinessProduct
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateServicesZenstackBusinessProduct,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateServicesZenstackBusinessProduct
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateServicesZenstackBusinessProduct,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateServicesZenstackBusinessProduct
  );
}

export default userRoutes;
