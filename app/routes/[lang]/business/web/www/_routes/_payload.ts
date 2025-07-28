
// @routes/[lang]/business/web/www/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebWWWPayload {
    actualLang: string;
}

export const GET_langBusinessWebWWWPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebWWWPayload> => {

    const session = ctx.state.sessions?.["sessionId"];
    
    const sessionAppConfiguration = ctx.state.sessions?.["appConfiguration"];
    const sessionWebConfiguration = ctx.state.sessions?.["webConfiguration"];

    await sessionAppConfiguration.store.set("is_app", false);
    await sessionWebConfiguration.store.set("is_web", true);

    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    

    return {
        actualLang
    }
}


export interface IPOST_langBusinessWebWWWPayload {

}

export const POST_langBusinessWebWWWPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebWWWPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebWWWPayload {

}

export const PUT_langBusinessWebWWWPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebWWWPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebWWWPayload {

}

export const DELETE_langBusinessWebWWWPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebWWWPayload> => {
    
    
    return {
    }
}