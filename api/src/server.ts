import 'module-alias/register';

// src/server.ts

import { build } from './app';
import config from './config';
import * as fs from 'fs';
import path from 'path';



const start = async () => {

  const app = await build();

  try {
    await app.listen({
      port: config.port,
      host: config.host
    });
    app.log.info(`Servidor escuchando en http://${config.host}:${config.port}`);
    if (config.nodeEnv !== 'production') {
      app.log.info(`Documentación Swagger UI disponible en http://${config.host}:${config.port}/documentation`);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();