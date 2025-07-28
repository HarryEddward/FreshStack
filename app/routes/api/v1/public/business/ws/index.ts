// @routes/api/v1/public/business/ws/index.ts
import { Handlers, FreshContext } from '$fresh/server.ts';
import { GET_apiV1PublicBusinessWsController } from "@routes/api/v1/public/business/ws/_routes/_controller.ts";
import { State } from "@middleware/sessionHandler.ts";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>) {
    return await GET_apiV1PublicBusinessWsController(req, ctx);
  }
};
