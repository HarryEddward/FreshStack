import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import { Upload } from '@aws-sdk/lib-storage';
import {
  DELETE_Body_privateS3,
  GET_Body_privateS3,
  POST_Body_privateS3,
  PUT_Body_privateS3
} from './schema';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import status from 'http-status';
import FileType from 'file-type';
import { sanitizePath } from '@/utils/path';

//import mime from 'mime';



import ServicesPrivateS3 from '@/routes/private/services/s3/service';

export async function GET_Handler_privateS3(
  request: FastifyRequest<{ Params: { '*': string } }>,
  reply: FastifyReply
) {
  try {
    const pathObject = request.params['*'];
    console.log("objectPath");
    console.log(pathObject);

    return await ServicesPrivateS3.obtainObjectS3(request, reply, { pathObject });
    

  } catch (error) {
    console.error('Error al obtener el archivo:', error);
    return reply.type('application/json').code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: 'Ocurrió un error al obtener el archivo.'
      },
    });
  }
}


export async function POST_Handler_privateS3(
  request: FastifyRequest<{ Params: { '*': string } }>,
  reply: FastifyReply
) {
  try {
    //const { pathObject } = request.params;
    const pathObject = request.params['*'];

    console.log('pathObject:', pathObject);
    console.log('request.body:', request.body);

    return await ServicesPrivateS3.uploadObjectS3(request, reply, { pathObject });

  } catch (error) {
    console.error('Error al subir el archivo:', error);
    const errorMessage = (error as Error).message;
    return reply.type('application/json').code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: 'Ocurrió un error al subir el archivo.'
      },
    });
  }
}

export async function PUT_Handler_privateS3(
  request: FastifyRequest<{ Body: PUT_Body_privateS3, Params: { '*': string } }>,
  reply: FastifyReply
) {
  try {
    const pathObject = request.params['*'];
    
    return await ServicesPrivateS3.updateObjectS3(request, reply, { pathObject });

  } catch (error) {
    console.error('Error al actualizar el archivo:', error);
    return reply.type('application/json').code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: (error as Error).message || 'No se puede mostrar el mensaje de error',
        
      }
    });
  }
}


export async function DELETE_Handler_privateS3(
  request: FastifyRequest<{ Body: DELETE_Body_privateS3, Params: { '*': string } }>,
  reply: FastifyReply
) {
  try {
    const pathObject = request.params['*'];
    console.log('pathObject:', pathObject);

    return await ServicesPrivateS3.deleteObjectS3(request, reply, { pathObject });


  } catch (error) {
    console.error('Error al eliminar el archivo:', error);
    return reply.type('application/json').code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: requestPath(request.originalUrl),
      meta: {},
      data: {},
      error: {
        code: status[`${StatusCodes.INTERNAL_SERVER_ERROR}_NAME`],
        message: 'Ocurrió un error al eliminar el archivo.'
      },
    });
  }
}