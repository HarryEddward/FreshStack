
// @routes/[lang]/business/web/app/dashboard/inventory/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppDashboardInventoryPayload,
    IPOST_langBusinessWebAppDashboardInventoryPayload,
    IPUT_langBusinessWebAppDashboardInventoryPayload,
    IDELETE_langBusinessWebAppDashboardInventoryPayload,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_payload.ts";

import {
    GET_langBusinessWebAppDashboardInventoryResponse_Success,
    POST_langBusinessWebAppDashboardInventoryResponse_Success,
    DELETE_langBusinessWebAppDashboardInventoryResponse_Success,
    PUT_langBusinessWebAppDashboardInventoryResponse_Success,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_response.ts";

import {
    GET_langBusinessWebAppDashboardInventoryFormSchema,
    POST_langBusinessWebAppDashboardInventoryFormSchema,
    DELETE_langBusinessWebAppDashboardInventoryFormSchema,
    PUT_langBusinessWebAppDashboardInventoryFormSchema,
} from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_validation.ts";


export interface IGET_langBusinessWebAppDashboardInventoryService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppDashboardInventoryPayload;
};

export const GET_langBusinessWebAppDashboardInventoryService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppDashboardInventoryService): Promise<Response> => {


    return await GET_langBusinessWebAppDashboardInventoryResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppDashboardInventoryService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppDashboardInventoryPayload;
};


export const POST_langBusinessWebAppDashboardInventoryService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppDashboardInventoryService): Promise<Response> => {


    const validation = POST_langBusinessWebAppDashboardInventoryFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppDashboardInventoryResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppDashboardInventoryService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppDashboardInventoryPayload;
};

export const PUT_langBusinessWebAppDashboardInventoryService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppDashboardInventoryService): Promise<Response> => {


    return await PUT_langBusinessWebAppDashboardInventoryResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppDashboardInventoryService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppDashboardInventoryPayload;
};

export const DELETE_langBusinessWebAppDashboardInventoryService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppDashboardInventoryService): Promise<Response> => {


    return await DELETE_langBusinessWebAppDashboardInventoryResponse_Success(req, ctx, payload);
}
