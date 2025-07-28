
// @routes/[lang]/business/web/www/login/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebWWWLoginPayload,
    POST_langBusinessWebWWWLoginPayload,
    PUT_langBusinessWebWWWLoginPayload,
    DELETE_langBusinessWebWWWLoginPayload,
} from "@routes/[lang]/business/web/www/login/_routes/_payload.ts";

import {
    GET_langBusinessWebWWWLoginService,
    POST_langBusinessWebWWWLoginService,
    DELETE_langBusinessWebWWWLoginService,
    PUT_langBusinessWebWWWLoginService,
} from "@routes/[lang]/business/web/www/login/_routes/_service.ts";


export const GET_langBusinessWebWWWLoginController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebWWWLoginPayload(req, ctx);
        return GET_langBusinessWebWWWLoginService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebWWWLoginController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebWWWLoginPayload(req, ctx);
        return POST_langBusinessWebWWWLoginService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebWWWLoginController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebWWWLoginPayload(req, ctx);
        return PUT_langBusinessWebWWWLoginService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebWWWLoginController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebWWWLoginPayload(req, ctx);
        return DELETE_langBusinessWebWWWLoginService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};