
// @router/[lang]/hello/_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessPayload,
    POST_langBusinessPayload,
    PUT_langBusinessPayload,
    DELETE_langBusinessPayload,
} from "@router/[lang]/hello_payload.ts";

import {
    GET_langBusinessService,
    POST_langBusinessService,
    DELETE_langBusinessService,
    PUT_langBusinessService,
} from "@router/[lang]/hello_service.ts";


export const GET_langBusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessPayload(req, ctx);
        return GET_langBusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessPayload(req, ctx);
        return POST_langBusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessPayload(req, ctx);
        return PUT_langBusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessPayload(req, ctx);
        return DELETE_langBusinessService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};