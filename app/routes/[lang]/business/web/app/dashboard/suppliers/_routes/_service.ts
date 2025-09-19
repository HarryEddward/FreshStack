
// @routes/[lang]/business/web/app/dashboard/suppliers/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppDashboardSuppliersPayload,
    IPOST_langBusinessWebAppDashboardSuppliersPayload,
    IPUT_langBusinessWebAppDashboardSuppliersPayload,
    IDELETE_langBusinessWebAppDashboardSuppliersPayload,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_payload.ts";

import {
    GET_langBusinessWebAppDashboardSuppliersResponse_Success,
    POST_langBusinessWebAppDashboardSuppliersResponse_Success,
    DELETE_langBusinessWebAppDashboardSuppliersResponse_Success,
    PUT_langBusinessWebAppDashboardSuppliersResponse_Success,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_response.ts";

import {
    GET_langBusinessWebAppDashboardSuppliersFormSchema,
    POST_langBusinessWebAppDashboardSuppliersFormSchema,
    DELETE_langBusinessWebAppDashboardSuppliersFormSchema,
    PUT_langBusinessWebAppDashboardSuppliersFormSchema,
} from "@routes/[lang]/business/web/app/dashboard/suppliers/_routes/_validation.ts";


export interface IGET_langBusinessWebAppDashboardSuppliersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppDashboardSuppliersPayload;
};

export const GET_langBusinessWebAppDashboardSuppliersService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppDashboardSuppliersService): Promise<Response> => {


    return await GET_langBusinessWebAppDashboardSuppliersResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppDashboardSuppliersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppDashboardSuppliersPayload;
};


export const POST_langBusinessWebAppDashboardSuppliersService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppDashboardSuppliersService): Promise<Response> => {


    const validation = POST_langBusinessWebAppDashboardSuppliersFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppDashboardSuppliersResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppDashboardSuppliersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppDashboardSuppliersPayload;
};

export const PUT_langBusinessWebAppDashboardSuppliersService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppDashboardSuppliersService): Promise<Response> => {


    return await PUT_langBusinessWebAppDashboardSuppliersResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppDashboardSuppliersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppDashboardSuppliersPayload;
};

export const DELETE_langBusinessWebAppDashboardSuppliersService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppDashboardSuppliersService): Promise<Response> => {


    return await DELETE_langBusinessWebAppDashboardSuppliersResponse_Success(req, ctx, payload);
}
