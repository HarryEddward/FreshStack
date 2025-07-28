export const _service: string = `
// <%= componentPathRouter %>/_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_<%= componentName %>Payload,
    IPOST_<%= componentName %>Payload,
    IPUT_<%= componentName %>Payload,
    IDELETE_<%= componentName %>Payload,
} from "<%= componentPathRouter %>_payload.ts";

import {
    GET_<%= componentName %>Response_Success,
    POST_<%= componentName %>Response_Success,
    DELETE_<%= componentName %>Response_Success,
    PUT_<%= componentName %>Response_Success,
} from "<%= componentPathRouter %>_response.ts";

import {
    GET_<%= componentName %>FormSchema,
    POST_<%= componentName %>FormSchema,
    DELETE_<%= componentName %>FormSchema,
    PUT_<%= componentName %>FormSchema,
} from "<%= componentPathRouter %>_validation.ts";


export interface IGET_<%= componentName %>Service {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_<%= componentName %>Payload;
};

export const GET_<%= componentName %>Service = async ({
    req,
    ctx,
    payload
}: IGET_<%= componentName %>Service): Promise<Response> => {


    return await GET_<%= componentName %>Response_Success(req, ctx, payload);
};




export interface IPOST_<%= componentName %>Service {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_<%= componentName %>Payload;
};


export const POST_<%= componentName %>Service = async ({
    req,
    ctx,
    payload
}: IPOST_<%= componentName %>Service): Promise<Response> => {


    const validation = POST_<%= componentName %>FormSchema.safeParse(payload.rawData);

    return await POST_<%= componentName %>Response_Success(req, ctx, payload, validation);

};



export interface IPUT_<%= componentName %>Service {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_<%= componentName %>Payload;
};

export const PUT_<%= componentName %>Service = async ({
    req,
    ctx,
    payload
}: IPUT_<%= componentName %>Service): Promise<Response> => {


    return await PUT_<%= componentName %>Response_Success(req, ctx, payload);
};



export interface IDELETE_<%= componentName %>Service {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_<%= componentName %>Payload;
};

export const DELETE_<%= componentName %>Service = async ({
    req,
    ctx,
    payload
}: IDELETE_<%= componentName %>Service): Promise<Response> => {


    return await DELETE_<%= componentName %>Response_Success(req, ctx, payload);
}
`;