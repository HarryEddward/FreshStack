import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { GET_langBusinessWebAppUsersController, POST_langBusinessWebAppUsersController, PUT_langBusinessWebAppUsersController, DELETE_langBusinessWebAppUsersController } from '@routes/[lang]/business/web/app/users/_routes/_controller.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IGET_langBusinessWebAppUsersPayload } from "@routes/[lang]/business/web/app/users/_routes/_payload.ts";
import LangBusinessWebAppUsersIslandViewPage from "@islands/routes/[lang]/business/web/app/users/ViewPage.tsx";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppUsersController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppUsersController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppUsersController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppUsersController(req, ctx);
  },
};


export default function Index({ data }: PageProps<IGET_langBusinessWebAppUsersPayload>) {

  return (
    <LangBusinessWebAppUsersIslandViewPage actualLang={data.actualLang}/>
  );
}
