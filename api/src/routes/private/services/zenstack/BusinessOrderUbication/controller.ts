
// @/src/routes/private/services/zenstack/BusinessOrderUbication/controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import { enhance } from '@zenstackhq/runtime';
import session from '@fastify/session';


import {
  DELETE_Body_privateServicesZenstackBusinessOrderUbication,
  GET_Body_privateServicesZenstackBusinessOrderUbication,
  POST_Body_privateServicesZenstackBusinessOrderUbication,
  PUT_Body_privateServicesZenstackBusinessOrderUbication
} from './schema';
import { nanoid } from 'nanoid';


export async function GET_Handler_privateServicesZenstackBusinessOrderUbication(
  request: FastifyRequest<{ Body: GET_Body_privateServicesZenstackBusinessOrderUbication }>, // Sin tipado fuerte del body por ahora
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
        code: 'INTERNAL_SERVER_ERROR',
      }
    });
  }
};


export async function POST_Handler_privateServicesZenstackBusinessOrderUbication(
  request: FastifyRequest<{ Body: POST_Body_privateServicesZenstackBusinessOrderUbication }>,
  reply: FastifyReply
) {
  try {
    // 1. Obtener businessId de la sesión
    const businessId: string | undefined = request.session.get('business_id');
    if (!businessId) {
      return reply.code(StatusCodes.UNAUTHORIZED).send({
        v: config.currentApiVersion,
        method: requestPath(request.originalUrl),
        meta: {},
        data: {},
        error: {
          code: 'UNAUTHORIZED',
          message: 'No se ha encontrado el ID del negocio en la sesión.',
        },
      });
    }

    // 2. Validar el cuerpo con AJV (Fastify lo hace automáticamente, pero verificamos manualmente los campos requeridos)
    const { title, position_x, position_y, isCalling, type } = request.body.data || {};
    if (!title || position_x === undefined || position_y === undefined) {
      return reply.code(StatusCodes.BAD_REQUEST).send({
        v: config.currentApiVersion,
        method: requestPath(request.originalUrl),
        meta: {},
        data: {},
        error: {
          code: 'INVALID_INPUT',
          message: 'Faltan campos requeridos: title, position_x, position_y.',
        },
      });
    }

    // 3. Mejorar Prisma con ZenStack
    const db = enhance(request.server.prisma, {
      user: { id: nanoid(), businessId },
    });

    // 4. Verificar límite de 30 ubicaciones
    const count = await db.businessOrderUbication.count();
    if (count >= 30) {
      return reply.code(StatusCodes.BAD_REQUEST).send({
        v: config.currentApiVersion,
        method: requestPath(request.originalUrl),
        meta: {},
        data: {},
        error: {
          code: 'LIMIT_EXCEEDED',
          message: 'El número máximo de ubicaciones de pedidos de negocio es 30.',
        },
      });
    }

    // 5. Crear BusinessOrderUbication
    let newUbication;
    try {
      newUbication = await db.businessOrderUbication.create({
        data: {
          id: nanoid(),
          title,
          position_x,
          position_y,
          isCalling: isCalling ?? false,
          type: type ?? 'PHONE',
          businessId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (e: Error | any) {
      // Manejar errores de validación de Prisma (similar a ZenStack)
      if (e.code === 'P2002') {
        return reply.code(StatusCodes.BAD_REQUEST).send({
          v: config.currentApiVersion,
          method: requestPath(request.originalUrl),
          meta: {},
          data: {},
          error: {
            code: 'CONSTRAINT_VIOLATION',
            message: 'Ya existe un BusinessOrderUbication con datos únicos.',
          },
        });
      } else if (e.name === 'PrismaClientValidationError') {
        return reply.code(StatusCodes.BAD_REQUEST).send({
          v: config.currentApiVersion,
          method: requestPath(request.originalUrl),
          meta: {},
          data: {},
          error: {
            code: 'INVALID_INPUT',
            message: 'Datos inválidos para crear el BusinessOrderUbication.',
          },
        });
      }
      throw e; // Otros errores al catch general
    }

    // 6. Respuesta exitosa
    return reply.code(StatusCodes.CREATED).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {
        result: newUbication, // Devolver el objeto creado, como ZenStack
      },
      error: {},
    });
  } catch (e: Error | any) {
    request.log.error(`Error al crear BusinessOrderUbication: ${e.message}`);
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocurrió un error al crear el BusinessOrderUbication.',
      },
    });
  }
}



export async function PUT_Handler_privateServicesZenstackBusinessOrderUbication(
  request: FastifyRequest<{ Body: PUT_Body_privateServicesZenstackBusinessOrderUbication }>, // Sin tipado fuerte del body por ahora
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



export async function DELETE_Handler_privateServicesZenstackBusinessOrderUbication(
  request: FastifyRequest<{ Body: DELETE_Body_privateServicesZenstackBusinessOrderUbication }>, // Sin tipado fuerte del body por ahora
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
