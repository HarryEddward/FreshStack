
// @/src/routes/private/business/web/app/ai/pdf/revenue/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppAIPdfRevenue,
  GET_Schema_privateBusinessWebAppAIPdfRevenue,
  POST_Schema_privateBusinessWebAppAIPdfRevenue,
  PUT_Schema_privateBusinessWebAppAIPdfRevenue
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppAIPdfRevenue,
  GET_Handler_privateBusinessWebAppAIPdfRevenue,
  POST_Handler_privateBusinessWebAppAIPdfRevenue,
  PUT_Handler_privateBusinessWebAppAIPdfRevenue
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppAIPdfRevenue,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppAIPdfRevenue
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppAIPdfRevenue,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppAIPdfRevenue
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppAIPdfRevenue,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppAIPdfRevenue
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppAIPdfRevenue,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppAIPdfRevenue
  );
}

export default userRoutes;
