
// @routes/[lang]/client/app/private/services/transaction/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langClientAppTransactionPayload,
    IPOST_langClientAppTransactionPayload,
    IPUT_langClientAppTransactionPayload,
    IDELETE_langClientAppTransactionPayload,
} from "@routes/[lang]/client/app/private/services/transaction/_routes/_payload.ts";

import {
    GET_langClientAppTransactionResponse_Success,
    POST_langClientAppTransactionResponse_Success,
    DELETE_langClientAppTransactionResponse_Success,
    PUT_langClientAppTransactionResponse_Success,
} from "@routes/[lang]/client/app/private/services/transaction/_routes/_response.ts";

import {
    GET_langClientAppTransactionFormSchema,
    POST_langClientAppTransactionFormSchema,
    DELETE_langClientAppTransactionFormSchema,
    PUT_langClientAppTransactionFormSchema,
} from "@routes/[lang]/client/app/private/services/transaction/_routes/_validation.ts";


export interface IGET_langClientAppTransactionService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langClientAppTransactionPayload;
};

export const GET_langClientAppTransactionService = async ({
    req,
    ctx,
    payload
}: IGET_langClientAppTransactionService): Promise<Response> => {


    return await GET_langClientAppTransactionResponse_Success(req, ctx, payload);
};




export interface IPOST_langClientAppTransactionService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langClientAppTransactionPayload;
};


export const POST_langClientAppTransactionService = async ({
    req,
    ctx,
    payload
}: IPOST_langClientAppTransactionService): Promise<Response> => {


    const validation = POST_langClientAppTransactionFormSchema.safeParse(payload.rawData);

    return await POST_langClientAppTransactionResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langClientAppTransactionService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langClientAppTransactionPayload;
};

export const PUT_langClientAppTransactionService = async ({
    req,
    ctx,
    payload
}: IPUT_langClientAppTransactionService): Promise<Response> => {


    return await PUT_langClientAppTransactionResponse_Success(req, ctx, payload);
};



export interface IDELETE_langClientAppTransactionService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langClientAppTransactionPayload;
};

export const DELETE_langClientAppTransactionService = async ({
    req,
    ctx,
    payload
}: IDELETE_langClientAppTransactionService): Promise<Response> => {


    return await DELETE_langClientAppTransactionResponse_Success(req, ctx, payload);
}
