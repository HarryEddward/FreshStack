
// @routes/[lang]/business/app/[license]/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessApp_licensePayload,
    IPOST_langBusinessApp_licensePayload,
    IPUT_langBusinessApp_licensePayload,
    IDELETE_langBusinessApp_licensePayload,
} from "@routes/[lang]/business/app/[license]/_routes/_payload.ts";

import {
    GET_langBusinessApp_licenseResponse_Success,
    POST_langBusinessApp_licenseResponse_Success,
    DELETE_langBusinessApp_licenseResponse_Success,
    PUT_langBusinessApp_licenseResponse_Success,
} from "@routes/[lang]/business/app/[license]/_routes/_response.ts";

import {
    GET_langBusinessApp_licenseFormSchema,
    POST_langBusinessApp_licenseFormSchema,
    DELETE_langBusinessApp_licenseFormSchema,
    PUT_langBusinessApp_licenseFormSchema,
} from "@routes/[lang]/business/app/[license]/_routes/_validation.ts";


export interface IGET_langBusinessApp_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessApp_licensePayload;
};

export const GET_langBusinessApp_licenseService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessApp_licenseService): Promise<Response> => {


    return await GET_langBusinessApp_licenseResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessApp_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessApp_licensePayload;
};


export const POST_langBusinessApp_licenseService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessApp_licenseService): Promise<Response> => {


    const validation = POST_langBusinessApp_licenseFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessApp_licenseResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessApp_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessApp_licensePayload;
};

export const PUT_langBusinessApp_licenseService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessApp_licenseService): Promise<Response> => {


    return await PUT_langBusinessApp_licenseResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessApp_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessApp_licensePayload;
};

export const DELETE_langBusinessApp_licenseService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessApp_licenseService): Promise<Response> => {


    return await DELETE_langBusinessApp_licenseResponse_Success(req, ctx, payload);
}
