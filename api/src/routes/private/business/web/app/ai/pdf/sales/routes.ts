
// @/src/routes/private/business/web/app/ai/pdf/sales/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppAIPdfSales,
  GET_Schema_privateBusinessWebAppAIPdfSales,
  POST_Schema_privateBusinessWebAppAIPdfSales,
  PUT_Schema_privateBusinessWebAppAIPdfSales
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppAIPdfSales,
  GET_Handler_privateBusinessWebAppAIPdfSales,
  POST_Handler_privateBusinessWebAppAIPdfSales,
  PUT_Handler_privateBusinessWebAppAIPdfSales
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppAIPdfSales,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppAIPdfSales
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppAIPdfSales,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppAIPdfSales
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppAIPdfSales,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppAIPdfSales
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppAIPdfSales,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppAIPdfSales
  );
}

export default userRoutes;
