
// @routes/[lang]/business/web/app/configurations/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppConfigurationsPayload,
    POST_langBusinessWebAppConfigurationsPayload,
    PUT_langBusinessWebAppConfigurationsPayload,
    DELETE_langBusinessWebAppConfigurationsPayload,
} from "@routes/[lang]/business/web/app/configurations/_routes/_payload.ts";

import {
    GET_langBusinessWebAppConfigurationsService,
    POST_langBusinessWebAppConfigurationsService,
    DELETE_langBusinessWebAppConfigurationsService,
    PUT_langBusinessWebAppConfigurationsService,
} from "@routes/[lang]/business/web/app/configurations/_routes/_service.ts";


export const GET_langBusinessWebAppConfigurationsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppConfigurationsPayload(req, ctx);
        return GET_langBusinessWebAppConfigurationsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppConfigurationsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppConfigurationsPayload(req, ctx);
        return POST_langBusinessWebAppConfigurationsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppConfigurationsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppConfigurationsPayload(req, ctx);
        return PUT_langBusinessWebAppConfigurationsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppConfigurationsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppConfigurationsPayload(req, ctx);
        return DELETE_langBusinessWebAppConfigurationsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};