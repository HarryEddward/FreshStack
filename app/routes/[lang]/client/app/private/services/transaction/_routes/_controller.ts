
// @routes/[lang]/client/app/private/services/transaction/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langClientAppTransactionPayload,
    POST_langClientAppTransactionPayload,
    PUT_langClientAppTransactionPayload,
    DELETE_langClientAppTransactionPayload,
} from "@routes/[lang]/client/app/private/services/transaction/_routes/_payload.ts";

import {
    GET_langClientAppTransactionService,
    POST_langClientAppTransactionService,
    DELETE_langClientAppTransactionService,
    PUT_langClientAppTransactionService,
} from "@routes/[lang]/client/app/private/services/transaction/_routes/_service.ts";


export const GET_langClientAppTransactionController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langClientAppTransactionPayload(req, ctx);
        return GET_langClientAppTransactionService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langClientAppTransactionController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langClientAppTransactionPayload(req, ctx);
        return POST_langClientAppTransactionService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langClientAppTransactionController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langClientAppTransactionPayload(req, ctx);
        return PUT_langClientAppTransactionService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langClientAppTransactionController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langClientAppTransactionPayload(req, ctx);
        return DELETE_langClientAppTransactionService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};