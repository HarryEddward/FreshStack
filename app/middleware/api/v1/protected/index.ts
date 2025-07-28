import { sessionHandler } from '@middleware/sessionHandler.ts';
// @middleware/v1/protected/index.ts
import { MiddlewareFn } from '@type/middleware.d.ts';
import { testHandler } from "@middleware/api/v1/protected/testHandler.ts";
import { businessAuth } from "@middleware/api/v1/protected/businessAuth.ts";

// Lista de middlewares en el orden deseado
export const middlewareList: MiddlewareFn[] = [
    
    businessAuth,
];