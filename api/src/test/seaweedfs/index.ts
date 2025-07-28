import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import { Readable } from 'stream';

// Configuración del cliente S3
const s3 = new S3Client({
  endpoint: 'http://localhost:8333', // O 'http://s3:8333' si usas Docker Swarm
  region: 'eu-west-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'AK1234567890',
    secretAccessKey: 'SK1234567890',
  },
});

// Función para subir un archivo
async function uploadToS3() {
  const fileStream = fs.createReadStream('test.png');

  const command = new PutObjectCommand({
    Bucket: 'freshstack',
    Key: 'test.png',
    Body: fileStream,
    ContentType: 'image/png',
  });

  try {
    const response = await s3.send(command);
    console.log('Archivo subido correctamente:', response);
  } catch (err) {
    console.error('Error al subir:', err);
  }
}

// Función para obtener un archivo
async function getFromS3() {
  const command = new GetObjectCommand({
    Bucket: 'freshstack',
    Key: 'test.png',
  });

  try {
    const response = await s3.send(command);

    // Verificar que el objeto existe
    if (!response.Body) {
      throw new Error('Object not found');
    }

    // Convertir el cuerpo del objeto a un stream y guardarlo en un archivo
    const stream = response.Body as Readable;
    const outputPath = 'downloaded_test.png';
    const fileStream = fs.createWriteStream(outputPath);

    // Pipe el stream a un archivo
    stream.pipe(fileStream);

    return new Promise((resolve, reject) => {
      fileStream.on('finish', () => {
        console.log(`Archivo descargado correctamente y guardado en: ${outputPath}`);
        resolve({ filePath: outputPath, contentType: response.ContentType });
      });
      fileStream.on('error', (err) => {
        console.error('Error al guardar el archivo:', err);
        reject(err);
      });
    });
  } catch (err) {
    console.error('Error al obtener el archivo:', err);
    throw err;
  }
}

// Ejecutar las funciones
async function main() {
  // Subir el archivo (ya lo hiciste, pero lo dejamos para referencia)
  //await uploadToS3();

  // Obtener el archivo
  await getFromS3();
}

main().catch(console.error);