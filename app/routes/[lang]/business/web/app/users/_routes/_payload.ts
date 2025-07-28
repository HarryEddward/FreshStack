
// @routes/[lang]/business/web/app/users/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppUsersPayload {
    actualLang: string;
}

export const GET_langBusinessWebAppUsersPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppUsersPayload> => {

    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    
    
    return {
        actualLang
    }
}


export interface IPOST_langBusinessWebAppUsersPayload {

}

export const POST_langBusinessWebAppUsersPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppUsersPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppUsersPayload {

}

export const PUT_langBusinessWebAppUsersPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppUsersPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppUsersPayload {

}

export const DELETE_langBusinessWebAppUsersPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppUsersPayload> => {
    
    
    return {
    }
}