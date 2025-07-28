// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { translationLoader } from '@middleware/[lang]/translationLoader.ts';

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    translationLoader
];