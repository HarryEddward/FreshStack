
// @routes/[lang]/business/web/app/dashboard/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppDashboardPayload,
  IPOST_langBusinessWebAppDashboardPayload,
  IPUT_langBusinessWebAppDashboardPayload,
  IDELETE_langBusinessWebAppDashboardPayload,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppDashboardFormSchema,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_validation.ts";

export const GET_langBusinessWebAppDashboardResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppDashboardPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppDashboardResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppDashboardPayload, validation: IPOST_langBusinessWebAppDashboardFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppDashboardResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppDashboardPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppDashboardResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppDashboardPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
