
// @routes/[lang]/client/[step_before]/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langClient_step_beforePayload,
    POST_langClient_step_beforePayload,
    PUT_langClient_step_beforePayload,
    DELETE_langClient_step_beforePayload,
} from "@routes/[lang]/client/[step_before]/_routes/_payload.ts";

import {
    GET_langClient_step_beforeService,
    POST_langClient_step_beforeService,
    DELETE_langClient_step_beforeService,
    PUT_langClient_step_beforeService,
} from "@routes/[lang]/client/[step_before]/_routes/_service.ts";


export const GET_langClient_step_beforeController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langClient_step_beforePayload(req, ctx);
        return GET_langClient_step_beforeService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langClient_step_beforeController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langClient_step_beforePayload(req, ctx);
        return POST_langClient_step_beforeService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langClient_step_beforeController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langClient_step_beforePayload(req, ctx);
        return PUT_langClient_step_beforeService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langClient_step_beforeController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langClient_step_beforePayload(req, ctx);
        return DELETE_langClient_step_beforeService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};