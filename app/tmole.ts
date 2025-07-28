import { tunnelmole } from 'npm:tunnelmole';

export const urlTmole = await tunnelmole({ port: 8000 });

setTimeout(() => null, 60000); // Cierra tras 1 minuto