// @routes/[lang]/client/_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { emptyEmailFieldErrorResponse, termsAndConditionsErrorResponse } from "./_utils.ts";
import { POST_langClientApp_formSchema } from "./_validation.ts";
import { IGET_langClientAppPayload, IPOST_langClientAppPayload } from "./_payload.ts";
import { GET_langClientAppResponse_Success, POST_langClientAppResponse_Success } from "./_response.ts";


export interface IGET_langClientAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_langClientAppPayload;
};

export const GET_langClientAppService = async ({
    req,
    ctx,
    payload
}: IGET_langClientAppService): Promise<Response> => {


    return await GET_langClientAppResponse_Success(req, ctx, payload);
}




export interface IPOST_langClientAppService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_langClientAppPayload;
};


export const POST_langClientAppService = async ({
    req,
    ctx,
    payload
}: IPOST_langClientAppService): Promise<Response> => {


    const validation = POST_langClientApp_formSchema.safeParse(payload.rawData);

    console.log(validation.success);

    if (!validation.success) {
        //return new Response(resultValidation.error.errors, { status: 400 });
        const resultTermsErrorResponse = termsAndConditionsErrorResponse(validation.error.errors, payload.actualLang);
        if (resultTermsErrorResponse) {
            return resultTermsErrorResponse;
        }

        const resultEmptyEmailErrorResponse = emptyEmailFieldErrorResponse(validation.error.errors, payload.actualLang);
        if (resultEmptyEmailErrorResponse) {
            return resultEmptyEmailErrorResponse;
        }
    

        return new Response(validation.error?.message, {
            status: 400,
            headers: {
            "Content-Type": "application/json",
            },
        });
    }

    return await POST_langClientAppResponse_Success(req, ctx, payload, validation);



}