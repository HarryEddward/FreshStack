import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';

async function uploadFile() {
  try {
    // Ruta al archivo que quieres subir
    const filePath = path.join(__dirname, 'files/text.txt'); // Cambia por la imagen que quieras subir

    console.log(filePath);

    // Crear un objeto FormData
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath)); // 'file' debe coincidir con el nombre que espera tu backend

    // Si tu backend necesita headers específicos (ej. Authorization)
    const headers = {
      ...form.getHeaders(),
      'Cookie': 'sessionId=YUR4NHlpcmMyN3NKTE83ZnNhRVh1./PVRkT+TQ3i2Vh37bg7a1iBaYfYoCQr5e26gRuww93M' // si usas token
    };

    const url = 'https://10.241.157.225:3800/api/v1/private/minio/file/upload'; // Cambia la URL a la de tu backend

    // Hacer la petición POST
    const response = await axios.post(url, form, { headers });

    console.log('Respuesta del servidor:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en la petición:', error.response?.data || error.message);
    } else {
      console.error('Error:', error);
    }
  }
}

uploadFile();
