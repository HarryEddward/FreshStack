import LangBusinessWebAppIslandViewPage from "@islands/routes/[lang]/business/web/app/ViewPage.tsx";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GET_langBusinessWebAppDashboardController, POST_langBusinessWebAppDashboardController, PUT_langBusinessWebAppDashboardController, DELETE_langBusinessWebAppDashboardController } from '@routes/[lang]/business/web/app/dashboard/_routes/_controller.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IGET_langBusinessWebAppDashboardPayload } from "@routes/[lang]/business/web/app/dashboard/_routes/_payload.ts";
import LangBusinessWebAppDashboardIslandViewPage from "@islands/routes/[lang]/business/web/app/dashboard/ViewPage.tsx";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppDashboardController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppDashboardController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppDashboardController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppDashboardController(req, ctx);
  },
};


export default function Index({ data }: PageProps<IGET_langBusinessWebAppDashboardPayload>) {

  return (
    <LangBusinessWebAppDashboardIslandViewPage actualLang={data.actualLang}/>
  );
}
