
// @routes/[lang]/client/[step_before]/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langClient_step_beforePayload,
  IPOST_langClient_step_beforePayload,
  IPUT_langClient_step_beforePayload,
  IDELETE_langClient_step_beforePayload,
} from "@routes/[lang]/client/[step_before]/_routes/_payload.ts";
import { IPOST_langClient_step_beforeFormSchema } from "@routes/[lang]/client/[step_before]/_routes/_validation.ts";

export const GET_langClient_step_beforeResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langClient_step_beforePayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langClient_step_beforeResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langClient_step_beforePayload, validation: IPOST_langClient_step_beforeFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langClient_step_beforeResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langClient_step_beforePayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langClient_step_beforeResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langClient_step_beforePayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
