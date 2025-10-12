
// @router/[lang]/hello/_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessPayload,
    IPOST_langBusinessPayload,
    IPUT_langBusinessPayload,
    IDELETE_langBusinessPayload,
} from "@router/[lang]/hello_payload.ts";

import {
    GET_langBusinessResponse_Success,
    POST_langBusinessResponse_Success,
    DELETE_langBusinessResponse_Success,
    PUT_langBusinessResponse_Success,
} from "@router/[lang]/hello_response.ts";

import {
    GET_langBusinessFormSchema,
    POST_langBusinessFormSchema,
    DELETE_langBusinessFormSchema,
    PUT_langBusinessFormSchema,
} from "@router/[lang]/hello_validation.ts";


export interface IGET_langBusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessPayload;
};

export const GET_langBusinessService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessService): Promise<Response> => {


    return await GET_langBusinessResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessPayload;
};


export const POST_langBusinessService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessService): Promise<Response> => {


    const validation = POST_langBusinessFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessPayload;
};

export const PUT_langBusinessService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessService): Promise<Response> => {


    return await PUT_langBusinessResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessPayload;
};

export const DELETE_langBusinessService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessService): Promise<Response> => {


    return await DELETE_langBusinessResponse_Success(req, ctx, payload);
}
