
// @/src/routes/private/business/web/app/ai/pdf/product_restocking/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppAIPdfProductRestocking,
  GET_Schema_privateBusinessWebAppAIPdfProductRestocking,
  POST_Schema_privateBusinessWebAppAIPdfProductRestocking,
  PUT_Schema_privateBusinessWebAppAIPdfProductRestocking
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppAIPdfProductRestocking,
  GET_Handler_privateBusinessWebAppAIPdfProductRestocking,
  POST_Handler_privateBusinessWebAppAIPdfProductRestocking,
  PUT_Handler_privateBusinessWebAppAIPdfProductRestocking
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppAIPdfProductRestocking,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppAIPdfProductRestocking
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppAIPdfProductRestocking,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppAIPdfProductRestocking
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppAIPdfProductRestocking,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppAIPdfProductRestocking
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppAIPdfProductRestocking,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppAIPdfProductRestocking
  );
}

export default userRoutes;
