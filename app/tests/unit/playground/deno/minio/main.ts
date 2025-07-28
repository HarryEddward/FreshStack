// Importar el cliente MinIO desde un CDN compatible con Deno
import { Client } from "https://esm.sh/minio@7.1.3";

// Configura el cliente MinIO
const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false, // Cambia a true si usas HTTPS en producción
  accessKey: "minio-root-user", // Reemplaza con tu accessKey real
  secretKey: "minio-root-password", // Reemplaza con tu secretKey real
});

// Crear un bucket
async function createBucket(bucketName: string): Promise<void> {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (exists) {
      console.log(`El bucket '${bucketName}' ya existe.`);
      return;
    }
    await minioClient.makeBucket(bucketName, "us-east-1"); // Región por defecto
    console.log(`Bucket '${bucketName}' creado exitosamente.`);
  } catch (error) {
    console.error(`Error al crear el bucket '${bucketName}':`, error);
    throw error;
  }
}

// Subir un archivo desde el sistema de archivos
async function uploadFile(
  bucketName: string,
  objectName: string,
  filePath: string
): Promise<void> {
  try {
    // Leer el archivo como Uint8Array (Buffer)
    const fileData = await Deno.readFile(filePath);
    console.log("Tipo de fileData:", fileData.constructor.name); // Depuración: Uint8Array
    console.log("Longitud de fileData:", fileData.length); // Depuración: tamaño del archivo

    // Determinar el tipo de contenido según la extensión
    const contentType = filePath.endsWith(".txt")
      ? "text/plain"
      : "application/octet-stream";

    // Subir el archivo usando Uint8Array
    await minioClient.putObject(bucketName, objectName, fileData, {
      "Content-Type": contentType,
    });
    console.log(`Archivo '${objectName}' subido exitosamente a '${bucketName}'.`);
  } catch (error) {
    console.error(`Error al subir el archivo '${filePath}':`, error);
    throw error;
  }
}

// Subir un archivo como string (alternativa para pruebas)
async function uploadFileAsString(
  bucketName: string,
  objectName: string,
  filePath: string
): Promise<void> {
  try {
    // Leer el archivo como string
    const fileContent = await Deno.readTextFile(filePath);
    console.log("Tipo de fileContent:", typeof fileContent); // Depuración: string
    console.log("Contenido del archivo:", fileContent); // Depuración: contenido

    // Subir el archivo como string
    await minioClient.putObject(bucketName, objectName, fileContent, {
      "Content-Type": "text/plain",
    });
    console.log(`Archivo '${objectName}' subido como string a '${bucketName}'.`);
  } catch (error) {
    console.error(`Error al subir el archivo '${filePath}' como string:`, error);
    throw error;
  }
}

// Subir datos desde memoria
async function uploadFromMemory(
  bucketName: string,
  objectName: string,
  data: Uint8Array | string
): Promise<void> {
  try {
    const contentType = typeof data === "string" ? "text/plain" : "application/octet-stream";
    const buffer = typeof data === "string" ? new TextEncoder().encode(data) : data;
    await minioClient.putObject(bucketName, objectName, buffer, {
      "Content-Type": contentType,
    });
    console.log(`Datos '${objectName}' subidos desde memoria a '${bucketName}'.`);
  } catch (error) {
    console.error(`Error al subir datos desde memoria:`, error);
    throw error;
  }
}

// Descargar un archivo a un archivo local
async function downloadToFile(
  bucketName: string,
  objectName: string,
  filePath: string
): Promise<void> {
  try {
    const stream = await minioClient.getObject(bucketName, objectName);
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const data = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    // Escribir al sistema de archivos (requiere --allow-write)
    await Deno.writeFile(filePath, data);
    console.log(`Archivo '${objectName}' descargado a '${filePath}' exitosamente.`);
  } catch (error) {
    console.error(`Error al descargar el archivo '${objectName}':`, error);
    throw error;
  }
}

// Descargar un archivo a memoria
async function downloadToMemory(
  bucketName: string,
  objectName: string
): Promise<Uint8Array> {
  try {
    const stream = await minioClient.getObject(bucketName, objectName);
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const data = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    console.log(
      `Archivo '${objectName}' descargado a memoria:`,
      new TextDecoder().decode(data)
    );
    return data;
  } catch (error) {
    console.error(`Error al descargar '${objectName}' a memoria:`, error);
    throw error;
  }
}

// Listar objetos en un bucket
async function listObjects(bucketName: string): Promise<void> {
  try {
    const stream = minioClient.listObjects(bucketName, "", true);
    console.log(`Objetos en el bucket '${bucketName}':`);
    for await (const obj of stream) {
      console.log(`- Nombre: ${obj.name}, Tamaño: ${obj.size} bytes`);
    }
  } catch (error) {
    console.error(`Error al listar objetos en '${bucketName}':`, error);
    throw error;
  }
}

// Eliminar un archivo
async function deleteObject(bucketName: string, objectName: string): Promise<void> {
  try {
    await minioClient.removeObject(bucketName, objectName);
    console.log(`Archivo '${objectName}' eliminado de '${bucketName}' exitosamente.`);
  } catch (error) {
    console.error(`Error al eliminar el archivo '${objectName}':`, error);
    throw error;
  }
}

// Eliminar un bucket
async function deleteBucket(bucketName: string): Promise<void> {
  try {
    await minioClient.removeBucket(bucketName);
    console.log(`Bucket '${bucketName}' eliminado exitosamente.`);
  } catch (error) {
    console.error(`Error al eliminar el bucket '${bucketName}':`, error);
    throw error;
  }
}

// Verificar si un bucket existe
async function checkBucketExists(bucketName: string): Promise<boolean> {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    console.log(exists ? `El bucket '${bucketName}' existe.` : `El bucket '${bucketName}' no existe.`);
    return exists;
  } catch (error) {
    console.error(`Error al verificar el bucket '${bucketName}':`, error);
    throw error;
  }
}

// Configurar una política de acceso pública
async function setPublicPolicy(bucketName: string): Promise<void> {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "*" },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };
  try {
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log(`Política pública aplicada al bucket '${bucketName}'.`);
  } catch (error) {
    console.error(`Error al aplicar política al bucket '${bucketName}':`, error);
    throw error;
  }
}

// Función principal para ejecutar todas las operaciones
async function main() {
  const bucketName = "freshstack";
  const objectName = "ejemplo.txt";
  const filePath = "./ejemplo.txt";
  const downloadedFilePath = "./descargado.txt";

  try {
    // Crear un archivo de ejemplo para la prueba (requiere --allow-write)
    const sampleContent = "Contenido de ejemplo para el archivo";
    await Deno.writeTextFile(filePath, sampleContent);
    console.log(`Archivo de ejemplo '${filePath}' creado.`);

    // Verificar y crear bucket
    await checkBucketExists(bucketName);
    await createBucket(bucketName);

    // Subir archivo desde el sistema (usando Uint8Array)
    await uploadFile(bucketName, objectName, filePath);

    // Subir archivo como string (alternativa para pruebas)
    await uploadFileAsString(bucketName, "ejemplo-string.txt", filePath);

    // Subir datos desde memoria
    const memoryData = new TextEncoder().encode("Contenido desde memoria");
    await uploadFromMemory(bucketName, "memoria.txt", memoryData);

    // Listar objetos
    await listObjects(bucketName);

    // Descargar a archivo
    await downloadToFile(bucketName, objectName, downloadedFilePath);

    // Descargar a memoria
    await downloadToMemory(bucketName, objectName);

    // Configurar política pública
    await setPublicPolicy(bucketName);

    // Eliminar archivos
    await deleteObject(bucketName, objectName);
    await deleteObject(bucketName, "ejemplo-string.txt");
    await deleteObject(bucketName, "memoria.txt");

    // Eliminar bucket (descomenta si deseas eliminarlo)
    // await deleteBucket(bucketName);
  } catch (error) {
    console.error("Error en la ejecución del programa:", error);
  }
}

// Ejecutar la función principal
main().catch((error) => console.error("Error fatal:", error));