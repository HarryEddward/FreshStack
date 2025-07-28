
// @routes/[lang]/business/web/app/users/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppUsersPayload,
  IPOST_langBusinessWebAppUsersPayload,
  IPUT_langBusinessWebAppUsersPayload,
  IDELETE_langBusinessWebAppUsersPayload,
} from "@routes/[lang]/business/web/app/users/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppUsersFormSchema,
} from "@routes/[lang]/business/web/app/users/_routes/_validation.ts";

export const GET_langBusinessWebAppUsersResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppUsersPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessWebAppUsersResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppUsersPayload, validation: IPOST_langBusinessWebAppUsersFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppUsersResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppUsersPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppUsersResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppUsersPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
