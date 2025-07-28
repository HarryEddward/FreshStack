// _middleware.ts
import { FreshContext } from '$fresh/server.ts';
import { composeMiddlewares } from "@utils/middleware.ts";
import { middlewareList } from '@middleware/index.ts';

// Middleware principal
export const handler = async (req: Request, ctx: FreshContext) => {
  return await composeMiddlewares(req, ctx, middlewareList);
};