import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import {
    GET_langBusinessWebAppDashboardSuppliersController,
    POST_langBusinessWebAppDashboardSuppliersController,
    PUT_langBusinessWebAppDashboardSuppliersController,
    DELETE_langBusinessWebAppDashboardSuppliersController
} from "./_routes/_controller.ts";
import { State } from '@middleware/sessionHandler.ts';
import { IGET_langBusinessWebAppDashboardSuppliersPayload } from './_routes/_payload.ts';
import LangBusinessWebAppDashboardSuppliersIslandViewPage from "@islands/routes/[lang]/business/web/app/dashboard/suppliers/ViewPage.tsx";




export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langBusinessWebAppDashboardSuppliersController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langBusinessWebAppDashboardSuppliersController(req, ctx);
  },

  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langBusinessWebAppDashboardSuppliersController(req, ctx);
  },

  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langBusinessWebAppDashboardSuppliersController(req, ctx);
  },
};



export default function index({ data }: PageProps<IGET_langBusinessWebAppDashboardSuppliersPayload>) {
  return (
    <>
        <LangBusinessWebAppDashboardSuppliersIslandViewPage data={data} />
    </>
  )
}
