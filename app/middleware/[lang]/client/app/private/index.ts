// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { licenseHandler } from "@middleware/[lang]/client/app/private/licenseHandler.ts";
import { appConfigureHandler } from "@middleware/[lang]/client/app/private/appConfigureHandler.ts";
import { verifyAuthHandler } from "@middleware/[lang]/client/app/private/verifyAuthHandler.ts";

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    appConfigureHandler,
    verifyAuthHandler,
    licenseHandler,
    
];