
// @routes/api/v1/public/business/ws/_routes//_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_apiV1PublicBusinessWsPayload,
  IPOST_apiV1PublicBusinessWsPayload,
  IPUT_apiV1PublicBusinessWsPayload,
  IDELETE_apiV1PublicBusinessWsPayload,
} from "@routes/api/v1/public/business/ws/_routes/_payload.ts";

export const GET_apiV1PublicBusinessWsResponse_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_apiV1PublicBusinessWsPayload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_apiV1PublicBusinessWsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_apiV1PublicBusinessWsPayload, validation: IPOST_apiV1PublicBusinessWs_formSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_apiV1PublicBusinessWsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_apiV1PublicBusinessWsPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_apiV1PublicBusinessWsResponse_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_apiV1PublicBusinessWsPayload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
