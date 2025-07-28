// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { licenseHandler } from '@middleware/[lang]/business/app/licenseHandler.ts';
import { appConfigureHandler } from "./appConfigureHandler.ts";

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    appConfigureHandler,
    licenseHandler
];