
// @routes/[lang]/client/app/private/services/transaction/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langClientAppTransactionPayload,
  IPOST_langClientAppTransactionPayload,
  IPUT_langClientAppTransactionPayload,
  IDELETE_langClientAppTransactionPayload,
} from "@routes/[lang]/client/app/private/services/transaction/_routes/_payload.ts";

export const GET_langClientAppTransactionResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langClientAppTransactionPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langClientAppTransactionResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langClientAppTransactionPayload, validation: IPOST_langClientAppTransaction_formSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langClientAppTransactionResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langClientAppTransactionPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langClientAppTransactionResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langClientAppTransactionPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
