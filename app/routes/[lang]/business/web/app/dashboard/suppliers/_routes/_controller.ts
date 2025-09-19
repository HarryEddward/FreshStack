
// @routes/[lang]/business/web/app/dashboard/suppliers/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppDashboardSuppliersPayload,
    POST_langBusinessWebAppDashboardSuppliersPayload,
    PUT_langBusinessWebAppDashboardSuppliersPayload,
    DELETE_langBusinessWebAppDashboardSuppliersPayload,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_payload.ts";

import {
    GET_langBusinessWebAppDashboardSuppliersService,
    POST_langBusinessWebAppDashboardSuppliersService,
    DELETE_langBusinessWebAppDashboardSuppliersService,
    PUT_langBusinessWebAppDashboardSuppliersService,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_service.ts";


export const GET_langBusinessWebAppDashboardSuppliersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppDashboardSuppliersPayload(req, ctx);
        return GET_langBusinessWebAppDashboardSuppliersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppDashboardSuppliersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppDashboardSuppliersPayload(req, ctx);
        return POST_langBusinessWebAppDashboardSuppliersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppDashboardSuppliersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppDashboardSuppliersPayload(req, ctx);
        return PUT_langBusinessWebAppDashboardSuppliersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppDashboardSuppliersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppDashboardSuppliersPayload(req, ctx);
        return DELETE_langBusinessWebAppDashboardSuppliersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};