import LangBusinessWebAppIslandViewPage from "@islands/routes/[lang]/business/web/app/ViewPage.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GET_langBusinessWebAppController, POST_langBusinessWebAppController, PUT_langBusinessWebAppController, DELETE_langBusinessWebAppController } from '@routes/[lang]/business/web/app/_routes/_controller.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IGET_langBusinessWebAppPayload } from "./_routes/_payload.ts";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppController(req, ctx);
  },
};


export default function Index({ data }: PageProps<IGET_langBusinessWebAppPayload>) {

  return (
    <LangBusinessWebAppIslandViewPage actualLang={data.actualLang}/>
  );
}
