
// @routes/[lang]/app/_routes/_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langAppPayload,
    IPOST_langAppPayload,
    IPUT_langAppPayload,
    IDELETE_langAppPayload,
} from "@routes/[lang]/app/_routes/_payload.ts";

import {
    GET_langAppResponse_Success,
    POST_langAppResponse_Success,
    DELETE_langAppResponse_Success,
    PUT_langAppResponse_Success,
} from "@routes/[lang]/app/_routes/_response.ts";

import {
    GET_langAppFormSchema,
    POST_langAppFormSchema,
    DELETE_langAppFormSchema,
    PUT_langAppFormSchema,
} from "@routes/[lang]/app/_routes/_validation.ts";


export interface IGET_langAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langAppPayload;
};

export const GET_langAppService = async ({
    req,
    ctx,
    payload
}: IGET_langAppService): Promise<Response> => {


    return await GET_langAppResponse_Success(req, ctx, payload);
};




export interface IPOST_langAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langAppPayload;
};


export const POST_langAppService = async ({
    req,
    ctx,
    payload
}: IPOST_langAppService): Promise<Response> => {


    //const validation = POST_langAppFormSchema.safeParse(payload.rawData);

    return Response.redirect(new URL(payload.selectedMobileApp, req.url).toString(), 302);

    return await POST_langAppResponse_Success(req, ctx, payload, /*validation*/);

};



export interface IPUT_langAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langAppPayload;
};

export const PUT_langAppService = async ({
    req,
    ctx,
    payload
}: IPUT_langAppService): Promise<Response> => {


    return await PUT_langAppResponse_Success(req, ctx, payload);
};



export interface IDELETE_langAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langAppPayload;
};

export const DELETE_langAppService = async ({
    req,
    ctx,
    payload
}: IDELETE_langAppService): Promise<Response> => {


    return await DELETE_langAppResponse_Success(req, ctx, payload);
}
