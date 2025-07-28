
// @routes/[lang]/business/web/app/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppPayload,
    IPOST_langBusinessWebAppPayload,
    IPUT_langBusinessWebAppPayload,
    IDELETE_langBusinessWebAppPayload,
} from "@routes/[lang]/business/web/app/_routes/_payload.ts";

import {
    GET_langBusinessWebAppResponse_Success,
    POST_langBusinessWebAppResponse_Success,
    DELETE_langBusinessWebAppResponse_Success,
    PUT_langBusinessWebAppResponse_Success,
} from "@routes/[lang]/business/web/app/_routes/_response.ts";

import {
    GET_langBusinessWebAppFormSchema,
    POST_langBusinessWebAppFormSchema,
    DELETE_langBusinessWebAppFormSchema,
    PUT_langBusinessWebAppFormSchema,
} from "@routes/[lang]/business/web/app/_routes/_validation.ts";


export interface IGET_langBusinessWebAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppPayload;
};

export const GET_langBusinessWebAppService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppService): Promise<Response> => {


    return await GET_langBusinessWebAppResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppPayload;
};


export const POST_langBusinessWebAppService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppService): Promise<Response> => {


    const validation = POST_langBusinessWebAppFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppPayload;
};

export const PUT_langBusinessWebAppService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppService): Promise<Response> => {


    return await PUT_langBusinessWebAppResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppPayload;
};

export const DELETE_langBusinessWebAppService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppService): Promise<Response> => {


    return await DELETE_langBusinessWebAppResponse_Success(req, ctx, payload);
}
