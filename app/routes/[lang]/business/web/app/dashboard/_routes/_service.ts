
// @routes/[lang]/business/web/app/dashboard/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppDashboardPayload,
    IPOST_langBusinessWebAppDashboardPayload,
    IPUT_langBusinessWebAppDashboardPayload,
    IDELETE_langBusinessWebAppDashboardPayload,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_payload.ts";

import {
    GET_langBusinessWebAppDashboardResponse_Success,
    POST_langBusinessWebAppDashboardResponse_Success,
    DELETE_langBusinessWebAppDashboardResponse_Success,
    PUT_langBusinessWebAppDashboardResponse_Success,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_response.ts";

import {
    GET_langBusinessWebAppDashboardFormSchema,
    POST_langBusinessWebAppDashboardFormSchema,
    DELETE_langBusinessWebAppDashboardFormSchema,
    PUT_langBusinessWebAppDashboardFormSchema,
} from "@routes/[lang]/business/web/app/dashboard/_routes/_validation.ts";


export interface IGET_langBusinessWebAppDashboardService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppDashboardPayload;
};

export const GET_langBusinessWebAppDashboardService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppDashboardService): Promise<Response> => {


    return await GET_langBusinessWebAppDashboardResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppDashboardService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppDashboardPayload;
};


export const POST_langBusinessWebAppDashboardService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppDashboardService): Promise<Response> => {


    const validation = POST_langBusinessWebAppDashboardFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppDashboardResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppDashboardService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppDashboardPayload;
};

export const PUT_langBusinessWebAppDashboardService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppDashboardService): Promise<Response> => {


    return await PUT_langBusinessWebAppDashboardResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppDashboardService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppDashboardPayload;
};

export const DELETE_langBusinessWebAppDashboardService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppDashboardService): Promise<Response> => {


    return await DELETE_langBusinessWebAppDashboardResponse_Success(req, ctx, payload);
}
