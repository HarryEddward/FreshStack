
// @routes/[lang]/business/web/app/multibusiness/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppMultibusinessPayload {
    actualLang: string;
}

export const GET_langBusinessWebAppMultibusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppMultibusinessPayload> => {

    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    
    return {
        actualLang
    }
}


export interface IPOST_langBusinessWebAppMultibusinessPayload {

}

export const POST_langBusinessWebAppMultibusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppMultibusinessPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppMultibusinessPayload {

}

export const PUT_langBusinessWebAppMultibusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppMultibusinessPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppMultibusinessPayload {

}

export const DELETE_langBusinessWebAppMultibusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppMultibusinessPayload> => {
    
    
    return {
    }
}