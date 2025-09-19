
// @routes/[lang]/business/web/app/logout/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppLogoutPayload,
    POST_langBusinessWebAppLogoutPayload,
    PUT_langBusinessWebAppLogoutPayload,
    DELETE_langBusinessWebAppLogoutPayload,
} from "@routes/[lang]/business/web/app/logout/_routes/_payload.ts";

import {
    GET_langBusinessWebAppLogoutService,
    POST_langBusinessWebAppLogoutService,
    DELETE_langBusinessWebAppLogoutService,
    PUT_langBusinessWebAppLogoutService,
} from "@routes/[lang]/business/web/app/logout/_routes/_service.ts";


export const GET_langBusinessWebAppLogoutController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppLogoutPayload(req, ctx);
        return GET_langBusinessWebAppLogoutService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppLogoutController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppLogoutPayload(req, ctx);
        return POST_langBusinessWebAppLogoutService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppLogoutController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppLogoutPayload(req, ctx);
        return PUT_langBusinessWebAppLogoutService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppLogoutController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppLogoutPayload(req, ctx);
        return DELETE_langBusinessWebAppLogoutService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};