
// @/src/routes/private/services/zenstack/BusinessFile/controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_privateServicesZenstackBusinessFile,
  GET_Body_privateServicesZenstackBusinessFile,
  POST_Body_privateServicesZenstackBusinessFile,
  PUT_Body_privateServicesZenstackBusinessFile
} from './schema';
import { ApiError } from '@/utils/error';


export async function GET_Handler_privateServicesZenstackBusinessFile(
  request: FastifyRequest<{ Body: GET_Body_privateServicesZenstackBusinessFile }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.type('application/json').code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: request.originalUrl,
      meta: {},
      data: {
        message: "OK 200",
      },
      error: {}
    });
  } catch (e) {
    if (e instanceof ApiError) {
      return reply.type('application/json').code(e.statusCode).send({
        v: config.currentApiVersion,
        method: request.originalUrl,
        meta: {},
        data: {},
        error: {
          code: e.name,
          message: e.message,
        },
      });
    }

    // Error de Prisma (por ejemplo, violación de constraint)
    if ((e as any).code === 'P2002') {
      return reply.type('application/json').code(StatusCodes.CONFLICT).send({
        v: config.currentApiVersion,
        method: request.originalUrl,
        meta: {},
        data: {},
        error: {
          code: 'DUPLICATE_ENTRY',
          message: 'Ya existe un producto con estos datos únicos.',
        },
      });
    }

    return reply.type('application/json').code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: request.originalUrl,
      meta: {},
      data: {},
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: (e as Error).message || 'Ocurrió un error al actualizar el archivo de BusinessProduct.',
      }
    });
  }
};


export async function POST_Handler_privateServicesZenstackBusinessFile(
  request: FastifyRequest<{ Body: POST_Body_privateServicesZenstackBusinessFile }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      }
    });
  } catch (e) {
    return reply.internalServerError('Ocurrió un error simulado al crear el usuario.');
  }
};



export async function PUT_Handler_privateServicesZenstackBusinessFile(
  request: FastifyRequest<{ Body: PUT_Body_privateServicesZenstackBusinessFile }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      }
    });
  } catch (e) {
    return reply.internalServerError('Ocurrió un error simulado al crear el usuario.');
  }
}



export async function DELETE_Handler_privateServicesZenstackBusinessFile(
  request: FastifyRequest<{ Body: DELETE_Body_privateServicesZenstackBusinessFile }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        message: "OK 200",
      }
    });
  } catch (e) {
    return reply.internalServerError('Ocurrió un error simulado al crear el usuario.');
  }
}
