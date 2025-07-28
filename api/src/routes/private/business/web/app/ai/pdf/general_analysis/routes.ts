
// @/src/routes/private/business/web/app/ai/pdf/general_analysis/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
  GET_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
  POST_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
  PUT_Schema_privateBusinessWebAppAIPdfGeneralAnalysis
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppAIPdfGeneralAnalysis,
  GET_Handler_privateBusinessWebAppAIPdfGeneralAnalysis,
  POST_Handler_privateBusinessWebAppAIPdfGeneralAnalysis,
  PUT_Handler_privateBusinessWebAppAIPdfGeneralAnalysis
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppAIPdfGeneralAnalysis
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppAIPdfGeneralAnalysis
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppAIPdfGeneralAnalysis
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppAIPdfGeneralAnalysis,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppAIPdfGeneralAnalysis
  );
}

export default userRoutes;
