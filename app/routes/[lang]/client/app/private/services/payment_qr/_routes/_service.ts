
// @routes/[lang]/client/app/private/services/payment_qr/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langClientAppPaymentQrPayload,
    IPOST_langClientAppPaymentQrPayload,
    IPUT_langClientAppPaymentQrPayload,
    IDELETE_langClientAppPaymentQrPayload,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_payload.ts";

import {
    GET_langClientAppPaymentQrResponse_Success,
    POST_langClientAppPaymentQrResponse_Success,
    DELETE_langClientAppPaymentQrResponse_Success,
    PUT_langClientAppPaymentQrResponse_Success,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_response.ts";

import {
    GET_langClientAppPaymentQrFormSchema,
    POST_langClientAppPaymentQrFormSchema,
    DELETE_langClientAppPaymentQrFormSchema,
    PUT_langClientAppPaymentQrFormSchema,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_validation.ts";


export interface IGET_langClientAppPaymentQrService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langClientAppPaymentQrPayload;
};

export const GET_langClientAppPaymentQrService = async ({
    req,
    ctx,
    payload
}: IGET_langClientAppPaymentQrService): Promise<Response> => {


    return await GET_langClientAppPaymentQrResponse_Success(req, ctx, payload);
};




export interface IPOST_langClientAppPaymentQrService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langClientAppPaymentQrPayload;
};


export const POST_langClientAppPaymentQrService = async ({
    req,
    ctx,
    payload
}: IPOST_langClientAppPaymentQrService): Promise<Response> => {


    const validation = POST_langClientAppPaymentQrFormSchema.safeParse(payload.rawData);

    return await POST_langClientAppPaymentQrResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langClientAppPaymentQrService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langClientAppPaymentQrPayload;
};

export const PUT_langClientAppPaymentQrService = async ({
    req,
    ctx,
    payload
}: IPUT_langClientAppPaymentQrService): Promise<Response> => {


    return await PUT_langClientAppPaymentQrResponse_Success(req, ctx, payload);
};



export interface IDELETE_langClientAppPaymentQrService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langClientAppPaymentQrPayload;
};

export const DELETE_langClientAppPaymentQrService = async ({
    req,
    ctx,
    payload
}: IDELETE_langClientAppPaymentQrService): Promise<Response> => {


    return await DELETE_langClientAppPaymentQrResponse_Success(req, ctx, payload);
}
