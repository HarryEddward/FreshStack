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
import { formatFileSize, generateHashFile, getFileSize } from "./fileSize";
import { createFilePersistant, limiterExistFile, limiterFilesCount, limiterFilesTypeMime, limiterNameFile, limiterTotalFilesMaxMB } from "./fileLimiter";
import { enhance } from "@zenstackhq/runtime";
import { $Enums, Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ApiError } from "@/utils/error";
import { resolveMimeType } from "@/utils/mimeType";

type Opts<T> = T;

class GlobalServices_s3 {

    async obtainObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ name: string }>): Promise<GlobalJSONResponse | StreamingBlobPayloadOutputTypes | undefined> {

        const { name } = opts;
                
        const sanitizedPath = sanitizePath(name);
        console.log('name:', sanitizedPath);

        if (!sanitizedPath || sanitizedPath.trim() === '') {
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                    code: 'INVALID_PATH',
                    message: 'El parámetro name es obligatorio y no puede estar vacío.',
                },
            };
        }

        // Verifica si el objeto existe
        try {
            await request.server.s3Client.send(new HeadObjectCommand({
                Bucket: config.minio.bucketName,
                Key: name,
            }));
        } catch (err) {
            // Si no existe, devuelve 404
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                error: {},
                data: {
                    message: "Archivo no encontrado",
                }
            };
        }

        // Si existe, lo obtenemos
        const command = new GetObjectCommand({
            Bucket: config.minio.bucketName,
            Key: name,
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

        return response.Body as StreamingBlobPayloadOutputTypes;

    };

    async uploadObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{
        name: string,
        db: ReturnType<typeof enhance<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>>>
        businessId: string
    }>) {

        const { name, db, businessId } = opts;

        limiterNameFile(
            name
        );

        //console.log("Hola: " + await request.file());
        // Forzar que request.body es un objeto con cualquier clave y valor
        const body = request.body as Record<string, any>;

        // Ahora puedes acceder a file
        const file = body.file as Buffer;

        if (!file || file.length === 0) {

            console.log('No subio ningun archivo');
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {
                    file: false,
                },
                data: {
                    message: 'No subio ningún archivo.',
                },
                error: {}
            };
        };

        console.log('Provee Mime Type of File');

        // Validar el tipo de archivo
        const typeMime = await FileType.fileTypeFromBuffer(file);

        limiterFilesCount(
            db
        );
        limiterFilesTypeMime(
            typeMime
        )
        limiterTotalFilesMaxMB(
            db
        )

        const pathName = `${businessId}/${name}-${Date.now()}-${nanoid()}`;

        // Subir el archivo a S3
        const upload = new Upload({
            client: request.server.s3Client,
            params: {
                Bucket: config.minio.bucketName,
                Key: pathName,
                Body: file, // Usamos el Buffer directamente
                ContentType: (typeMime as FileType.FileTypeResult).mime // Hay un error que maneja el tipo MIME como undefined
            },
        });

        await upload.done();

        const data = {
            path: pathName,
            name,
            mimeType: resolveMimeType(typeMime as FileType.FileTypeResult), // Asigna el objeto FileType en vez de solo el string mime
            hash: generateHashFile(file),
            sizeBytes: getFileSize(file).bytes,
        };

        const createFile = await db.$transaction(async (tx) => {
            const businessFile = await tx.businessFile.create({
                data: {
                    ...data,
                    id: nanoid(),
                    businessId,
                }
            });
            return businessFile.id;
        });

        return {
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {
                file: true,
            },
            data: {
                id: createFile,
                message: 'Archivo subido exitosamente',
            },
            error: {}
        };

    };

    async updateObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{
        fileId: string,
        db: ReturnType<typeof enhance<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>>>,
        businessId: string
    }>) {

        const { fileId, db, businessId } = opts;

        // Forzar que request.body es un objeto con cualquier clave y valor
        const body = request.body as Record<string, any>;

        // Ahora puedes acceder a file
        const file = body.file as Buffer;

        limiterNameFile(
            fileId
        );


        if (!file || file.length === 0) {
            console.log('No subio ningun archivo');
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {
                    file: false,
                },
                data: {
                    message: 'No subio ningún archivo.',
                },
                error: {}
            };
        };

        // Validar el tipo de archivo
        const typeMime = await FileType.fileTypeFromBuffer(file);
        limiterFilesCount(
            db
        );
        limiterFilesTypeMime(
            typeMime
        );
        limiterTotalFilesMaxMB(
            db
        );


        

        try {
            const fileUpload = await createFilePersistant(
                db,
                fileId,
                typeMime,
                businessId,
                file,
                request
            );
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {
                    file: true
                },
                error: {},
                data: {
                    id: fileUpload.id,
                    message: "Archivo actualizado exitosamente",
                }
            };
            
        } catch (err) {

            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                    code: 'FILE_NOT_FOUND',
                    message: 'El archivo especificado no existe.',
                },
            };
        };

        

    };

    async deleteObjectS3(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ name: string }>) {

        const { name } = opts;

        // Validar name
        if (!name || name.trim() === '') {
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro name es obligatorio y no puede estar vacío.',
                },
            };
        }
    
        const sanitizedPath = sanitizePath(name);
        console.log('name:', sanitizedPath);
    
        if (!sanitizedPath || sanitizedPath.trim() === '') {
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                code: 'INVALID_PATH',
                message: 'El parámetro name es obligatorio y no puede estar vacío.',
                },
            };
        }
    
        // Verificar si el archivo existe
        try {
            await request.server.s3Client.send(new HeadObjectCommand({
                Bucket: config.minio.bucketName,
                Key: name,
            }));
        } catch (err) {
            return {
                v: config.currentApiVersion,
                method: request.originalUrl,
                meta: {},
                data: {},
                error: {
                    code: 'FILE_NOT_FOUND',
                    message: 'El archivo especificado no existe.',
                },
            };
        }
    
        const command = new DeleteObjectCommand({
            Bucket: config.minio.bucketName,
            Key: name,
        });
        await request.server.s3Client.send(command);
    
        return {
            v: config.currentApiVersion,
            method: request.originalUrl,
            meta: {},
            error: {},
            data: {
                message: 'Archivo eliminado exitosamente',
            },
        };

    };


};

export default new GlobalServices_s3();