// _middleware.ts
import { FreshContext } from '$fresh/server.ts';
import { composeMiddlewares } from "@utils/middleware.ts";
import { middlewareList } from '@middleware/[lang]/business/app/index.ts';

// Middleware principal
export const handler = async (req: Request, ctx: FreshContext) => {
  return await composeMiddlewares(req, ctx, middlewareList);
};