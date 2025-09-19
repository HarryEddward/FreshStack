import { Handlers, FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { DELETE_langBusinessWebAppLogoutController, GET_langBusinessWebAppLogoutController, POST_langBusinessWebAppLogoutController, PUT_langBusinessWebAppLogoutController } from './_routes/_controller.ts';

export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppLogoutController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppLogoutController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppLogoutController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppLogoutController(req, ctx);
  },
};