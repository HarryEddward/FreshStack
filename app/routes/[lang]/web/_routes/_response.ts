
// @routes/[lang]/web/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langWebPayload,
  IPOST_langWebPayload,
  IPUT_langWebPayload,
  IDELETE_langWebPayload,
} from "@routes/[lang]/web/_routes/_payload.ts";

import {
  IPOST_langWebFormSchema,
} from "@routes/[lang]/web/_routes/_validation.ts";

export const GET_langWebResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langWebPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langWebResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langWebPayload, validation: IPOST_langWebFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langWebResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langWebPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langWebResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langWebPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
