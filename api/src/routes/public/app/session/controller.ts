
// @/src/routes/public/app/session/controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_publicAppSession,
  GET_Body_publicAppSession,
  POST_Body_publicAppSession,
  PUT_Body_publicAppSession
} from './schema';
import status from 'http-status';


export async function GET_Handler_publicAppSession(
  request: FastifyRequest<{ Body: GET_Body_publicAppSession }>,
  reply: FastifyReply
) {
  try {

    // Obtén el sessionId generado por el plugin (almacenado en la cookie o Redis)
    const sessionId = request.session.id; // Intenta con .id si .sessionId no funciona

    // Guarda la sesión
    await request.session.save();


    return reply.code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        session_id: sessionId, // Usa el sessionId del plugin si está disponible, sino el personalizado
        message: `${status[StatusCodes.OK]} ${StatusCodes.OK}`,
      },
      error: {}
    });
  } catch (e) {
    console.error("Error in GET_Handler_publicAppSession:", e);
    return reply.internalServerError('Ocurrió un error al manejar la sesión.');
  }
}


export async function POST_Handler_publicAppSession(
  request: FastifyRequest<{ Body: POST_Body_publicAppSession }>, // Sin tipado fuerte del body por ahora
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



export async function PUT_Handler_publicAppSession(
  request: FastifyRequest<{ Body: PUT_Body_publicAppSession }>, // Sin tipado fuerte del body por ahora
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



export async function DELETE_Handler_publicAppSession(
  request: FastifyRequest<{ Body: DELETE_Body_publicAppSession }>, // Sin tipado fuerte del body por ahora
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
