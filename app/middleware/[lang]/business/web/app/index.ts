// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { licenseHandler } from '@middleware/[lang]/business/web/app/licenseHandler.ts';
import { verifyAuthHandler } from '@middleware/[lang]/business/web/app/verifyAuthHandler.ts';

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    licenseHandler,
    verifyAuthHandler,
    
];