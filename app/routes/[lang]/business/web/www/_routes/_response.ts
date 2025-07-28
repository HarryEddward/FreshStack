
// @routes/[lang]/business/web/www/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebWWWPayload,
  IPOST_langBusinessWebWWWPayload,
  IPUT_langBusinessWebWWWPayload,
  IDELETE_langBusinessWebWWWPayload,
} from "@routes/[lang]/business/web/www/_routes/_payload.ts";

import {
  IPOST_langBusinessWebWWWFormSchema,
} from "@routes/[lang]/business/web/www/_routes/_validation.ts";

export const GET_langBusinessWebWWWResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebWWWPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebWWWResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebWWWPayload, validation: IPOST_langBusinessWebWWWFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebWWWResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebWWWPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebWWWResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebWWWPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
