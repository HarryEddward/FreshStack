
// @routes/[lang]/business/web/app/multibusiness/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppMultibusinessPayload,
  IPOST_langBusinessWebAppMultibusinessPayload,
  IPUT_langBusinessWebAppMultibusinessPayload,
  IDELETE_langBusinessWebAppMultibusinessPayload,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppMultibusinessFormSchema,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_validation.ts";

export const GET_langBusinessWebAppMultibusinessResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppMultibusinessPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppMultibusinessResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppMultibusinessPayload, validation: IPOST_langBusinessWebAppMultibusinessFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppMultibusinessResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppMultibusinessPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppMultibusinessResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppMultibusinessPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
