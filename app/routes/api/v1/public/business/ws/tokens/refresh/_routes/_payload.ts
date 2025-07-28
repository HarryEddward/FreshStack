
// @routes/api/v1/public/business/ws/tokens/refresh/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { sessionApiManager, SessionContext, sessionWsApiManager } from "@utils/api/cookieProcessor.ts";


export interface IGET_apiV1PublicBusinessWsTokensRefreshPayload {

}

export const GET_apiV1PublicBusinessWsTokensRefreshPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_apiV1PublicBusinessWsTokensRefreshPayload> => {
    
    
    return {
    }
}


export interface IPOST_apiV1PublicBusinessWsTokensRefreshPayload {
    sessionHttpContext: SessionContext;
    sessionWsContext: SessionContext;
    refreshToken: string;
    accessToken: string;

}

export const POST_apiV1PublicBusinessWsTokensRefreshPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_apiV1PublicBusinessWsTokensRefreshPayload> => {


    const sessionHttpContext = await sessionApiManager.getSession(req);
    const sessionWsContext = await sessionWsApiManager.getSession(req);
    
    const refreshToken: string = String(await sessionHttpContext.store.get("refresh_token")) || "";
    const accessToken: string = String(await sessionWsContext.store.get("access_token")) || "";

    console.log("PAYLOAD REFRESH TOKEN");
    console.log(refreshToken);
    console.log(accessToken);
    
    return {
        sessionHttpContext,
        sessionWsContext,
        refreshToken,
        accessToken
    }
}


export interface IPUT_apiV1PublicBusinessWsTokensRefreshPayload {

}

export const PUT_apiV1PublicBusinessWsTokensRefreshPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_apiV1PublicBusinessWsTokensRefreshPayload> => {
    
    
    return {
    }
}


export interface IDELETE_apiV1PublicBusinessWsTokensRefreshPayload {

}

export const DELETE_apiV1PublicBusinessWsTokensRefreshPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_apiV1PublicBusinessWsTokensRefreshPayload> => {
    
    
    return {
    }
}