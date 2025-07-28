
// @routes/[lang]/business/web/app/configurations/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppConfigurationsPayload,
  IPOST_langBusinessWebAppConfigurationsPayload,
  IPUT_langBusinessWebAppConfigurationsPayload,
  IDELETE_langBusinessWebAppConfigurationsPayload,
} from "@routes/[lang]/business/web/app/configurations/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppConfigurationsFormSchema,
} from "@routes/[lang]/business/web/app/configurations/_routes/_validation.ts";

export const GET_langBusinessWebAppConfigurationsResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppConfigurationsPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppConfigurationsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppConfigurationsPayload, validation: IPOST_langBusinessWebAppConfigurationsFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppConfigurationsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppConfigurationsPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppConfigurationsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppConfigurationsPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
