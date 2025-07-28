
// @routes/[lang]/business/web/app/users/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_langBusinessWebAppUsersPayload,
    POST_langBusinessWebAppUsersPayload,
    PUT_langBusinessWebAppUsersPayload,
    DELETE_langBusinessWebAppUsersPayload,
} from "@routes/[lang]/business/web/app/users/_routes/_payload.ts";

import {
    GET_langBusinessWebAppUsersService,
    POST_langBusinessWebAppUsersService,
    DELETE_langBusinessWebAppUsersService,
    PUT_langBusinessWebAppUsersService,
} from "@routes/[lang]/business/web/app/users/_routes/_service.ts";


export const GET_langBusinessWebAppUsersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_langBusinessWebAppUsersPayload(req, ctx);
        return GET_langBusinessWebAppUsersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_langBusinessWebAppUsersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_langBusinessWebAppUsersPayload(req, ctx);
        return POST_langBusinessWebAppUsersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_langBusinessWebAppUsersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_langBusinessWebAppUsersPayload(req, ctx);
        return PUT_langBusinessWebAppUsersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_langBusinessWebAppUsersController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_langBusinessWebAppUsersPayload(req, ctx);
        return DELETE_langBusinessWebAppUsersService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};