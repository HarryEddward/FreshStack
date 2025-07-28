
// @routes/[lang]/admin/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langAdminPayload,
    POST_langAdminPayload,
    PUT_langAdminPayload,
    DELETE_langAdminPayload,
} from "@routes/[lang]/admin/_routes/_payload.ts";

import {
    GET_langAdminService,
    POST_langAdminService,
    DELETE_langAdminService,
    PUT_langAdminService,
} from "@routes/[lang]/admin/_routes/_service.ts";


export const GET_langAdminController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langAdminPayload(req, ctx);
        return GET_langAdminService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langAdminController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langAdminPayload(req, ctx);
        return POST_langAdminService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langAdminController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langAdminPayload(req, ctx);
        return PUT_langAdminService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langAdminController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langAdminPayload(req, ctx);
        return DELETE_langAdminService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};