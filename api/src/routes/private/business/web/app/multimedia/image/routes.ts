
// @/src/routes/private/business/web/app/multimedia/image/routes.ts

import { FastifyInstance } from 'fastify';
import { globalResponseStatuses } from '@/schemas/responses';
import {
  DELETE_Schema_privateBusinessWebAppMultimediaImage,
  GET_Schema_privateBusinessWebAppMultimediaImage,
  POST_Schema_privateBusinessWebAppMultimediaImage,
  PUT_Schema_privateBusinessWebAppMultimediaImage
} from './schema';
import {
  DELETE_Handler_privateBusinessWebAppMultimediaImage,
  GET_Handler_privateBusinessWebAppMultimediaImage,
  POST_Handler_privateBusinessWebAppMultimediaImage,
  PUT_Handler_privateBusinessWebAppMultimediaImage
} from './controller';

async function userRoutes(server: FastifyInstance) {

  server.post(
    '/',
    {
      schema: {
        body: POST_Schema_privateBusinessWebAppMultimediaImage,
        response: globalResponseStatuses
      },
    },
    POST_Handler_privateBusinessWebAppMultimediaImage
  );

  server.get(
    '/',
    {
      schema: {
        params: GET_Schema_privateBusinessWebAppMultimediaImage,
        response: globalResponseStatuses
      },
    },
    GET_Handler_privateBusinessWebAppMultimediaImage
  );

  server.put(
    '/',
    {
      schema: {
        body: PUT_Schema_privateBusinessWebAppMultimediaImage,
        response: globalResponseStatuses
      },
    },
    PUT_Handler_privateBusinessWebAppMultimediaImage
  );

  server.delete(
    '/',
    {
      schema: {
        body: DELETE_Schema_privateBusinessWebAppMultimediaImage,
        response: globalResponseStatuses
      },
    },
    DELETE_Handler_privateBusinessWebAppMultimediaImage
  );
}

export default userRoutes;
