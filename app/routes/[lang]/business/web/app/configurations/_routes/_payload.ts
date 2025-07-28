
// @routes/[lang]/business/web/app/configurations/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppConfigurationsPayload {
    actualLang: string;
}

export const GET_langBusinessWebAppConfigurationsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppConfigurationsPayload> => {
    
    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    
    
    return {
        actualLang
    }
}


export interface IPOST_langBusinessWebAppConfigurationsPayload {

}

export const POST_langBusinessWebAppConfigurationsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppConfigurationsPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppConfigurationsPayload {

}

export const PUT_langBusinessWebAppConfigurationsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppConfigurationsPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppConfigurationsPayload {

}

export const DELETE_langBusinessWebAppConfigurationsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppConfigurationsPayload> => {
    
    
    return {
    }
}