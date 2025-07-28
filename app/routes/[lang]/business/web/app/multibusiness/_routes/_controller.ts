
// @routes/[lang]/business/web/app/multibusiness/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppMultibusinessPayload,
    POST_langBusinessWebAppMultibusinessPayload,
    PUT_langBusinessWebAppMultibusinessPayload,
    DELETE_langBusinessWebAppMultibusinessPayload,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_payload.ts";

import {
    GET_langBusinessWebAppMultibusinessService,
    POST_langBusinessWebAppMultibusinessService,
    DELETE_langBusinessWebAppMultibusinessService,
    PUT_langBusinessWebAppMultibusinessService,
} from "@routes/[lang]/business/web/app/multibusiness/_routes/_service.ts";


export const GET_langBusinessWebAppMultibusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppMultibusinessPayload(req, ctx);
        return GET_langBusinessWebAppMultibusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppMultibusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppMultibusinessPayload(req, ctx);
        return POST_langBusinessWebAppMultibusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppMultibusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppMultibusinessPayload(req, ctx);
        return PUT_langBusinessWebAppMultibusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppMultibusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppMultibusinessPayload(req, ctx);
        return DELETE_langBusinessWebAppMultibusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};