
// @routes/[lang]/business/web/app/logout/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_langBusinessWebAppLogoutPayload,
  IPOST_langBusinessWebAppLogoutPayload,
  IPUT_langBusinessWebAppLogoutPayload,
  IDELETE_langBusinessWebAppLogoutPayload,
} from "@routes/[lang]/business/web/app/logout/_routes/_payload.ts";

import {
  IPOST_langBusinessWebAppLogoutFormSchema,
} from "@routes/[lang]/business/web/app/logout/_routes/_validation.ts";

export const GET_langBusinessWebAppLogoutResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IGET_langBusinessWebAppLogoutPayload): Promise<Response> => {
    
  return new Response(null, {
    status: 302, // O 303 según tu caso
    headers: {
      Location: `/${payload.actualLang}/business/web/www`, // Aquí la ruta a la que quieres redirigir
    },
  });


}


export const POST_langBusinessWebAppLogoutResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_langBusinessWebAppLogoutPayload, validation: IPOST_langBusinessWebAppLogoutFormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_langBusinessWebAppLogoutResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_langBusinessWebAppLogoutPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_langBusinessWebAppLogoutResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_langBusinessWebAppLogoutPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
