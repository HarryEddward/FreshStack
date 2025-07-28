
// @routes/[lang]/client/app/private/services/payment/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langClientAppPaymentPayload,
    POST_langClientAppPaymentPayload,
    PUT_langClientAppPaymentPayload,
    DELETE_langClientAppPaymentPayload,
} from "@routes/[lang]/client/app/private/services/payment/_routes/_payload.ts";

import {
    GET_langClientAppPaymentService,
    POST_langClientAppPaymentService,
    DELETE_langClientAppPaymentService,
    PUT_langClientAppPaymentService,
} from "@routes/[lang]/client/app/private/services/payment/_routes/_service.ts";


export const GET_langClientAppPaymentController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langClientAppPaymentPayload(req, ctx);
        return GET_langClientAppPaymentService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langClientAppPaymentController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langClientAppPaymentPayload(req, ctx);
        return POST_langClientAppPaymentService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langClientAppPaymentController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langClientAppPaymentPayload(req, ctx);
        return PUT_langClientAppPaymentService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langClientAppPaymentController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langClientAppPaymentPayload(req, ctx);
        return DELETE_langClientAppPaymentService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};