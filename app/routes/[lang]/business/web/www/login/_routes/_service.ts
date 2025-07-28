
// @routes/[lang]/business/web/www/login/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebWWWLoginPayload,
    IPOST_langBusinessWebWWWLoginPayload,
    IPUT_langBusinessWebWWWLoginPayload,
    IDELETE_langBusinessWebWWWLoginPayload,
} from "@routes/[lang]/business/web/www/login/_routes/_payload.ts";

import {
    GET_langBusinessWebWWWLoginResponse_Success,
    POST_langBusinessWebWWWLoginResponse_Success,
    DELETE_langBusinessWebWWWLoginResponse_Success,
    PUT_langBusinessWebWWWLoginResponse_Success,
} from "@routes/[lang]/business/web/www/login/_routes/_response.ts";

import {
    GET_langBusinessWebWWWLoginFormSchema,
    POST_langBusinessWebWWWLoginFormSchema,
    DELETE_langBusinessWebWWWLoginFormSchema,
    PUT_langBusinessWebWWWLoginFormSchema,
} from "@routes/[lang]/business/web/www/login/_routes/_validation.ts";


export interface IGET_langBusinessWebWWWLoginService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebWWWLoginPayload;
};

export const GET_langBusinessWebWWWLoginService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebWWWLoginService): Promise<Response> => {


    return await GET_langBusinessWebWWWLoginResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebWWWLoginService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebWWWLoginPayload;
};


export const POST_langBusinessWebWWWLoginService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebWWWLoginService): Promise<Response> => {


    const validation = POST_langBusinessWebWWWLoginFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebWWWLoginResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebWWWLoginService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebWWWLoginPayload;
};

export const PUT_langBusinessWebWWWLoginService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebWWWLoginService): Promise<Response> => {


    return await PUT_langBusinessWebWWWLoginResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebWWWLoginService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebWWWLoginPayload;
};

export const DELETE_langBusinessWebWWWLoginService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebWWWLoginService): Promise<Response> => {


    return await DELETE_langBusinessWebWWWLoginResponse_Success(req, ctx, payload);
}
