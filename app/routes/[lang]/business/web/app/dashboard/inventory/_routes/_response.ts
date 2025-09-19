
// @routes/[lang]/business/web/app/dashboard/inventory/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppDashboardInventoryPayload,
  IPOST_langBusinessWebAppDashboardInventoryPayload,
  IPUT_langBusinessWebAppDashboardInventoryPayload,
  IDELETE_langBusinessWebAppDashboardInventoryPayload,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppDashboardInventoryFormSchema,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_validation.ts";

export const GET_langBusinessWebAppDashboardInventoryResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppDashboardInventoryPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppDashboardInventoryResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppDashboardInventoryPayload, validation: IPOST_langBusinessWebAppDashboardInventoryFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppDashboardInventoryResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppDashboardInventoryPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppDashboardInventoryResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppDashboardInventoryPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
