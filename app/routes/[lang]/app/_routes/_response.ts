
// @routes/[lang]/app/_routes/_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langAppPayload,
  IPOST_langAppPayload,
  IPUT_langAppPayload,
  IDELETE_langAppPayload,
} from "@routes/[lang]/app/_routes/_payload.ts";

import {
  IPOST_langAppFormSchema,
} from "@routes/[lang]/app/_routes/_validation.ts";

export const GET_langAppResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langAppPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langAppPayload, /*validation: IPOST_langAppFormSchema*/): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langAppPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langAppPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
