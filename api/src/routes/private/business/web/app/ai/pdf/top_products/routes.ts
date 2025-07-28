
// @/src/routes/private/business/web/app/ai/pdf/top_products/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppAIPdfTopProducts,
  GET_Schema_privateBusinessWebAppAIPdfTopProducts,
  POST_Schema_privateBusinessWebAppAIPdfTopProducts,
  PUT_Schema_privateBusinessWebAppAIPdfTopProducts
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppAIPdfTopProducts,
  GET_Handler_privateBusinessWebAppAIPdfTopProducts,
  POST_Handler_privateBusinessWebAppAIPdfTopProducts,
  PUT_Handler_privateBusinessWebAppAIPdfTopProducts
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppAIPdfTopProducts,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppAIPdfTopProducts
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppAIPdfTopProducts,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppAIPdfTopProducts
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppAIPdfTopProducts,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppAIPdfTopProducts
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppAIPdfTopProducts,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppAIPdfTopProducts
  );
}

export default userRoutes;
