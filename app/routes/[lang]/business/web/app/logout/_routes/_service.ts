
// @routes/[lang]/business/web/app/logout/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppLogoutPayload,
    IPOST_langBusinessWebAppLogoutPayload,
    IPUT_langBusinessWebAppLogoutPayload,
    IDELETE_langBusinessWebAppLogoutPayload,
} from "@routes/[lang]/business/web/app/logout/_routes/_payload.ts";

import {
    GET_langBusinessWebAppLogoutResponse_Success,
    POST_langBusinessWebAppLogoutResponse_Success,
    DELETE_langBusinessWebAppLogoutResponse_Success,
    PUT_langBusinessWebAppLogoutResponse_Success,
} from "@routes/[lang]/business/web/app/logout/_routes/_response.ts";

import {
    GET_langBusinessWebAppLogoutFormSchema,
    POST_langBusinessWebAppLogoutFormSchema,
    DELETE_langBusinessWebAppLogoutFormSchema,
    PUT_langBusinessWebAppLogoutFormSchema,
} from "@routes/[lang]/business/web/app/logout/_routes/_validation.ts";


export interface IGET_langBusinessWebAppLogoutService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppLogoutPayload;
};

export const GET_langBusinessWebAppLogoutService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppLogoutService): Promise<Response> => {


    return await GET_langBusinessWebAppLogoutResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppLogoutService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppLogoutPayload;
};


export const POST_langBusinessWebAppLogoutService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppLogoutService): Promise<Response> => {


    const validation = POST_langBusinessWebAppLogoutFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppLogoutResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppLogoutService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppLogoutPayload;
};

export const PUT_langBusinessWebAppLogoutService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppLogoutService): Promise<Response> => {


    return await PUT_langBusinessWebAppLogoutResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppLogoutService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppLogoutPayload;
};

export const DELETE_langBusinessWebAppLogoutService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppLogoutService): Promise<Response> => {


    return await DELETE_langBusinessWebAppLogoutResponse_Success(req, ctx, payload);
}
