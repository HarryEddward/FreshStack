
// @routes/[lang]/client/[step_before]/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langClient_step_beforePayload,
    IPOST_langClient_step_beforePayload,
    IPUT_langClient_step_beforePayload,
    IDELETE_langClient_step_beforePayload,
} from "@routes/[lang]/client/[step_before]/_routes/_payload.ts";

import {
    GET_langClient_step_beforeResponse_Success,
    POST_langClient_step_beforeResponse_Success,
    DELETE_langClient_step_beforeResponse_Success,
    PUT_langClient_step_beforeResponse_Success,
} from "@routes/[lang]/client/[step_before]/_routes/_response.ts";

import {
    GET_langClient_step_beforeFormSchema,
    POST_langClient_step_beforeFormSchema,
    DELETE_langClient_step_beforeFormSchema,
    PUT_langClient_step_beforeFormSchema,
} from "@routes/[lang]/client/[step_before]/_routes/_validation.ts";


export interface IGET_langClient_step_beforeService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langClient_step_beforePayload;
};

export const GET_langClient_step_beforeService = async ({
    req,
    ctx,
    payload
}: IGET_langClient_step_beforeService): Promise<Response> => {


    return await GET_langClient_step_beforeResponse_Success(req, ctx, payload);
};




export interface IPOST_langClient_step_beforeService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langClient_step_beforePayload;
};


export const POST_langClient_step_beforeService = async ({
    req,
    ctx,
    payload
}: IPOST_langClient_step_beforeService): Promise<Response> => {


    const validation = POST_langClient_step_beforeFormSchema.safeParse(payload.rawData);

    return await POST_langClient_step_beforeResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langClient_step_beforeService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langClient_step_beforePayload;
};

export const PUT_langClient_step_beforeService = async ({
    req,
    ctx,
    payload
}: IPUT_langClient_step_beforeService): Promise<Response> => {


    return await PUT_langClient_step_beforeResponse_Success(req, ctx, payload);
};



export interface IDELETE_langClient_step_beforeService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langClient_step_beforePayload;
};

export const DELETE_langClient_step_beforeService = async ({
    req,
    ctx,
    payload
}: IDELETE_langClient_step_beforeService): Promise<Response> => {


    return await DELETE_langClient_step_beforeResponse_Success(req, ctx, payload);
}
