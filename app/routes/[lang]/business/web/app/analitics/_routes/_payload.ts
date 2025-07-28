
// @routes/[lang]/business/web/app/analitics/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppAnaliticsPayload {
    actualLang: string;
}

export const GET_langBusinessWebAppAnaliticsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppAnaliticsPayload> => {
    
    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    
    
    return {
        actualLang
    }
}


export interface IPOST_langBusinessWebAppAnaliticsPayload {

}

export const POST_langBusinessWebAppAnaliticsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppAnaliticsPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppAnaliticsPayload {

}

export const PUT_langBusinessWebAppAnaliticsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppAnaliticsPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppAnaliticsPayload {

}

export const DELETE_langBusinessWebAppAnaliticsPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppAnaliticsPayload> => {
    
    
    return {
    }
}