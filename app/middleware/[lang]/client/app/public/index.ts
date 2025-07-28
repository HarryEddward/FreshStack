// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { licenseHandler } from "@middleware/[lang]/client/licenseHandler.ts";
import { appConfigureHandler } from "../../private/app/appConfigureHandler.ts";
import { verifyAuthHandler } from "../../private/app/verifyAuthHandler.ts";

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    appConfigureHandler,
    licenseHandler,
    verifyAuthHandler
];