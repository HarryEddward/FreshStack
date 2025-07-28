
// @/src/routes/private/business/web/app/ai/pdf/price_adjustment/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
  GET_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
  POST_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
  PUT_Schema_privateBusinessWebAppAIPdfPriceAdjustment
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppAIPdfPriceAdjustment,
  GET_Handler_privateBusinessWebAppAIPdfPriceAdjustment,
  POST_Handler_privateBusinessWebAppAIPdfPriceAdjustment,
  PUT_Handler_privateBusinessWebAppAIPdfPriceAdjustment
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppAIPdfPriceAdjustment
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppAIPdfPriceAdjustment
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppAIPdfPriceAdjustment
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppAIPdfPriceAdjustment,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppAIPdfPriceAdjustment
  );
}

export default userRoutes;
