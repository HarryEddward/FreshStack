import { POST_Schema_privateServicesZenstackBusinessProduct, PUT_Schema_privateServicesZenstackBusinessProduct_UpdateFileData } from './schema';
// @/src/routes/private/services/zenstack/BusinessProduct/controller.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { requestPath } from '@/utils/response';
import config from '@/config';
import {
  DELETE_Body_privateServicesZenstackBusinessProduct,
  GET_Body_privateServicesZenstackBusinessProduct,
  POST_Body_privateServicesZenstackBusinessProduct,
  PUT_Body_privateServicesZenstackBusinessProduct,
  PUT_Body_privateServicesZenstackBusinessProduct_UpdateFile,
  POST_Schema_privateServicesZenstackBusinessProductData
} from './schema';
import ServicesPrivateS3 from '@/services/s3';
import { nanoid } from 'nanoid';
import { limiterFilesCount } from '@/services/fileLimiter';
import * as crypto from 'node:crypto';
import { ApiError, CustomError } from '@/utils/error';
import { enhance } from '@zenstackhq/runtime';
import {fastifyMultipart, MultipartFile} from '@fastify/multipart';
import { Decimal } from '@prisma/client/runtime/library';
import { businessIdVerify } from '@/services/business';
import { multipartJsonData } from '@/services/multipart';




export async function GET_Handler_privateServicesZenstackBusinessProduct(
  request: FastifyRequest<{ Body: GET_Body_privateServicesZenstackBusinessProduct }>, // Sin tipado fuerte del body por ahora
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
    return reply.type('application/json').internalServerError('Ocurrió un error simulado al crear el usuario.');
  }
};




interface Props {
    name: string;
    menuId: string;
    unityAmount: number;
    unityConsumeStock: number;
    unityConsumePrice: number;
    typeUnitConsumeMeasurement: string;
    nameLastModificationEmployee: string;
    preparationDuration: number;
    tags: string | null;
    urlImage: string | null;
    imageId: string | null;
    productGroupId: string | null;
    parentId: string | null;
};


export async function POST_Handler_privateServicesZenstackBusinessProduct(
  request: FastifyRequest<{ 
    Body: POST_Body_privateServicesZenstackBusinessProduct }>,
  reply: FastifyReply
) {
  

  try {
    // 1. Extraer todos los datos del body
    const body = request.body as {
      data: string;
      file?: MultipartFile; // El campo file es opcional, pero lo validaremos
    };


    const data = multipartJsonData(
      body.data,
      request,
      {
        schema: POST_Schema_privateServicesZenstackBusinessProductData,
        method: 'POST',
        url: request.url,
        httpPart: 'body'
      }
    )

    const { 
      name,
      menuId,
      unityAmount,
      unityConsumeStock,
      unityConsumePrice,
      typeUnitConsumeMeasurement,
      nameLastModificationEmployee,
      preparationDuration,
      tags,
      urlImage,
      imageId,
      productGroupId,
      parentId
    } = data as Props;


    

    // 3. Obtener businessId de la sesión
    const businessId = businessIdVerify(request);


    // 4. Mejorar Prisma con ZenStack
    const db = enhance(request.server.prisma, {
      user: { id: nanoid(), businessId },
    });

    // 5. Manejar archivo si existe
    const resultUploadFile = await ServicesPrivateS3.uploadObjectS3(request, reply, { name, db, businessId });
    
    // 6. Preparar datos para la creación
    Business_product
    const productData = {
      id: nanoid(),
      name: name.trim(),
      menuId,
      unityAmount,
      unityConsumeStock,
      unityConsumePrice,
      typeUnitConsumeMeasurement: typeUnitConsumeMeasurement,
      nameLastModificationEmployee,
      preparationDuration,
      businessId,
      // Campos obligatorios que faltaban
      type: 'DEFAULT', // Ajusta el valor por defecto según tu modelo
      minimumStockAlert: 0, // Ajusta el valor por defecto según tu modelo
      // Campos opcionales
      ...(tags && { tags }),
      ...(urlImage && { urlImage }),
      ...(imageId && { imageId }),
      ...(productGroupId && { productGroupId }),
      ...(parentId && { parentId }),
      // Si hay archivo subido, usar su información
      ...(resultUploadFile.meta.file && {
        imageId: resultUploadFile.data.id,
      })
    };

    // 7. Crear el producto en la base de datos
    const createdProduct = await db.$transaction(async (tx) => {
      return await tx.businessProduct.create({
        data: productData,
        include: {
          menu: true,
          business: true,
          productGroup: true,
          parent: true,
          children: true,
          image: true
        }
      });
    });

    // 8. Respuesta exitosa
    return reply.type('application/json').code(StatusCodes.CREATED).send({
      v: config.currentApiVersion,
      method: request.originalUrl,
      meta: {
        file: resultUploadFile.meta.file || null
      },
      data: {
        message: "Producto creado exitosamente",
        product: createdProduct
      },
      error: {}
    });

  } catch (e) {
    // 9. Manejo de errores
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

    // Error genérico
    return reply.type('application/json').code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      v: config.currentApiVersion,
      method: request.originalUrl,
      meta: {},
      data: {},
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: (e as Error).message || 'Ocurrió un error al crear el BusinessProduct.',
      }
    });
  }
};



interface PropsPUT_Handler_privateServicesZenstackBusinessProduct_UpdateFile {
  fileId: string;
  productId: string;
}


export async function PUT_Handler_privateServicesZenstackBusinessProduct_UpdateFile(
  request: FastifyRequest<{ Body: PUT_Body_privateServicesZenstackBusinessProduct_UpdateFile }>, // Sin tipado fuerte del body por ahora
  reply: FastifyReply
) {

  try {

    const body = request.body as {
      data: string;
      file?: MultipartFile; // El campo file es opcional, pero lo validaremos
    };


    const data = multipartJsonData(
      body.data,
      request,
      {
        schema: PUT_Schema_privateServicesZenstackBusinessProduct_UpdateFileData,
        method: 'PUT',
        url: request.url,
        httpPart: 'body'
      }
    )

    const {
      fileId,
      productId
    } = data as PropsPUT_Handler_privateServicesZenstackBusinessProduct_UpdateFile;

    // 3. Obtener businessId de la sesión
    const businessId = businessIdVerify(request);


    // 4. Mejorar Prisma con ZenStack
    const db = enhance(request.server.prisma, {
      user: { id: nanoid(), businessId },
    });

    const existProduct = db.businessProduct.count({
      where: {
        id: productId
      }
    });

    if(!existProduct){
      throw new ApiError(
        "PRODUCT_NOT_EXIST",
        "El ID del producto seleccionado no existe",
        StatusCodes.BAD_REQUEST
      )
    }

    const resultUpdatedFile = await ServicesPrivateS3.updateObjectS3(request, reply, { fileId, db, businessId });


    const updateImageFromProduct = await db.$transaction(async (tx) => {
      return await tx.businessProduct.update({
        where: { id: productId },
        data: {
          image: {
            connect: { id: resultUpdatedFile.data.id }
          }
        }
      })
    });

    

    /**
     * No hay nada que actualizar, ya que desde el modelo que buscquemos el file
     * estaremos centralizando toda la logica en BusinessFile.
     * 
     * Cualquier cambio, se actualizara de forma consistente, en cualquier modelo
     * relacionado
     */

    return reply.type('application/json').code(StatusCodes.OK).send({
      v: config.currentApiVersion,
      method: request.originalUrl,
      meta: {},
      data: {
        productId: updateImageFromProduct.id,
        fileId: resultUpdatedFile.data.id,
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
}

export async function PUT_Handler_privateServicesZenstackBusinessProduct(
  request: FastifyRequest<{ Body: PUT_Body_privateServicesZenstackBusinessProduct }>, // Sin tipado fuerte del body por ahora
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
    return reply.type('application/json').internalServerError('Ocurrió un error simulado al crear el usuario.');
  }
}



export async function DELETE_Handler_privateServicesZenstackBusinessProduct(
  request: FastifyRequest<{ Body: DELETE_Body_privateServicesZenstackBusinessProduct }>, // Sin tipado fuerte del body por ahora
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
    return reply.type('application/json').internalServerError('Ocurrió un error simulado al crear el usuario.');
  }
}
