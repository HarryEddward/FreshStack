
// @/src/routes/private/s3/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateS3,
  GET_Schema_privateS3,
  POST_Schema_privateS3,
  PUT_Schema_privateS3
} from './schema';
import {
  DELETE_Handler_privateS3,
  GET_Handler_privateS3,
  POST_Handler_privateS3,
  PUT_Handler_privateS3
} from './controller';
import { GET_Response_privateS3 } from './response';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/object/*',
    {
      schema: {
        consumes: ['multipart/form-data'],
        //body: { type: 'object', additionalProperties: true }, //POST_Schema_privateS3,
        response: globalResponseStatuses,
        params: {
          type: 'object',
          properties: {
            '*': { type: 'string' },
          }
        }
      },
    },
    POST_Handler_privateS3
  );

  server.get(
    '/object/*',
    {
      schema: {
        params: GET_Schema_privateS3,
        response: GET_Response_privateS3,
      },
    },
    GET_Handler_privateS3
  );

  server.put(
    '/object/*',
    {
      schema: {
        consumes: ['multipart/form-data'],
        body: PUT_Schema_privateS3,
        response: globalResponseStatuses,
        params: {
          type: 'object',
          properties: {
            '*': { type: 'string' },
          }
        }
      },
    },
    PUT_Handler_privateS3
  );

  server.delete(
    '/object/*',
    {
      schema: {
        consumes: ['multipart/form-data'],
        //body: DELETE_Schema_privateS3,
        response: globalResponseStatuses,
        params: {
          type: 'object',
          properties: {
            '*': { type: 'string' },
          }
        }
      },
    },
    DELETE_Handler_privateS3
  );
}

export default userRoutes;
