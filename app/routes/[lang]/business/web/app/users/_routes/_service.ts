
// @routes/[lang]/business/web/app/users/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langBusinessWebAppUsersPayload,
    IPOST_langBusinessWebAppUsersPayload,
    IPUT_langBusinessWebAppUsersPayload,
    IDELETE_langBusinessWebAppUsersPayload,
} from "@routes/[lang]/business/web/app/users/_routes/_payload.ts";

import {
    GET_langBusinessWebAppUsersResponse_Success,
    POST_langBusinessWebAppUsersResponse_Success,
    DELETE_langBusinessWebAppUsersResponse_Success,
    PUT_langBusinessWebAppUsersResponse_Success,
} from "@routes/[lang]/business/web/app/users/_routes/_response.ts";

import {
    GET_langBusinessWebAppUsersFormSchema,
    POST_langBusinessWebAppUsersFormSchema,
    DELETE_langBusinessWebAppUsersFormSchema,
    PUT_langBusinessWebAppUsersFormSchema,
} from "@routes/[lang]/business/web/app/users/_routes/_validation.ts";


export interface IGET_langBusinessWebAppUsersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langBusinessWebAppUsersPayload;
};

export const GET_langBusinessWebAppUsersService = async ({
    req,
    ctx,
    payload
}: IGET_langBusinessWebAppUsersService): Promise<Response> => {


    return await GET_langBusinessWebAppUsersResponse_Success(req, ctx, payload);
};




export interface IPOST_langBusinessWebAppUsersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langBusinessWebAppUsersPayload;
};


export const POST_langBusinessWebAppUsersService = async ({
    req,
    ctx,
    payload
}: IPOST_langBusinessWebAppUsersService): Promise<Response> => {


    const validation = POST_langBusinessWebAppUsersFormSchema.safeParse(payload.rawData);

    return await POST_langBusinessWebAppUsersResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langBusinessWebAppUsersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langBusinessWebAppUsersPayload;
};

export const PUT_langBusinessWebAppUsersService = async ({
    req,
    ctx,
    payload
}: IPUT_langBusinessWebAppUsersService): Promise<Response> => {


    return await PUT_langBusinessWebAppUsersResponse_Success(req, ctx, payload);
};



export interface IDELETE_langBusinessWebAppUsersService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langBusinessWebAppUsersPayload;
};

export const DELETE_langBusinessWebAppUsersService = async ({
    req,
    ctx,
    payload
}: IDELETE_langBusinessWebAppUsersService): Promise<Response> => {


    return await DELETE_langBusinessWebAppUsersResponse_Success(req, ctx, payload);
}
