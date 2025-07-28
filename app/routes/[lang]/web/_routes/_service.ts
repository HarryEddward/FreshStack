
// @routes/[lang]/web/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langWebPayload,
    IPOST_langWebPayload,
    IPUT_langWebPayload,
    IDELETE_langWebPayload,
} from "@routes/[lang]/web/_routes/_payload.ts";

import {
    GET_langWebResponse_Success,
    POST_langWebResponse_Success,
    DELETE_langWebResponse_Success,
    PUT_langWebResponse_Success,
} from "@routes/[lang]/web/_routes/_response.ts";

import {
    GET_langWebFormSchema,
    POST_langWebFormSchema,
    DELETE_langWebFormSchema,
    PUT_langWebFormSchema,
} from "@routes/[lang]/web/_routes/_validation.ts";


export interface IGET_langWebService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langWebPayload;
};

export const GET_langWebService = async ({
    req,
    ctx,
    payload
}: IGET_langWebService): Promise<Response> => {


    return await GET_langWebResponse_Success(req, ctx, payload);
};




export interface IPOST_langWebService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langWebPayload;
};


export const POST_langWebService = async ({
    req,
    ctx,
    payload
}: IPOST_langWebService): Promise<Response> => {


    return Response.redirect(new URL(payload.selectedWebApp, req.url).toString(), 302);

    return await POST_langWebResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langWebService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langWebPayload;
};

export const PUT_langWebService = async ({
    req,
    ctx,
    payload
}: IPUT_langWebService): Promise<Response> => {


    return await PUT_langWebResponse_Success(req, ctx, payload);
};



export interface IDELETE_langWebService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langWebPayload;
};

export const DELETE_langWebService = async ({
    req,
    ctx,
    payload
}: IDELETE_langWebService): Promise<Response> => {


    return await DELETE_langWebResponse_Success(req, ctx, payload);
}
