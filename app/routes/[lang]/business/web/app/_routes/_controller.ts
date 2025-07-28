
// @routes/[lang]/business/web/app/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppPayload,
    POST_langBusinessWebAppPayload,
    PUT_langBusinessWebAppPayload,
    DELETE_langBusinessWebAppPayload,
} from "@routes/[lang]/business/web/app/_routes/_payload.ts";

import {
    GET_langBusinessWebAppService,
    POST_langBusinessWebAppService,
    DELETE_langBusinessWebAppService,
    PUT_langBusinessWebAppService,
} from "@routes/[lang]/business/web/app/_routes/_service.ts";


export const GET_langBusinessWebAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppPayload(req, ctx);
        return GET_langBusinessWebAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppPayload(req, ctx);
        return POST_langBusinessWebAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppPayload(req, ctx);
        return PUT_langBusinessWebAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppPayload(req, ctx);
        return DELETE_langBusinessWebAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};