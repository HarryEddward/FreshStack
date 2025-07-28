// @routes/api/v1/public/business/ws/index.ts
import { Handlers, FreshContext } from '$fresh/server.ts';
import { GET_apiV1PublicBusinessWsTokensRefreshController, POST_apiV1PublicBusinessWsTokensRefreshController } from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_controller.ts";
import { State } from "@middleware/sessionHandler.ts";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>) {
    return await GET_apiV1PublicBusinessWsTokensRefreshController(req, ctx);
  },
  async POST(req: Request, ctx: FreshContext<State>) {
    return await POST_apiV1PublicBusinessWsTokensRefreshController(req, ctx);
  }
};
