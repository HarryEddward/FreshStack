export const _response: string = `
// <%= componentPathRouter %>/_response.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
  IGET_<%= componentName %>Payload,
  IPOST_<%= componentName %>Payload,
  IPUT_<%= componentName %>Payload,
  IDELETE_<%= componentName %>Payload,
} from "<%= componentPathRouter %>_payload.ts";

import {
  IPOST_<%= componentName %>FormSchema,
} from "<%= componentPathRouter %>_validation.ts";

export const GET_<%= componentName %>Response_Success = (req: Request, ctx: FreshContext<State>, payload: IGET_<%= componentName %>Payload): Promise<Response> => {
    
  return Promise.resolve(
    ctx.render(payload)
  );

}


export const POST_<%= componentName %>Response_Success = async (req: Request, ctx: FreshContext<State>, payload: IPOST_<%= componentName %>Payload, validation: IPOST_<%= componentName %>FormSchema): Promise<Response> => {
    
    
    return new Response("Everything Ok", {
      status: 200,
    });

};


export const PUT_<%= componentName %>Response_Success = async (req: Request, ctx: FreshContext<State>, payload: IPUT_<%= componentName %>Payload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};


export const DELETE_<%= componentName %>Response_Success = async (req: Request, ctx: FreshContext<State>, payload: IDELETE_<%= componentName %>Payload): Promise<Response> => {
    
    
  return new Response("Everything Ok", {
    status: 200,
  });
    
};
`;