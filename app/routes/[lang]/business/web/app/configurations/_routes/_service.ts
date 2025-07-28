
// @routes/[lang]/business/web/app/configurations/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppConfigurationsPayload,
    IPOST_langBusinessWebAppConfigurationsPayload,
    IPUT_langBusinessWebAppConfigurationsPayload,
    IDELETE_langBusinessWebAppConfigurationsPayload,
} from "@routes/[lang]/business/web/app/configurations/_routes/_payload.ts";

import {
    GET_langBusinessWebAppConfigurationsResponse_Success,
    POST_langBusinessWebAppConfigurationsResponse_Success,
    DELETE_langBusinessWebAppConfigurationsResponse_Success,
    PUT_langBusinessWebAppConfigurationsResponse_Success,
} from "@routes/[lang]/business/web/app/configurations/_routes/_response.ts";

import {
    GET_langBusinessWebAppConfigurationsFormSchema,
    POST_langBusinessWebAppConfigurationsFormSchema,
    DELETE_langBusinessWebAppConfigurationsFormSchema,
    PUT_langBusinessWebAppConfigurationsFormSchema,
} from "@routes/[lang]/business/web/app/configurations/_routes/_validation.ts";


export interface IGET_langBusinessWebAppConfigurationsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppConfigurationsPayload;
};

export const GET_langBusinessWebAppConfigurationsService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppConfigurationsService): Promise<Response> => {


    return await GET_langBusinessWebAppConfigurationsResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppConfigurationsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppConfigurationsPayload;
};


export const POST_langBusinessWebAppConfigurationsService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppConfigurationsService): Promise<Response> => {


    const validation = POST_langBusinessWebAppConfigurationsFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppConfigurationsResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppConfigurationsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppConfigurationsPayload;
};

export const PUT_langBusinessWebAppConfigurationsService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppConfigurationsService): Promise<Response> => {


    return await PUT_langBusinessWebAppConfigurationsResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppConfigurationsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppConfigurationsPayload;
};

export const DELETE_langBusinessWebAppConfigurationsService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppConfigurationsService): Promise<Response> => {


    return await DELETE_langBusinessWebAppConfigurationsResponse_Success(req, ctx, payload);
}
