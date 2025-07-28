
// @routes/api/v1/public/business/ws/tokens/refresh/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { verifyOrRefreshToken } from '@utils/jwt.ts';

import {
    IGET_apiV1PublicBusinessWsTokensRefreshPayload,
    IPOST_apiV1PublicBusinessWsTokensRefreshPayload,
    IPUT_apiV1PublicBusinessWsTokensRefreshPayload,
    IDELETE_apiV1PublicBusinessWsTokensRefreshPayload,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_payload.ts";

import {
    GET_apiV1PublicBusinessWsTokensRefreshResponse_Success,
    POST_apiV1PublicBusinessWsTokensRefreshResponse_Success,
    DELETE_apiV1PublicBusinessWsTokensRefreshResponse_Success,
    PUT_apiV1PublicBusinessWsTokensRefreshResponse_Success,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_response.ts";

import {
    GET_apiV1PublicBusinessWsTokensRefreshFormSchema,
    POST_apiV1PublicBusinessWsTokensRefreshFormSchema,
    DELETE_apiV1PublicBusinessWsTokensRefreshFormSchema,
    PUT_apiV1PublicBusinessWsTokensRefreshFormSchema,
} from "@routes/api/v1/public/business/ws/tokens/refresh/_routes/_validation.ts";
import { sessionApiManager, sessionWsApiManager } from "@utils/api/cookieProcessor.ts";


export interface IGET_apiV1PublicBusinessWsTokensRefreshService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_apiV1PublicBusinessWsTokensRefreshPayload;
};

export const GET_apiV1PublicBusinessWsTokensRefreshService = async ({
    req,
    ctx,
    payload
}: IGET_apiV1PublicBusinessWsTokensRefreshService): Promise<Response> => {


    return await GET_apiV1PublicBusinessWsTokensRefreshResponse_Success(req, ctx, payload);
};




export interface IPOST_apiV1PublicBusinessWsTokensRefreshService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_apiV1PublicBusinessWsTokensRefreshPayload;
};


export const POST_apiV1PublicBusinessWsTokensRefreshService = async ({
    req,
    ctx,
    payload
}: IPOST_apiV1PublicBusinessWsTokensRefreshService): Promise<Response> => {

    // Extract tokens from the payload. Adjust based on your IPOST...Payload structure.
    // Assuming payload.rawData contains the parsed JSON body or form data.

    if (!payload.accessToken || !payload.refreshToken) {
        return new Response(JSON.stringify({ error: "Refresh token is required." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const verificationResult = await verifyOrRefreshToken(payload.accessToken, payload.refreshToken);

        if (verificationResult.valid && verificationResult.accessToken && verificationResult.payload) {
            // Tokens are valid or successfully refreshed
            

            if (payload.sessionHttpContext && verificationResult.refreshToken) {
                try {
                    await payload.sessionHttpContext.store.set("refresh_token", verificationResult.refreshToken);
                    console.log("Keycloak refresh token stored/updated in httpSession.");
                } catch (e) { console.error("Failed to store refresh token in httpSession", e); }
            } else {
                if (!payload.sessionHttpContext) console.warn("httpSession not found, cannot store refresh_token.");
            }

            if (payload.sessionWsContext) {
                try {
                    if (payload.sessionHttpContext) {
                        await payload.sessionHttpContext.store.set("access_token", verificationResult.accessToken);
                    }
                    await payload.sessionWsContext.store.set("access_token", verificationResult.accessToken);
                } catch (e) {
                    console.error("Failed to store access token in wsSession", e);
                }
            }

            const responsePayload = {
                message: "Token processed successfully.",
                access_token: verificationResult.accessToken,
                expires_in: verificationResult.payload.exp,
                // Optionally, if your client needs the refresh token directly (e.g., mobile app not using cookies for it)
                // refresh_token: verificationResult.refreshToken,
                user: {
                    username: verificationResult.payload.preferred_username,
                    email: verificationResult.payload.email,
                    sub: verificationResult.payload.sub,
                },
            };

            return new Response(JSON.stringify(responsePayload), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });

        } else {
            // Verification and refresh failed
            console.error("Token verification/refresh failed:", verificationResult.error);
            return new Response(JSON.stringify({
                error: "Failed to validate or refresh token.",
                details: verificationResult.error || "Unknown authentication error."
            }), {
                status: 401, // Unauthorized
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (e) {
        console.error("Unhandled error in token refresh service:", e);
        return new Response(JSON.stringify({ error: "Internal server error during token processing." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    //const validation = POST_apiV1PublicBusinessWsTokensRefreshFormSchema.safeParse(payload.rawData);

    return await POST_apiV1PublicBusinessWsTokensRefreshResponse_Success(req, ctx, payload, /*validation*/);

};



export interface IPUT_apiV1PublicBusinessWsTokensRefreshService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_apiV1PublicBusinessWsTokensRefreshPayload;
};

export const PUT_apiV1PublicBusinessWsTokensRefreshService = async ({
    req,
    ctx,
    payload
}: IPUT_apiV1PublicBusinessWsTokensRefreshService): Promise<Response> => {


    return await PUT_apiV1PublicBusinessWsTokensRefreshResponse_Success(req, ctx, payload);
};



export interface IDELETE_apiV1PublicBusinessWsTokensRefreshService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_apiV1PublicBusinessWsTokensRefreshPayload;
};

export const DELETE_apiV1PublicBusinessWsTokensRefreshService = async ({
    req,
    ctx,
    payload
}: IDELETE_apiV1PublicBusinessWsTokensRefreshService): Promise<Response> => {


    return await DELETE_apiV1PublicBusinessWsTokensRefreshResponse_Success(req, ctx, payload);
}
