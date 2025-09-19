
// @routes/[lang]/business/web/app/dashboard/inventory/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppDashboardInventoryPayload,
    POST_langBusinessWebAppDashboardInventoryPayload,
    PUT_langBusinessWebAppDashboardInventoryPayload,
    DELETE_langBusinessWebAppDashboardInventoryPayload,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_payload.ts";

import {
    GET_langBusinessWebAppDashboardInventoryService,
    POST_langBusinessWebAppDashboardInventoryService,
    DELETE_langBusinessWebAppDashboardInventoryService,
    PUT_langBusinessWebAppDashboardInventoryService,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_service.ts";


export const GET_langBusinessWebAppDashboardInventoryController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppDashboardInventoryPayload(req, ctx);
        return GET_langBusinessWebAppDashboardInventoryService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppDashboardInventoryController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppDashboardInventoryPayload(req, ctx);
        return POST_langBusinessWebAppDashboardInventoryService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppDashboardInventoryController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppDashboardInventoryPayload(req, ctx);
        return PUT_langBusinessWebAppDashboardInventoryService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppDashboardInventoryController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppDashboardInventoryPayload(req, ctx);
        return DELETE_langBusinessWebAppDashboardInventoryService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};