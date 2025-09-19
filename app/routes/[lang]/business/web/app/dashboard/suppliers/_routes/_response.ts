
// @routes/[lang]/business/web/app/dashboard/suppliers/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppDashboardSuppliersPayload,
  IPOST_langBusinessWebAppDashboardSuppliersPayload,
  IPUT_langBusinessWebAppDashboardSuppliersPayload,
  IDELETE_langBusinessWebAppDashboardSuppliersPayload,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppDashboardSuppliersFormSchema,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_validation.ts";

export const GET_langBusinessWebAppDashboardSuppliersResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppDashboardSuppliersPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppDashboardSuppliersResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppDashboardSuppliersPayload, validation: IPOST_langBusinessWebAppDashboardSuppliersFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppDashboardSuppliersResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppDashboardSuppliersPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppDashboardSuppliersResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppDashboardSuppliersPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
