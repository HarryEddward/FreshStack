
// @routes/[lang]/[license]/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_lang_licensePayload,
    POST_lang_licensePayload,
    PUT_lang_licensePayload,
    DELETE_lang_licensePayload,
} from "./_payload.ts";

import {
    GET_lang_licenseService,
    POST_lang_licenseService,
    DELETE_lang_licenseService,
    PUT_lang_licenseService,
} from "./_service.ts";


export const GET_lang_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_lang_licensePayload(req, ctx);
        return GET_lang_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_lang_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_lang_licensePayload(req, ctx);
        return POST_lang_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_lang_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_lang_licensePayload(req, ctx);
        return PUT_lang_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_lang_licenseController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_lang_licensePayload(req, ctx);
        return DELETE_lang_licenseService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};