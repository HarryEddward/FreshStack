
// @routes/[lang]/business/web/app/analitics/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppAnaliticsPayload,
    IPOST_langBusinessWebAppAnaliticsPayload,
    IPUT_langBusinessWebAppAnaliticsPayload,
    IDELETE_langBusinessWebAppAnaliticsPayload,
} from "@routes/[lang]/business/web/app/analitics/_routes/_payload.ts";

import {
    GET_langBusinessWebAppAnaliticsResponse_Success,
    POST_langBusinessWebAppAnaliticsResponse_Success,
    DELETE_langBusinessWebAppAnaliticsResponse_Success,
    PUT_langBusinessWebAppAnaliticsResponse_Success,
} from "@routes/[lang]/business/web/app/analitics/_routes/_response.ts";

import {
    GET_langBusinessWebAppAnaliticsFormSchema,
    POST_langBusinessWebAppAnaliticsFormSchema,
    DELETE_langBusinessWebAppAnaliticsFormSchema,
    PUT_langBusinessWebAppAnaliticsFormSchema,
} from "@routes/[lang]/business/web/app/analitics/_routes/_validation.ts";


export interface IGET_langBusinessWebAppAnaliticsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppAnaliticsPayload;
};

export const GET_langBusinessWebAppAnaliticsService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppAnaliticsService): Promise<Response> => {


    return await GET_langBusinessWebAppAnaliticsResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppAnaliticsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppAnaliticsPayload;
};


export const POST_langBusinessWebAppAnaliticsService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppAnaliticsService): Promise<Response> => {


    const validation = POST_langBusinessWebAppAnaliticsFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppAnaliticsResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppAnaliticsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppAnaliticsPayload;
};

export const PUT_langBusinessWebAppAnaliticsService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppAnaliticsService): Promise<Response> => {


    return await PUT_langBusinessWebAppAnaliticsResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppAnaliticsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppAnaliticsPayload;
};

export const DELETE_langBusinessWebAppAnaliticsService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppAnaliticsService): Promise<Response> => {


    return await DELETE_langBusinessWebAppAnaliticsResponse_Success(req, ctx, payload);
}
