
// @/src/routes/private/business/web/app/ai/pdf/price_adjustment/controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_privateBusinessWebAppAIPdfPriceAdjustment,
  GET_Body_privateBusinessWebAppAIPdfPriceAdjustment,
  POST_Body_privateBusinessWebAppAIPdfPriceAdjustment,
  PUT_Body_privateBusinessWebAppAIPdfPriceAdjustment
} from './schema';


export async function GET_Handler_privateBusinessWebAppAIPdfPriceAdjustment(
  request: FastifyRequest<{ Body: GET_Body_privateBusinessWebAppAIPdfPriceAdjustment }>, // Sin tipado fuerte del body por ahora
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


export async function POST_Handler_privateBusinessWebAppAIPdfPriceAdjustment(
  request: FastifyRequest<{ Body: POST_Body_privateBusinessWebAppAIPdfPriceAdjustment }>, // Sin tipado fuerte del body por ahora
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



export async function PUT_Handler_privateBusinessWebAppAIPdfPriceAdjustment(
  request: FastifyRequest<{ Body: PUT_Body_privateBusinessWebAppAIPdfPriceAdjustment }>, // Sin tipado fuerte del body por ahora
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



export async function DELETE_Handler_privateBusinessWebAppAIPdfPriceAdjustment(
  request: FastifyRequest<{ Body: DELETE_Body_privateBusinessWebAppAIPdfPriceAdjustment }>, // Sin tipado fuerte del body por ahora
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
