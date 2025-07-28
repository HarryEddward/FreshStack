
// @routes/[lang]/business/web/app/analitics/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppAnaliticsPayload,
  IPOST_langBusinessWebAppAnaliticsPayload,
  IPUT_langBusinessWebAppAnaliticsPayload,
  IDELETE_langBusinessWebAppAnaliticsPayload,
} from "@routes/[lang]/business/web/app/analitics/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppAnaliticsFormSchema,
} from "@routes/[lang]/business/web/app/analitics/_routes/_validation.ts";

export const GET_langBusinessWebAppAnaliticsResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppAnaliticsPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppAnaliticsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppAnaliticsPayload, validation: IPOST_langBusinessWebAppAnaliticsFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppAnaliticsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppAnaliticsPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppAnaliticsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppAnaliticsPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
