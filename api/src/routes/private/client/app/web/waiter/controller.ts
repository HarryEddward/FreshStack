
// @/src/routes/private/client/app/web/call_waiter/controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_privateClientAppWebWaiter,
  GET_Body_privateClientAppWebWaiter,
  POST_Body_privateClientAppWebWaiter,
  PUT_Body_privateClientAppWebWaiter
} from './schema';


export async function GET_Handler_privateClientAppWebWaiter(
  request: FastifyRequest<{ Body: GET_Body_privateClientAppWebWaiter }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      },
      error: {}
    });
  } catch (e) {
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Ocurrió un error simulado al obtener el recurso.'
      }
    });
  }
};


export async function POST_Handler_privateClientAppWebWaiter(
  request: FastifyRequest<{ Body: POST_Body_privateClientAppWebWaiter }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      },
      error: {}
    });
  } catch (e) {
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Ocurrió un error simulado al obtener el recurso.'
      }
    });
  }
};



export async function PUT_Handler_privateClientAppWebWaiter(
  request: FastifyRequest<{ Body: PUT_Body_privateClientAppWebWaiter }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      },
      error: {}
    });
  } catch (e) {
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Ocurrió un error simulado al obtener el recurso.'
      }
    });
  }
}



export async function DELETE_Handler_privateClientAppWebWaiter(
  request: FastifyRequest<{ Body: DELETE_Body_privateClientAppWebWaiter }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      },
      error: {}
    });
  } catch (e) {
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Ocurrió un error simulado al obtener el recurso.'
      }
    });
  }
}
