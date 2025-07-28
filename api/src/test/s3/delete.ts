import axios from 'axios';
import * as https from 'https';

const url = 'https://10.241.157.225:3800/api/v1/private/s3/object/1752847024256-businessId/image';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function deleteFile() {
  try {
    const response = await axios.delete(url, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        Cookie: 'sessionId=cjdPeFY1YjdXNDc5WFFEMkplQk5q.inmGQa1/m6P/NYufUFTtEnVxxriZNXspa0OM51ThgF0',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('✅ Archivo eliminado correctamente:', response.data);
    } else {
      console.warn('⚠️ Respuesta inesperada:', response.status, response.data);
    }
  } catch (error: any) {
    if (error.response) {
      console.error('❌ Error al eliminar el archivo:', error.response.status, error.response.data);
    } else {
      console.error('❌ Error inesperado al eliminar:', error.message);
    }
  }
}

deleteFile();
