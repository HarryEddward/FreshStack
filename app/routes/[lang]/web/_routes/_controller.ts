
// @routes/[lang]/web/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langWebPayload,
    POST_langWebPayload,
    PUT_langWebPayload,
    DELETE_langWebPayload,
} from "@routes/[lang]/web/_routes/_payload.ts";

import {
    GET_langWebService,
    POST_langWebService,
    DELETE_langWebService,
    PUT_langWebService,
} from "@routes/[lang]/web/_routes/_service.ts";


export const GET_langWebController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langWebPayload(req, ctx);
        return GET_langWebService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langWebController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langWebPayload(req, ctx);
        return POST_langWebService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langWebController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langWebPayload(req, ctx);
        return PUT_langWebService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langWebController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langWebPayload(req, ctx);
        return DELETE_langWebService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};