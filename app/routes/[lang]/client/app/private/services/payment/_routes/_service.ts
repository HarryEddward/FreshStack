
// @routes/[lang]/client/app/private/services/payment/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_langClientAppPaymentPayload,
    IPOST_langClientAppPaymentPayload,
    IPUT_langClientAppPaymentPayload,
    IDELETE_langClientAppPaymentPayload,
} from "@routes/[lang]/client/app/private/services/payment/_routes/_payload.ts";

import {
    GET_langClientAppPaymentResponse_Success,
    POST_langClientAppPaymentResponse_Success,
    DELETE_langClientAppPaymentResponse_Success,
    PUT_langClientAppPaymentResponse_Success,
    fieldErrorResponse,
} from "@routes/[lang]/client/app/private/services/payment/_routes/_response.ts";

import {
    GET_langClientAppPaymentFormSchema,
    POST_langClientAppPaymentFormSchema,
    DELETE_langClientAppPaymentFormSchema,
    PUT_langClientAppPaymentFormSchema,
} from "@routes/[lang]/client/app/private/services/payment/_routes/_validation.ts";


export interface IGET_langClientAppPaymentService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langClientAppPaymentPayload;
};

export const GET_langClientAppPaymentService = async ({
    req,
    ctx,
    payload
}: IGET_langClientAppPaymentService): Promise<Response> => {


    return await GET_langClientAppPaymentResponse_Success(req, ctx, payload);
};




export interface IPOST_langClientAppPaymentService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langClientAppPaymentPayload;
};


export const POST_langClientAppPaymentService = async ({
    req,
    ctx,
    payload
}: IPOST_langClientAppPaymentService): Promise<Response> => {

    console.log("POST_langClientAppPaymentService");
    console.log(payload.rawData);

    const validation = POST_langClientAppPaymentFormSchema.safeParse(payload.rawData);
    if (!validation.success) {
        const errors = validation.error.flatten();

        const params = new URLSearchParams();
        if (errors.fieldErrors.card_number) {
            return fieldErrorResponse("bad_format_card_number", payload.actualLang);
        }
        if (errors.fieldErrors.cvc) {
            return fieldErrorResponse("bad_format_cvc", payload.actualLang);
        }
        if (errors.fieldErrors.expiry_date) {
            return fieldErrorResponse("bad_format_expire_date", payload.actualLang);
        }

        
    
        return new Response(null, {
            status: 303,
            headers: { Location: `/${payload.actualLang}/client/app/private/services/payment?${params}` },
        });
    };
    

    return await POST_langClientAppPaymentResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_langClientAppPaymentService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_langClientAppPaymentPayload;
};

export const PUT_langClientAppPaymentService = async ({
    req,
    ctx,
    payload
}: IPUT_langClientAppPaymentService): Promise<Response> => {


    return await PUT_langClientAppPaymentResponse_Success(req, ctx, payload);
};



export interface IDELETE_langClientAppPaymentService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_langClientAppPaymentPayload;
};

export const DELETE_langClientAppPaymentService = async ({
    req,
    ctx,
    payload
}: IDELETE_langClientAppPaymentService): Promise<Response> => {


    return await DELETE_langClientAppPaymentResponse_Success(req, ctx, payload);
}
