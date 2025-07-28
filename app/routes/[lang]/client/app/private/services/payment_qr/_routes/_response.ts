
// @routes/[lang]/client/app/private/services/payment_qr/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langClientAppPaymentQrPayload,
  IPOST_langClientAppPaymentQrPayload,
  IPUT_langClientAppPaymentQrPayload,
  IDELETE_langClientAppPaymentQrPayload,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_payload.ts";

import {
  IPOST_langClientAppPaymentQrFormSchema,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_validation.ts";

export const GET_langClientAppPaymentQrResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langClientAppPaymentQrPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langClientAppPaymentQrResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langClientAppPaymentQrPayload, validation: IPOST_langClientAppPaymentQrFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langClientAppPaymentQrResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langClientAppPaymentQrPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langClientAppPaymentQrResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langClientAppPaymentQrPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
