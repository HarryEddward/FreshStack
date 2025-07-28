// middleware/[lang]/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';

import { initialAccessGuard } from "@middleware/[lang]/client/app/private/services/initialAccessGuard.ts";

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    initialAccessGuard
];