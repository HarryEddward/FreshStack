
// @routes/[lang]/admin/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langAdminPayload,
    IPOST_langAdminPayload,
    IPUT_langAdminPayload,
    IDELETE_langAdminPayload,
} from "@routes/[lang]/admin/_routes/_payload.ts";

import {
    GET_langAdminResponse_Success,
    POST_langAdminResponse_Success,
    DELETE_langAdminResponse_Success,
    PUT_langAdminResponse_Success,
} from "@routes/[lang]/admin/_routes/_response.ts";

import {
    GET_langAdminFormSchema,
    POST_langAdminFormSchema,
    DELETE_langAdminFormSchema,
    PUT_langAdminFormSchema,
} from "@routes/[lang]/admin/_routes/_validation.ts";


export interface IGET_langAdminService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langAdminPayload;
};

export const GET_langAdminService = async ({
    req,
    ctx,
    payload
}: IGET_langAdminService): Promise<Response> => {


    return await GET_langAdminResponse_Success(req, ctx, payload);
};




export interface IPOST_langAdminService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langAdminPayload;
};


export const POST_langAdminService = async ({
    req,
    ctx,
    payload
}: IPOST_langAdminService): Promise<Response> => {


    const validation = POST_langAdminFormSchema.safeParse(payload.rawData);

    return await POST_langAdminResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langAdminService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langAdminPayload;
};

export const PUT_langAdminService = async ({
    req,
    ctx,
    payload
}: IPUT_langAdminService): Promise<Response> => {


    return await PUT_langAdminResponse_Success(req, ctx, payload);
};



export interface IDELETE_langAdminService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langAdminPayload;
};

export const DELETE_langAdminService = async ({
    req,
    ctx,
    payload
}: IDELETE_langAdminService): Promise<Response> => {


    return await DELETE_langAdminResponse_Success(req, ctx, payload);
}
