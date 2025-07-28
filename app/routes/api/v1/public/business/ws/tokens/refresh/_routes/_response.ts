// @routes/api/v1/public/business/ws/tokens/refresh/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_apiV1PublicBusinessWsTokensRefreshPayload,
  IPOST_apiV1PublicBusinessWsTokensRefreshPayload,
  IPUT_apiV1PublicBusinessWsTokensRefreshPayload,
  IDELETE_apiV1PublicBusinessWsTokensRefreshPayload,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_payload.ts";

import { getCookies } from 'https://deno.land/std/http/cookie.ts';

import { sessionApiManager, sessionWsApiManager } from '@utils/api/cookieProcessor.ts';
import {
  IPOST_apiV1PublicBusinessWsTokensRefreshFormSchema,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_validation.ts";

export const GET_apiV1PublicBusinessWsTokensRefreshResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IGET_apiV1PublicBusinessWsTokensRefreshPayload): Promise<Response> => {
    
  return new Response("Ok", {
    status: 200,
  });

}


export const POST_apiV1PublicBusinessWsTokensRefreshResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_apiV1PublicBusinessWsTokensRefreshPayload/*, validation: IPOST_apiV1PublicBusinessWsTokensRefreshFormSchema*/): Promise<Response> => {
    
  console.log(getCookies(req.headers));
  const sessionHttpContext = await sessionApiManager.getSession(req);
  const sessionWsContext = await sessionWsApiManager.getSession(req);
  console.log("Coookies");

  console.log(await sessionHttpContext.store.getAll());
  const allWsCookies = await sessionWsContext.store.getAll();
  console.log(allWsCookies);
  const access_token = await sessionWsContext.store.get("access_token");

  const data = { mensaje: access_token };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

};


export const PUT_apiV1PublicBusinessWsTokensRefreshResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_apiV1PublicBusinessWsTokensRefreshPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_apiV1PublicBusinessWsTokensRefreshResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_apiV1PublicBusinessWsTokensRefreshPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
