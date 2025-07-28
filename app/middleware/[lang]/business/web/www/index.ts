// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';
import { authHandler } from "./authHandler.ts";

//import { licenseHandler } from '@middleware/[lang]/business/web/app/licenseHandler.ts';

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    authHandler
];