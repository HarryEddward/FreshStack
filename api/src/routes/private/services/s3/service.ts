import config from "@/config";
import { sanitizePath } from "@/utils/path";
import { requestPath } from "@/utils/response";
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import FileType from 'file-type';
import { Upload } from "@aws-sdk/lib-storage";
import { GlobalJSONResponse } from "@/types";
import { StreamingBlobPayloadOutputTypes } from "@smithy/types";
import { nanoid } from "nanoid";
import { formatFileSize, getFileSize } from "@/services/fileSize";

type Opts<T> = T;

class Services_privateS3 {

    async obtainObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ pathObject: string }>): Promise<GlobalJSONResponse | StreamingBlobPayloadOutputTypes | undefined> {

        const { pathObject } = opts;
                
        const sanitizedPath = sanitizePath(pathObject);
        console.log('pathObject:', sanitizedPath);

        if (!sanitizedPath || sanitizedPath.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                    code: 'INVALID_PATH',
                    message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        }

        // Verifica si el objeto existe
        try {
            await request.server.s3Client.send(new HeadObjectCommand({
                Bucket: config.minio.bucketName,
                Key: pathObject,
            }));
        } catch (err) {
            // Si no existe, devuelve 404
            return reply.type('application/json').code(StatusCodes.NOT_FOUND).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                error: {},
                data: {
                    message: "Archivo no encontrado",
                }
            });
        }

        // Si existe, lo obtenemos
        const command = new GetObjectCommand({
            Bucket: config.minio.bucketName,
            Key: pathObject,
        });

        const response = await request.server.s3Client.send(command);

        const contentType = response.ContentType || 'application/octet-stream';
        const contentLength = response.ContentLength || undefined;

        // Establecer headers
        reply.header('Content-Type', contentType);
        if (contentLength) {
            reply.header('Content-Length', contentLength);
        }

        // Puedes personalizar la cabecera Content-Disposition si lo quieres descargable
        // reply.header('Content-Disposition', `attachment; filename="${encodeURIComponent(path.basename(sanitizedPath))}"`);

        return reply.send(response.Body);

    };

    async uploadObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ pathObject: string }>) {

        const { pathObject } = opts;

        // Validar pathObject
        if (!pathObject || pathObject.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        };

        const sanitizedPath = sanitizePath(pathObject);
        console.log('pathObject:', sanitizedPath);

        if (!sanitizedPath || sanitizedPath.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        }

        //console.log("Hola: " + await request.file());
        // Forzar que request.body es un objeto con cualquier clave y valor
        const body = request.body as Record<string, any>;

        // Ahora puedes acceder a file
        const file = body.file as Buffer;


        if (!file) {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'NO_FILE',
                message: 'No se proporcionó un archivo.',
                },
            });
        }

        const fileSize = getFileSize(file);
        console.log(`Archivo: ${fileSize.bytes}`); 

        // Validar el tipo de archivo
        const mimeType = await FileType.fileTypeFromBuffer(file);
        if(!mimeType || typeof mimeType === "undefined") {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'CAN_NOT_VERIFY_MIMETYPE',
                message: 'El tipo de archivo no está permitido. Se esperaba image/webp o application/pdf.',
                },
            });

        }


        const allowedMimetypes = ['image/webp', 'application/pdf'];
        if (!allowedMimetypes.includes(mimeType.mime)) {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_MIMETYPE',
                message: 'El tipo de archivo no está permitido. Se esperaba image/webp o application/pdf.',
                },
            });
        }

        const businessId = request.session.get('business_id');

        if (!businessId) {
            return reply.type('application/json').code(StatusCodes.UNAUTHORIZED).send({
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

        const fileName = `${businessId}/${pathObject}-${Date.now()}-${nanoid()}`;
        console.log(fileName);

        // Subir el archivo a S3
        const upload = new Upload({
            client: request.server.s3Client,
            params: {
                Bucket: config.minio.bucketName,
                Key: fileName,
                Body: file, // Usamos el Buffer directamente
                ContentType: mimeType.mime
            },
        });

        console.log(pathObject);

        await upload.done();

        return reply.type('application/json').code(StatusCodes.OK).send({
            v: config.currentApiVersion,
            method: requestPath(request.originalUrl),
            meta: {},
            data: {
                file_name: fileName,
                message: 'Archivo subido exitosamente',
            },
            error: {}
        });

    };

    async updateObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ pathObject: string }>) {

        const { pathObject } = opts;

        // Forzar que request.body es un objeto con cualquier clave y valor
        const body = request.body as Record<string, any>;

        // Ahora puedes acceder a file
        const file = body.file as Buffer;

        // Validar pathObject
        if (!pathObject || pathObject.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        }

        const sanitizedPath = sanitizePath(pathObject);
        console.log('pathObject:', sanitizedPath);

        if (!sanitizedPath || sanitizedPath.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        }


        if (!file) {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'NO_FILE',
                message: 'No se proporcionó un archivo.',
                },
            });
        }

        // Validar el tipo de archivo
        const mimeType = await FileType.fileTypeFromBuffer(file);
        if(!mimeType || typeof mimeType === "undefined") {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'CAN_NOT_VERIFY_MIMETYPE',
                message: 'El tipo de archivo no está permitido. Se esperaba image/webp o application/pdf.',
                },
            });

        }

        try {
        await request.server.s3Client.send(new HeadObjectCommand({
            Bucket: config.minio.bucketName,
            Key: pathObject,
        }));
        } catch (err) {
        return reply.type('application/json').code(StatusCodes.NOT_FOUND).send({
            v: config.currentApiVersion,
            method: requestPath(request.originalUrl),
            meta: {},
            data: {},
            error: {
                code: 'FILE_NOT_FOUND',
                message: 'El archivo especificado no existe.',
            },
        });
        }


        const allowedMimetypes = ['image/webp', 'application/pdf'];
        if (!allowedMimetypes.includes(mimeType.mime)) {
        return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                    code: 'INVALID_MIMETYPE',
                    message: 'El tipo de archivo no está permitido. Se esperaba image/webp o application/pdf.',
                },
            });
        }

        const command = new PutObjectCommand({
            Bucket: config.minio.bucketName,
            Key: pathObject,
            Body: file,
            ContentType: mimeType.mime,
        });

        await request.server.s3Client.send(command);

        return reply.type('application/json').code(StatusCodes.OK).send({
            v: config.currentApiVersion,
            method: requestPath(request.originalUrl),
            meta: {},
            error: {},
            data: {
                message: "Archivo actualizado exitosamente",
            }
        });

    };

    async deleteObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ pathObject: string }>) {

        const { pathObject } = opts;

        // Validar pathObject
        if (!pathObject || pathObject.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        }
    
        const sanitizedPath = sanitizePath(pathObject);
        console.log('pathObject:', sanitizedPath);
    
        if (!sanitizedPath || sanitizedPath.trim() === '') {
            return reply.type('application/json').code(StatusCodes.BAD_REQUEST).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro pathObject es obligatorio y no puede estar vacío.',
                },
            });
        }
    
        // Verificar si el archivo existe
        try {
            await request.server.s3Client.send(new HeadObjectCommand({
                Bucket: config.minio.bucketName,
                Key: pathObject,
            }));
        } catch (err) {
            return reply.type('application/json').code(StatusCodes.NOT_FOUND).send({
                v: config.currentApiVersion,
                method: requestPath(request.originalUrl),
                meta: {},
                data: {},
                error: {
                    code: 'FILE_NOT_FOUND',
                    message: 'El archivo especificado no existe.',
                },
            });
        }
    
        const command = new DeleteObjectCommand({
            Bucket: config.minio.bucketName,
            Key: pathObject,
        });
        await request.server.s3Client.send(command);
    
        return reply.type('application/json').code(StatusCodes.OK).send({
            v: config.currentApiVersion,
            method: requestPath(request.originalUrl),
            meta: {},
            error: {},
            data: {
                message: 'Archivo eliminado exitosamente',
            },
        });

    };


};

export default new Services_privateS3();