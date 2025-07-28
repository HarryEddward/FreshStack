
// @routes/[lang]/business/app/[license]/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessApp_licensePayload,
  IPOST_langBusinessApp_licensePayload,
  IPUT_langBusinessApp_licensePayload,
  IDELETE_langBusinessApp_licensePayload,
} from "@routes/[lang]/business/app/[license]/_routes/_payload.ts";

import {
  IPOST_langBusinessApp_licenseFormSchema,
} from "@routes/[lang]/business/app/[license]/_routes/_validation.ts";

export const GET_langBusinessApp_licenseResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessApp_licensePayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_langBusinessApp_licenseResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessApp_licensePayload, validation: IPOST_langBusinessApp_licenseFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessApp_licenseResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessApp_licensePayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessApp_licenseResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessApp_licensePayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
