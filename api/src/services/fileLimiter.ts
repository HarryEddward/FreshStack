import config from '@/config';
import { ApiError } from '@/utils/error';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { enhance, PrismaClient } from '@zenstackhq/runtime';
import FileType, { FileTypeResult } from 'file-type';
import { StatusCodes } from 'http-status-codes';
import { formatFileSize, generateHashFile, getFileSize } from './fileSize';
import { sanitizePath } from '@/utils/path';
import { nanoid } from 'nanoid';
import { resolveMimeType } from '@/utils/mimeType';
import { FastifyRequest } from 'fastify';
import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';


const MAX_TOTAL_FILES_GB = 1.7; // 500 MB


export const limiterFilesCount = async (
    db: ReturnType<typeof enhance<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>>>
) => {

    const result = await db.businessFile.count();

    if (result >= 500) {
        
        throw new ApiError(
            'TOTAL_FILES_EXCEEDED',
            'El número máximo de archivos permitidos del negocio es de 500.',
            StatusCodes.BAD_REQUEST
        );
    }



};

export const limiterFilesTypeMime = (
    typeMime: FileType.FileTypeResult | undefined
) => {

    // Aquí puedes implementar la lógica para limitar los tipos MIME de los archivos
    // Por ejemplo, podrías verificar si el tipo MIME del archivo está permitido
    // y lanzar un error si no lo está.

    if(!typeMime || typeof typeMime === "undefined") {

        throw new ApiError(
            'CAN_NOT_VERIFY_MIMETYPE',
            'El tipo de archivo no está permitido. Se esperaba image/webp o application/pdf.',
            StatusCodes.BAD_REQUEST
        );

    }

    // Ejemplo de implementación:
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']; // Agrega los tipos MIME permitidos
    if (!allowedMimeTypes.includes(typeMime.mime)) {

        throw new ApiError(
            'INVALID_MIMETYPE',
            'El tipo de archivo no está permitido. Se esperaba image/webp o application/pdf.',
            StatusCodes.BAD_REQUEST
        );
    }

};

export const limiterTotalFilesMaxMB = (
    db: ReturnType<typeof enhance<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>>>
) => {
    db.businessFile.findMany({
        select: {
            sizeBytes: true,
        },
    }).then(files => {
        const totalSize = files.reduce((acc, file) => acc + file.sizeBytes, 0);
        const maxSizeMB = (MAX_TOTAL_FILES_GB * 1000) * 1024 * 1024;

        if (totalSize > maxSizeMB) {
            throw new ApiError(
                'TOTAL_FILES_SIZE_EXCEEDED',
                `El tamaño total de los archivos supera el límite de ${formatFileSize(totalSize)}.`,
                StatusCodes.BAD_REQUEST
            );
        }
    })
};


export const limiterNameFile = (
    name: string
) => {
    if (!name || name.trim() === '') {
    
    throw new ApiError(
            'INVALID_PATH',
            'El parámetro pathObject es obligatorio y no puede estar vacío.',
            StatusCodes.BAD_REQUEST
        );
    };

    const sanitizedPath = sanitizePath(name);
    console.log('pathObject:', sanitizedPath);

    if (!sanitizedPath || sanitizedPath.trim() === '') {
        throw new ApiError(
            'INVALID_NAME',
            'El parámetro name es obligatorio y no puede estar vacío.',
            StatusCodes.BAD_REQUEST
        );
    }
};


export const limiterExistFile = (
    file: Buffer
) => {
    if (!file || file.length === 0) {
        throw new ApiError(
            'NO_FILE',
            'No se proporcionó un archivo.',
            StatusCodes.BAD_REQUEST
        );
    }
};


export const createFilePersistant = async (
    db: ReturnType<typeof enhance<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>>>,
    fileId: string,
    mimeType: FileTypeResult | undefined,
    businessId: string,
    file: Buffer,
    request: FastifyRequest
) => {
    const name = nanoid();
  const pathName = `${businessId}/${name}-${Date.now()}-${nanoid()}`;
  const mimeTypeResolved = resolveMimeType(mimeType as FileTypeResult) || 'application/octet-stream'; // Fallback MIME type
  const hash = generateHashFile(file);
  const sizeBytes = getFileSize(file).bytes;

  // Check if the file already exists
  const fileDb = await db.businessFile.findUnique({
    where: { id: fileId },
  });

  if (!fileDb) {
    // Create a new file and associate it with the Business
    const fileCreated = await db.$transaction(async (tx) => {
      const fileCreated = await tx.businessFile.create({
        data: {
          id: fileId,
          name,
          path: pathName,
          mimeType: mimeTypeResolved,
          hash,
          sizeBytes,
          business: {
            connect: { id: businessId }, // Connect to existing Business
          },
        },
      });

      // Upload to MinIO
      const upload = new Upload({
        client: request.server.s3Client,
        params: {
          Bucket: config.minio.bucketName,
          Key: fileCreated.path,
          Body: file,
          ContentType: mimeTypeResolved,
        },
      });
      await upload.done();

      return fileCreated;
    });

    return fileCreated; // Return the created BusinessFile record
  } else {
    // Update existing file
    try {
      // Check if the file exists in MinIO
      await request.server.s3Client.send(
        new HeadObjectCommand({
          Bucket: config.minio.bucketName,
          Key: fileDb.path,
        })
      );

      // Update the file in MinIO
      const command = new PutObjectCommand({
        Bucket: config.minio.bucketName,
        Key: pathName, // Use new pathName to avoid overwriting issues
        Body: file,
        ContentType: mimeTypeResolved,
      });
      await request.server.s3Client.send(command);
    } catch (error) {
      // Handle case where file doesn't exist in MinIO
      const upload = new Upload({
        client: request.server.s3Client,
        params: {
          Bucket: config.minio.bucketName,
          Key: pathName,
          Body: file,
          ContentType: mimeTypeResolved,
        },
      });
      await upload.done();
    }

    // Update the BusinessFile in the database
    const updatedFile = await db.businessFile.update({
      where: { id: fileId },
      data: {
        name,
        path: pathName,
        mimeType: mimeTypeResolved,
        hash,
        sizeBytes,
        business: {
          connect: { id: businessId }, // Ensure relationship is set/updated
        },
      },
    });

    return updatedFile; // Return the updated BusinessFile record
  }
}