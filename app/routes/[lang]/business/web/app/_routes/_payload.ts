
// @routes/[lang]/business/web/app/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppPayload {
    actualLang: string;
}

export const GET_langBusinessWebAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppPayload> => {

    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    

    return {
        actualLang
    };
}


export interface IPOST_langBusinessWebAppPayload {

}

export const POST_langBusinessWebAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppPayload {

}

export const PUT_langBusinessWebAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppPayload {

}

export const DELETE_langBusinessWebAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppPayload> => {
    
    
    return {
    }
}