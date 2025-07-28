
// @routes/[lang]/client/app/private/services/payment_qr/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langClientAppPaymentQrPayload,
    POST_langClientAppPaymentQrPayload,
    PUT_langClientAppPaymentQrPayload,
    DELETE_langClientAppPaymentQrPayload,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_payload.ts";

import {
    GET_langClientAppPaymentQrService,
    POST_langClientAppPaymentQrService,
    DELETE_langClientAppPaymentQrService,
    PUT_langClientAppPaymentQrService,
} from "@routes/[lang]/client/app/private/services/payment_qr/_routes/_service.ts";


export const GET_langClientAppPaymentQrController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langClientAppPaymentQrPayload(req, ctx);
        return GET_langClientAppPaymentQrService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langClientAppPaymentQrController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langClientAppPaymentQrPayload(req, ctx);
        return POST_langClientAppPaymentQrService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langClientAppPaymentQrController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langClientAppPaymentQrPayload(req, ctx);
        return PUT_langClientAppPaymentQrService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langClientAppPaymentQrController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langClientAppPaymentQrPayload(req, ctx);
        return DELETE_langClientAppPaymentQrService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};