
// @router/[lang]/hello/_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessPayload,
  IPOST_langBusinessPayload,
  IPUT_langBusinessPayload,
  IDELETE_langBusinessPayload,
} from "@router/[lang]/hello_payload.ts";

export const GET_langBusinessResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessPayload, validation: IPOST_langBusiness_formSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
