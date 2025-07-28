
// @routes/[lang]/[license]/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_lang_licensePayload,
    IPOST_lang_licensePayload,
    IPUT_lang_licensePayload,
    IDELETE_lang_licensePayload,
} from "./_payload.ts";

import {
    GET_lang_licenseResponse_Success,
    POST_lang_licenseResponse_Success,
    DELETE_lang_licenseResponse_Success,
    PUT_lang_licenseResponse_Success,
} from "./_response.ts";

import {
    GET_lang_licenseFormSchema,
    POST_lang_licenseFormSchema,
    DELETE_lang_licenseFormSchema,
    PUT_lang_licenseFormSchema,
} from "./_validation.ts";


export interface IGET_lang_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_lang_licensePayload;
};

export const GET_lang_licenseService = async ({
    req,
    ctx,
    payload
}: IGET_lang_licenseService): Promise<Response> => {


    return await GET_lang_licenseResponse_Success(req, ctx, payload);
};




export interface IPOST_lang_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_lang_licensePayload;
};


export const POST_lang_licenseService = async ({
    req,
    ctx,
    payload
}: IPOST_lang_licenseService): Promise<Response> => {


    const validation = POST_lang_licenseFormSchema.safeParse(payload.rawData);

    return await POST_lang_licenseResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_lang_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_lang_licensePayload;
};

export const PUT_lang_licenseService = async ({
    req,
    ctx,
    payload
}: IPUT_lang_licenseService): Promise<Response> => {


    return await PUT_lang_licenseResponse_Success(req, ctx, payload);
};



export interface IDELETE_lang_licenseService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_lang_licensePayload;
};

export const DELETE_lang_licenseService = async ({
    req,
    ctx,
    payload
}: IDELETE_lang_licenseService): Promise<Response> => {


    return await DELETE_lang_licenseResponse_Success(req, ctx, payload);
}
