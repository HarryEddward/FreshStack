import { FreshContext } from '$fresh/server.ts';
import { MiddlewareFn } from '@type/middleware.d.ts';

export async function composeMiddlewares(
  req: Request,
  ctx: FreshContext,
  middlewares: MiddlewareFn[]
): Promise<Response> {
  // Función base que pasa al siguiente middleware o al handler final
  let index = -1;
  async function dispatch(i: number): Promise<Response> {
    if (i <= index) {
      throw new Error("next() llamado varias veces");
    }
    index = i;
    if (i >= middlewares.length) {
      return await ctx.next(); // Llama al handler final si no hay más middlewares
    }
    const middleware = middlewares[i];
    return await middleware(req, ctx, () => dispatch(i + 1));
  }
  return await dispatch(0);
}