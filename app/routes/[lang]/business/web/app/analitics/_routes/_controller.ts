
// @routes/[lang]/business/web/app/analitics/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppAnaliticsPayload,
    POST_langBusinessWebAppAnaliticsPayload,
    PUT_langBusinessWebAppAnaliticsPayload,
    DELETE_langBusinessWebAppAnaliticsPayload,
} from "@routes/[lang]/business/web/app/analitics/_routes/_payload.ts";

import {
    GET_langBusinessWebAppAnaliticsService,
    POST_langBusinessWebAppAnaliticsService,
    DELETE_langBusinessWebAppAnaliticsService,
    PUT_langBusinessWebAppAnaliticsService,
} from "@routes/[lang]/business/web/app/analitics/_routes/_service.ts";


export const GET_langBusinessWebAppAnaliticsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppAnaliticsPayload(req, ctx);
        return GET_langBusinessWebAppAnaliticsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppAnaliticsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppAnaliticsPayload(req, ctx);
        return POST_langBusinessWebAppAnaliticsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppAnaliticsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppAnaliticsPayload(req, ctx);
        return PUT_langBusinessWebAppAnaliticsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppAnaliticsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppAnaliticsPayload(req, ctx);
        return DELETE_langBusinessWebAppAnaliticsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};