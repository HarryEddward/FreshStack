import { FreshContext, Handlers } from "$fresh/server.ts";
import { State } from '@middleware/sessionHandler.ts';



export const handler: Handlers<unknown, State> = {
  GET(req: Request, ctx: FreshContext<State>) {
    return new Response("Hello World");
  },
};
