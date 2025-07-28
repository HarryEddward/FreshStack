
// @routes/[lang]/business/web/www/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebWWWPayload,
    IPOST_langBusinessWebWWWPayload,
    IPUT_langBusinessWebWWWPayload,
    IDELETE_langBusinessWebWWWPayload,
} from "@routes/[lang]/business/web/www/_routes/_payload.ts";

import {
    GET_langBusinessWebWWWResponse_Success,
    POST_langBusinessWebWWWResponse_Success,
    DELETE_langBusinessWebWWWResponse_Success,
    PUT_langBusinessWebWWWResponse_Success,
} from "@routes/[lang]/business/web/www/_routes/_response.ts";

import {
    GET_langBusinessWebWWWFormSchema,
    POST_langBusinessWebWWWFormSchema,
    DELETE_langBusinessWebWWWFormSchema,
    PUT_langBusinessWebWWWFormSchema,
} from "@routes/[lang]/business/web/www/_routes/_validation.ts";


export interface IGET_langBusinessWebWWWService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebWWWPayload;
};

export const GET_langBusinessWebWWWService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebWWWService): Promise<Response> => {


    return await GET_langBusinessWebWWWResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebWWWService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebWWWPayload;
};


export const POST_langBusinessWebWWWService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebWWWService): Promise<Response> => {


    const validation = POST_langBusinessWebWWWFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebWWWResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebWWWService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebWWWPayload;
};

export const PUT_langBusinessWebWWWService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebWWWService): Promise<Response> => {


    return await PUT_langBusinessWebWWWResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebWWWService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebWWWPayload;
};

export const DELETE_langBusinessWebWWWService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebWWWService): Promise<Response> => {


    return await DELETE_langBusinessWebWWWResponse_Success(req, ctx, payload);
}
