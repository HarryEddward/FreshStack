
// @routes/[lang]/[license]/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_lang_licensePayload,
  IPOST_lang_licensePayload,
  IPUT_lang_licensePayload,
  IDELETE_lang_licensePayload,
} from "@routes/[lang]/[license]/_routes/_payload.ts";

import {
  IPOST_lang_licenseFormSchema,
} from "@routes/[lang]/[license]/_routes/_validation.ts";

export const GET_lang_licenseResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_lang_licensePayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_lang_licenseResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_lang_licensePayload, validation: IPOST_lang_licenseFormSchema): Promise<Response> => {
    
    const finalPath = payload.urlTypeWeb ? payload.urlTypeWeb : payload.urlTypeApp;

    if (payload.isWeb) {

      return new Response(null, {
          status: 303, // o 302, 307
          headers: {
            Location: payload.urlTypeWeb || "/business/web/www",
          },
      });

    }
    
    if (payload.isApp) {

      return new Response(null, {
          status: 303, // o 302, 307
          headers: {
            Location: payload.urlTypeApp ||  "/client/app/private/step_before",
          },
      });

    }

    return new Response(null, {
        status: 303, // o 302, 307
        headers: {
          Location: finalPath || "/",
        },
    });

};


export const PUT_lang_licenseResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_lang_licensePayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_lang_licenseResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_lang_licensePayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
