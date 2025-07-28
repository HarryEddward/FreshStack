// @/test-s3-upload.ts
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Configuración para ignorar errores de certificados SSL (equivalente a curl -k)
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Configuración de la petición
interface ApiResponse {
  v: string;
  method: string;
  meta: Record<string, any>;
  data?: { message: string };
  error?: { code: string; message: string; details?: string };
}

async function uploadFile(
  filePath: string,
  objectPath: string,
  sessionId: string,
  apiUrl: string = 'https://10.241.157.225:3800/api/v1/private/s3/object',
): Promise<void> {
  try {
    // Verificar que el archivo exista
    if (!fs.existsSync(filePath)) {
      console.error(`Error: El archivo ${filePath} no existe.`);
      return;
    }

    // Crear el formulario multipart
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      contentType: 'application/pdf', // Ajusta según el tipo de archivo
    });

    // Configurar la petición
    const response = await axios.post<ApiResponse>(
      `${apiUrl}/${objectPath}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'accept': 'application/json',
          'Cookie': `sessionId=${sessionId}`,
        },
        httpsAgent: agent, // Ignorar certificados SSL
      }
    );

    // Manejar la respuesta
    console.log('Respuesta de la API:');
    console.log(JSON.stringify(response.data, null, 2));

    if (response.status === 200 && response.data.data) {
      console.log('Éxito:', response.data.data.message);
    } else if (response.data.error) {
      console.error('Error en la API:', response.data.error.message);
      if (response.data.error.details) {
        console.error('Detalles:', response.data.error.details);
      }
    }
  } catch (error) {
    console.error('Error al enviar la petición:');
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Respuesta del servidor:', JSON.stringify(error.response.data, null, 2));
      } else {
        console.error('Error:', error.message);
      }
    } else {
      console.error('Error inesperado:', (error as Error).message);
    }
  }
}



// Configuración de la prueba
const filePath = './upload/image.webp'; // Asegúrate de que app.pdf esté en el directorio
const objectPath = 'businessId/image';
const sessionId = 'VDJhRFRSTzU4LXRWYWhEdkdoeTZq.k3pmXbG3mwIsZAy8F7dkdOjhu5+FKiOcIc+vz3LsKIA';

// Ejecutar la prueba
uploadFile(filePath, objectPath, sessionId).then(() => {
  console.log('Prueba completada.');
});