// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { adminAuthHandler } from './adminAuthHandler.ts';

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    adminAuthHandler
];