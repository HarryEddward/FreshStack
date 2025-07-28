import { FreshContext } from '$fresh/server.ts';

export type MiddlewareFn<T = any> = (
  req: Request,
  ctx: FreshContext<T>,
  next: () => Promise<Response>
) => Promise<Response>;
