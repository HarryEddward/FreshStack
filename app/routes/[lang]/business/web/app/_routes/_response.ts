
// @routes/[lang]/business/web/app/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppPayload,
  IPOST_langBusinessWebAppPayload,
  IPUT_langBusinessWebAppPayload,
  IDELETE_langBusinessWebAppPayload,
} from "@routes/[lang]/business/web/app/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppFormSchema,
} from "@routes/[lang]/business/web/app/_routes/_validation.ts";

export const GET_langBusinessWebAppResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppPayload, validation: IPOST_langBusinessWebAppFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
