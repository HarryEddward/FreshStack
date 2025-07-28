
// @routes/[lang]/business/web/app/multibusiness/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppMultibusinessPayload,
    IPOST_langBusinessWebAppMultibusinessPayload,
    IPUT_langBusinessWebAppMultibusinessPayload,
    IDELETE_langBusinessWebAppMultibusinessPayload,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_payload.ts";

import {
    GET_langBusinessWebAppMultibusinessResponse_Success,
    POST_langBusinessWebAppMultibusinessResponse_Success,
    DELETE_langBusinessWebAppMultibusinessResponse_Success,
    PUT_langBusinessWebAppMultibusinessResponse_Success,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_response.ts";

import {
    GET_langBusinessWebAppMultibusinessFormSchema,
    POST_langBusinessWebAppMultibusinessFormSchema,
    DELETE_langBusinessWebAppMultibusinessFormSchema,
    PUT_langBusinessWebAppMultibusinessFormSchema,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_validation.ts";


export interface IGET_langBusinessWebAppMultibusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppMultibusinessPayload;
};

export const GET_langBusinessWebAppMultibusinessService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppMultibusinessService): Promise<Response> => {


    return await GET_langBusinessWebAppMultibusinessResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppMultibusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppMultibusinessPayload;
};


export const POST_langBusinessWebAppMultibusinessService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppMultibusinessService): Promise<Response> => {


    const validation = POST_langBusinessWebAppMultibusinessFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppMultibusinessResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppMultibusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppMultibusinessPayload;
};

export const PUT_langBusinessWebAppMultibusinessService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppMultibusinessService): Promise<Response> => {


    return await PUT_langBusinessWebAppMultibusinessResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppMultibusinessService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppMultibusinessPayload;
};

export const DELETE_langBusinessWebAppMultibusinessService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppMultibusinessService): Promise<Response> => {


    return await DELETE_langBusinessWebAppMultibusinessResponse_Success(req, ctx, payload);
}
