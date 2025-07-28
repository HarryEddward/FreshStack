import axios from 'axios';
import * as fs from 'fs';
import * as https from 'https';

const url = 'https://10.241.157.225:3800/api/v1/private/s3/object/1753119267493-businessId/image';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


async function downloadFile() {
  try {
    const response = await axios.get(url, {
      responseType: 'stream',
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      headers: {
        Cookie: 'sessionId=VDJhRFRSTzU4LXRWYWhEdkdoeTZq.k3pmXbG3mwIsZAy8F7dkdOjhu5+FKiOcIc+vz3LsKIA',
        //Accept: 'application/octet-stream'
      }
    });

    const writer = fs.createWriteStream('./download/new_image.webp');
    response.data.pipe(writer);

    writer.on('finish', () => console.log('✅ Archivo descargado correctamente.'));
    writer.on('error', err => console.error('❌ Error al escribir el archivo:', err));

  } catch (error) {
    console.error('❌ Error al descargar el archivo:', error);
  }
}

downloadFile();
