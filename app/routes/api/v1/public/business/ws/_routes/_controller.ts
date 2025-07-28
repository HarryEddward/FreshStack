
// @routes/api/v1/public/business/ws/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_apiV1PublicBusinessWsPayload,
    POST_apiV1PublicBusinessWsPayload,
    PUT_apiV1PublicBusinessWsPayload,
    DELETE_apiV1PublicBusinessWsPayload,
} from "@routes/api/v1/public/business/ws/_routes/_payload.ts";

import {
    GET_apiV1PublicBusinessWsService,
    POST_apiV1PublicBusinessWsService,
    DELETE_apiV1PublicBusinessWsService,
    PUT_apiV1PublicBusinessWsService,
} from "@routes/api/v1/public/business/ws/_routes/_service.ts";


export const GET_apiV1PublicBusinessWsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_apiV1PublicBusinessWsPayload(req, ctx);
        return GET_apiV1PublicBusinessWsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_apiV1PublicBusinessWsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_apiV1PublicBusinessWsPayload(req, ctx);
        return POST_apiV1PublicBusinessWsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_apiV1PublicBusinessWsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_apiV1PublicBusinessWsPayload(req, ctx);
        return PUT_apiV1PublicBusinessWsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_apiV1PublicBusinessWsController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_apiV1PublicBusinessWsPayload(req, ctx);
        return DELETE_apiV1PublicBusinessWsService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};