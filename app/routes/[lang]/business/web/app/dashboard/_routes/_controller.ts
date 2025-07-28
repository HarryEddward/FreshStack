
// @routes/[lang]/business/web/app/dashboard/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppDashboardPayload,
    POST_langBusinessWebAppDashboardPayload,
    PUT_langBusinessWebAppDashboardPayload,
    DELETE_langBusinessWebAppDashboardPayload,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_payload.ts";

import {
    GET_langBusinessWebAppDashboardService,
    POST_langBusinessWebAppDashboardService,
    DELETE_langBusinessWebAppDashboardService,
    PUT_langBusinessWebAppDashboardService,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_service.ts";


export const GET_langBusinessWebAppDashboardController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppDashboardPayload(req, ctx);
        return GET_langBusinessWebAppDashboardService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppDashboardController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppDashboardPayload(req, ctx);
        return POST_langBusinessWebAppDashboardService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppDashboardController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppDashboardPayload(req, ctx);
        return PUT_langBusinessWebAppDashboardService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppDashboardController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppDashboardPayload(req, ctx);
        return DELETE_langBusinessWebAppDashboardService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};