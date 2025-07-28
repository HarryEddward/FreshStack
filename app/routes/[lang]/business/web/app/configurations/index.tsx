import LangBusinessWebAppIslandViewPage from "@islands/routes/[lang]/business/web/app/ViewPage.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GET_langBusinessWebAppConfigurationsController, POST_langBusinessWebAppConfigurationsController, PUT_langBusinessWebAppConfigurationsController, DELETE_langBusinessWebAppConfigurationsController } from '@routes/[lang]/business/web/app/configurations/_routes/_controller.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IGET_langBusinessWebAppConfigurationsPayload } from "@routes/[lang]/business/web/app/configurations/_routes/_payload.ts";
import LangBusinessWebAppConfigurationsIslandViewPage from "@islands/routes/[lang]/business/web/app/configurations/ViewPage.tsx";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppConfigurationsController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppConfigurationsController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppConfigurationsController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppConfigurationsController(req, ctx);
  },
};


export default function Index({ data }: PageProps<IGET_langBusinessWebAppConfigurationsPayload>) {

  return (
    <LangBusinessWebAppConfigurationsIslandViewPage actualLang={data.actualLang}/>
  );
}
