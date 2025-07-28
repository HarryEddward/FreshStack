export const _routes: string = `
// <%= componentPathRouter %>/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_<%= componentName %>,
  GET_Schema_<%= componentName %>,
  POST_Schema_<%= componentName %>,
  PUT_Schema_<%= componentName %>
} from './schema';
import {
  DELETE_Handler_<%= componentName %>,
  GET_Handler_<%= componentName %>,
  POST_Handler_<%= componentName %>,
  PUT_Handler_<%= componentName %>
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_<%= componentName %>,
        response: globalResponseStatuses
      },
    },
    POST_Handler_<%= componentName %>
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_<%= componentName %>,
        response: globalResponseStatuses
      },
    },
    GET_Handler_<%= componentName %>
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_<%= componentName %>,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_<%= componentName %>
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_<%= componentName %>,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_<%= componentName %>
  );
}

export default userRoutes;
`