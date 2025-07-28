
// @routes/api/v1/public/business/ws/tokens/refresh/_routes//_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import {
    GET_apiV1PublicBusinessWsTokensRefreshPayload,
    POST_apiV1PublicBusinessWsTokensRefreshPayload,
    PUT_apiV1PublicBusinessWsTokensRefreshPayload,
    DELETE_apiV1PublicBusinessWsTokensRefreshPayload,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_payload.ts";

import {
    GET_apiV1PublicBusinessWsTokensRefreshService,
    POST_apiV1PublicBusinessWsTokensRefreshService,
    DELETE_apiV1PublicBusinessWsTokensRefreshService,
    PUT_apiV1PublicBusinessWsTokensRefreshService,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_service.ts";


export const GET_apiV1PublicBusinessWsTokensRefreshController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await GET_apiV1PublicBusinessWsTokensRefreshPayload(req, ctx);
        return GET_apiV1PublicBusinessWsTokensRefreshService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const POST_apiV1PublicBusinessWsTokensRefreshController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await POST_apiV1PublicBusinessWsTokensRefreshPayload(req, ctx);
        return POST_apiV1PublicBusinessWsTokensRefreshService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const PUT_apiV1PublicBusinessWsTokensRefreshController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await PUT_apiV1PublicBusinessWsTokensRefreshPayload(req, ctx);
        return PUT_apiV1PublicBusinessWsTokensRefreshService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};

export const DELETE_apiV1PublicBusinessWsTokensRefreshController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {

    try {

        const payload = await DELETE_apiV1PublicBusinessWsTokensRefreshPayload(req, ctx);
        return DELETE_apiV1PublicBusinessWsTokensRefreshService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};