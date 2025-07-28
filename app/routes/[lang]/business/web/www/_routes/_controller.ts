
// @routes/[lang]/business/web/www/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebWWWPayload,
    POST_langBusinessWebWWWPayload,
    PUT_langBusinessWebWWWPayload,
    DELETE_langBusinessWebWWWPayload,
} from "@routes/[lang]/business/web/www/_routes/_payload.ts";

import {
    GET_langBusinessWebWWWService,
    POST_langBusinessWebWWWService,
    DELETE_langBusinessWebWWWService,
    PUT_langBusinessWebWWWService,
} from "@routes/[lang]/business/web/www/_routes/_service.ts";


export const GET_langBusinessWebWWWController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebWWWPayload(req, ctx);
        return GET_langBusinessWebWWWService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebWWWController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebWWWPayload(req, ctx);
        return POST_langBusinessWebWWWService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebWWWController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebWWWPayload(req, ctx);
        return PUT_langBusinessWebWWWService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebWWWController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebWWWPayload(req, ctx);
        return DELETE_langBusinessWebWWWService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};