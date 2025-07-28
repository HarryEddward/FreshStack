
// @routes/[lang]/client/app/private/services/payment/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langClientAppPaymentPayload,
  IPOST_langClientAppPaymentPayload,
  IPUT_langClientAppPaymentPayload,
  IDELETE_langClientAppPaymentPayload,
} from "@routes/[lang]/client/app/private/services/payment/_routes/_payload.ts";





export const GET_langClientAppPaymentResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langClientAppPaymentPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langClientAppPaymentResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langClientAppPaymentPayload, validation: IPOST_langClientAppPayment_formSchema): Promise<Response> => {
    
  
  payload.url.pathname = `/${payload.actualLang}/client/app/transaction`;

  return Response.redirect(payload.url.toString(), 303);

};

export function fieldErrorResponse(paramError: string, actualLang: string = "ca-mall"): Response {
    
    const params = new URLSearchParams({
      [paramError]: "true"
    });

    console.log(params);

    return new Response(null, {
      status: 303,
      headers: { Location: `/${actualLang}/client/app/private/services/payment?${params}` },
    });

}



export const PUT_langClientAppPaymentResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langClientAppPaymentPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langClientAppPaymentResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langClientAppPaymentPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
