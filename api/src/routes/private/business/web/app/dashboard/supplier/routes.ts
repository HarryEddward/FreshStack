
// @/src/routes/private/business/web/app/dashboard/supplier/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppDashboardSupplier,
  GET_Schema_privateBusinessWebAppDashboardSupplier,
  POST_Schema_privateBusinessWebAppDashboardSupplier,
  PUT_Schema_privateBusinessWebAppDashboardSupplier
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppDashboardSupplier,
  GET_Handler_privateBusinessWebAppDashboardSupplier,
  POST_Handler_privateBusinessWebAppDashboardSupplier,
  PUT_Handler_privateBusinessWebAppDashboardSupplier
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppDashboardSupplier,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppDashboardSupplier
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppDashboardSupplier,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppDashboardSupplier
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppDashboardSupplier,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppDashboardSupplier
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppDashboardSupplier,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppDashboardSupplier
  );
}

export default userRoutes;
