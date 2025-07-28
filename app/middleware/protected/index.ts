// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';
import { mainAuth } from '@middleware/protected/mainAuth.ts';

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    mainAuth
];