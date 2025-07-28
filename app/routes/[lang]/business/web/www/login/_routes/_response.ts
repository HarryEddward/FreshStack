
// @routes/[lang]/business/web/www/login/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebWWWLoginPayload,
  IPOST_langBusinessWebWWWLoginPayload,
  IPUT_langBusinessWebWWWLoginPayload,
  IDELETE_langBusinessWebWWWLoginPayload,
} from "@routes/[lang]/business/web/www/login/_routes/_payload.ts";

import {
  IPOST_langBusinessWebWWWLoginFormSchema,
} from "@routes/[lang]/business/web/www/login/_routes/_validation.ts";

export const GET_langBusinessWebWWWLoginResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebWWWLoginPayload): Promise<Response> => {
    
  return Response.redirect(payload.uri.toString(), 302);
}


export const POST_langBusinessWebWWWLoginResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebWWWLoginPayload, validation: IPOST_langBusinessWebWWWLoginFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebWWWLoginResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebWWWLoginPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebWWWLoginResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebWWWLoginPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
