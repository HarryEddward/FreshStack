
// @/routes/healthcheck//controller.ts
import status from "http-status";

import { FastifyReply, FastifyRequest } from 'fastify';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_healthcheck,
  GET_Body_healthcheck,
  POST_Body_healthcheck,
  PUT_Body_healthcheck
} from './schema';


export async function GET_Handler_healthcheck(
  request: FastifyRequest<{ Body: GET_Body_healthcheck }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {

    const count = request.session.get<string>('count') || 0;

    request.session.set('count', count + 1);

    const countResult = request.session.get<string>('count') || 0;

    console.log("Count: ", countResult);

    await request.session.save();
    



    //throw new Error('Simulando un error para probar el manejo de errores');
    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {
        sessionId: request.session.id, // Asegúrate de que request.session esté definido
        count: countResult || 0, // Añadido para contar las peticiones
      },
      data: { status: 'ok', timestamp: new Date().toISOString() },
      error: {}
    });
  } catch (e) {
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: (e as Error).message || 'No se puede mostrar el mensaje de error',
        
      }
    });
  }
};

export async function POST_Handler_healthcheck(
  request: FastifyRequest<{ Body: POST_Body_healthcheck }>, // Sin tipado fuerte del body por ahora
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
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: (e as Error).message || 'No se puede mostrar el mensaje de error',
        
      }
    });
  }
};



export async function PUT_Handler_healthcheck(
  request: FastifyRequest<{ Body: PUT_Body_healthcheck }>, // Sin tipado fuerte del body por ahora
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
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: (e as Error).message || 'No se puede mostrar el mensaje de error',
        
      }
    });
  }
}



export async function DELETE_Handler_healthcheck(
  request: FastifyRequest<{ Body: DELETE_Body_healthcheck }>, // Sin tipado fuerte del body por ahora
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
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: (e as Error).message || 'No se puede mostrar el mensaje de error',
        
      }
    });
  }
}
