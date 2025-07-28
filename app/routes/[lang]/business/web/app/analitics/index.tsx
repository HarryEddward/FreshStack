import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GET_langBusinessWebAppAnaliticsController, POST_langBusinessWebAppAnaliticsController, PUT_langBusinessWebAppAnaliticsController, DELETE_langBusinessWebAppAnaliticsController } from '@routes/[lang]/business/web/app/analitics/_routes/_controller.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IGET_langBusinessWebAppAnaliticsPayload } from "@routes/[lang]/business/web/app/analitics/_routes/_payload.ts";
import LangBusinessWebAppAnaliticsIslandViewPage from "@islands/routes/[lang]/business/web/app/analitics/ViewPage.tsx";

export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppAnaliticsController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppAnaliticsController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppAnaliticsController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppAnaliticsController(req, ctx);
  },
};


export default function Index({ data }: PageProps<IGET_langBusinessWebAppAnaliticsPayload>) {

  return (
    <LangBusinessWebAppAnaliticsIslandViewPage actualLang={data.actualLang}/>
  );
}
