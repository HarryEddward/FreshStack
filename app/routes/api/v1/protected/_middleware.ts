// _middleware.ts
import { FreshContext } from '$fresh/server.ts';
import { composeMiddlewares } from "@utils/middleware.ts";
import { middlewareList } from '@middleware/api/v1/protected/index.ts';

// Middleware principal
export const handler = async (req: Request, ctx: FreshContext) => {
  const url = new URL(req.url);


  // Si es una ruta API y es WebSocket, evitamos middlewares que modifican headers
  // const isApi = url.pathname.startsWith("/api/");
  const isWebSocket = req.headers.get("upgrade")?.toLowerCase() === "websocket";

  if (isWebSocket) {
    return await ctx.next(); // ← salta middlewares como sessionHandler
  }

  console.log("🟡 MIDDLEWARE api/v1/protected/_middleware.ts");
  return await composeMiddlewares(req, ctx, middlewareList);
};