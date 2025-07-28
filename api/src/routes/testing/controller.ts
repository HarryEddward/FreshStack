
// @/src/lang/business/man/testing//controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_testing,
  GET_Body_testing,
  POST_Body_testing,
  PUT_Body_testing
} from './schema';


export async function GET_Handler_testing(
  request: FastifyRequest<{ Body: GET_Body_testing }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  const prisma = request.server.prisma;
  try {

    /*const newUser = await prisma.business.create({
      data: {
        id: crypto.randomUUID(),
        legalName: "Empresa S.L.",
        taxId: crypto.randomUUID(),
        phone: "+34 643567016",
        email: crypto.randomUUID() + "@gmail.com",
        registeredAddress: "c/ Santiago Rusiñol",
        countryOfIncorporation: "ES",
        legalForm: "S.L.",
        legalRepresentative: {
          "full_name": "Laura Gomez",
          "identification_document": crypto.randomUUID(),
          "position": "CEO",
          
        }
      }
    });
    console.log(newUser);*/

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


export async function POST_Handler_testing(
  request: FastifyRequest<{ Body: POST_Body_testing }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  const {
    legalName,
    phone,
    email,
    registeredAddress,
    countryOfIncorporation,
    legalForm,
    legalRepresentative
  } = request.body;
  const prisma = request.server.prisma;

  try {
    const newUser = await prisma.business.create({
      data: {
        id: crypto.randomUUID(),
        legalName,
        taxId: crypto.randomUUID(),
        phone,
        email,
        registeredAddress,
        countryOfIncorporation,
        legalForm,
        legalRepresentative
      }
    });
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
        code: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        message: String(e),
      }
    });
  }
};



export async function PUT_Handler_testing(
  request: FastifyRequest<{ Body: PUT_Body_testing }>, // Sin tipado fuerte del body por ahora
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



export async function DELETE_Handler_testing(
  request: FastifyRequest<{ Body: DELETE_Body_testing }>, // Sin tipado fuerte del body por ahora
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
