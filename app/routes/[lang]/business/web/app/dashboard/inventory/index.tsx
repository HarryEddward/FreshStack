import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {
    DELETE_langBusinessWebAppDashboardInventoryController,
    GET_langBusinessWebAppDashboardInventoryController,
    POST_langBusinessWebAppDashboardInventoryController,
    PUT_langBusinessWebAppDashboardInventoryController
} from './_routes/_controller.ts';
import { State } from '@middleware/sessionHandler.ts';
import { IGET_langBusinessWebAppDashboardInventoryPayload } from './_routes/_payload.ts';
import LangBusinessWebAppDashboardInventoryIslandViewPage from "@islands/routes/[lang]/business/web/app/dashboard/inventory/ViewPage.tsx";


export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppDashboardInventoryController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppDashboardInventoryController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppDashboardInventoryController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppDashboardInventoryController(req, ctx);
  },
};

export default function index({ data }: PageProps<IGET_langBusinessWebAppDashboardInventoryPayload>) {
  return (
    <>
        <LangBusinessWebAppDashboardInventoryIslandViewPage data={data} />
    </>
    
  )
}
