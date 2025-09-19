
// @/src/routes/private/business/web/app/multimedia/pdf/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppMultimediaPDF,
  GET_Schema_privateBusinessWebAppMultimediaPDF,
  POST_Schema_privateBusinessWebAppMultimediaPDF,
  PUT_Schema_privateBusinessWebAppMultimediaPDF
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppMultimediaPDF,
  GET_Handler_privateBusinessWebAppMultimediaPDF,
  POST_Handler_privateBusinessWebAppMultimediaPDF,
  PUT_Handler_privateBusinessWebAppMultimediaPDF
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppMultimediaPDF,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppMultimediaPDF
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppMultimediaPDF,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppMultimediaPDF
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppMultimediaPDF,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppMultimediaPDF
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppMultimediaPDF,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppMultimediaPDF
  );
}

export default userRoutes;
