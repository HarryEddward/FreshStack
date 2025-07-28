
// @routes/[lang]/business/app/[license]/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessApp_licensePayload,
    POST_langBusinessApp_licensePayload,
    PUT_langBusinessApp_licensePayload,
    DELETE_langBusinessApp_licensePayload,
} from "@routes/[lang]/business/app/[license]/_routes/_payload.ts";

import {
    GET_langBusinessApp_licenseService,
    POST_langBusinessApp_licenseService,
    DELETE_langBusinessApp_licenseService,
    PUT_langBusinessApp_licenseService,
} from "@routes/[lang]/business/app/[license]/_routes/_service.ts";


export const GET_langBusinessApp_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessApp_licensePayload(req, ctx);
        return GET_langBusinessApp_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessApp_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessApp_licensePayload(req, ctx);
        return POST_langBusinessApp_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessApp_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessApp_licensePayload(req, ctx);
        return PUT_langBusinessApp_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessApp_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessApp_licensePayload(req, ctx);
        return DELETE_langBusinessApp_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};