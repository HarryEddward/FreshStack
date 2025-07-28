
// @routes/[lang]/app/_routes/_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langAppPayload,
    POST_langAppPayload,
    PUT_langAppPayload,
    DELETE_langAppPayload,
} from "@routes/[lang]/app/_routes/_payload.ts";

import {
    GET_langAppService,
    POST_langAppService,
    DELETE_langAppService,
    PUT_langAppService,
} from "@routes/[lang]/app/_routes/_service.ts";


export const GET_langAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langAppPayload(req, ctx);
        return GET_langAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langAppPayload(req, ctx);
        return POST_langAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langAppPayload(req, ctx);
        return PUT_langAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langAppPayload(req, ctx);
        return DELETE_langAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};