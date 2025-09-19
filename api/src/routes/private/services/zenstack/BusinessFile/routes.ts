
// @/src/routes/private/services/zenstack/BusinessFile/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateServicesZenstackBusinessFile,
  GET_Schema_privateServicesZenstackBusinessFile,
  POST_Schema_privateServicesZenstackBusinessFile,
  PUT_Schema_privateServicesZenstackBusinessFile
} from './schema';
import {
  DELETE_Handler_privateServicesZenstackBusinessFile,
  GET_Handler_privateServicesZenstackBusinessFile,
  POST_Handler_privateServicesZenstackBusinessFile,
  PUT_Handler_privateServicesZenstackBusinessFile
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateServicesZenstackBusinessFile,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateServicesZenstackBusinessFile
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateServicesZenstackBusinessFile,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateServicesZenstackBusinessFile
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateServicesZenstackBusinessFile,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateServicesZenstackBusinessFile
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateServicesZenstackBusinessFile,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateServicesZenstackBusinessFile
  );
}

export default userRoutes;
