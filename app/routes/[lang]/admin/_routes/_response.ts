
// @routes/[lang]/admin/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langAdminPayload,
  IPOST_langAdminPayload,
  IPUT_langAdminPayload,
  IDELETE_langAdminPayload,
} from "@routes/[lang]/admin/_routes/_payload.ts";

import {
  IPOST_langAdminFormSchema,
} from "@routes/[lang]/admin/_routes/_validation.ts";

export const GET_langAdminResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langAdminPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langAdminResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langAdminPayload, validation: IPOST_langAdminFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langAdminResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langAdminPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langAdminResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langAdminPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
