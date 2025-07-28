export const _controller: string = `
// <%= componentPathRouter %>/_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_<%= componentName %>Payload,
    POST_<%= componentName %>Payload,
    PUT_<%= componentName %>Payload,
    DELETE_<%= componentName %>Payload,
} from "<%= componentPathRouter %>_payload.ts";

import {
    GET_<%= componentName %>Service,
    POST_<%= componentName %>Service,
    DELETE_<%= componentName %>Service,
    PUT_<%= componentName %>Service,
} from "<%= componentPathRouter %>_service.ts";


export const GET_<%= componentName %>Controller = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_<%= componentName %>Payload(req, ctx);
        return GET_<%= componentName %>Service({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_<%= componentName %>Controller = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_<%= componentName %>Payload(req, ctx);
        return POST_<%= componentName %>Service({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_<%= componentName %>Controller = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_<%= componentName %>Payload(req, ctx);
        return PUT_<%= componentName %>Service({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_<%= componentName %>Controller = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_<%= componentName %>Payload(req, ctx);
        return DELETE_<%= componentName %>Service({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};`;