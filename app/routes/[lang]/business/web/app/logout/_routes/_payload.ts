
// @routes/[lang]/business/web/app/logout/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppLogoutPayload {
    actualLang: string;
    businessId: string;
}

export const GET_langBusinessWebAppLogoutPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppLogoutPayload> => {
    
    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    const businessId = await session.store.get<string>("business_id") || "";

    await session.store.delete('access_token');
    await session.store.delete('refresh_token');
    await session.store.delete("license");
    await session.store.delete("phone_license");
    
    
    return {
        actualLang,
        businessId
    }
}


export interface IPOST_langBusinessWebAppLogoutPayload {

}

export const POST_langBusinessWebAppLogoutPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppLogoutPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppLogoutPayload {

}

export const PUT_langBusinessWebAppLogoutPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppLogoutPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppLogoutPayload {

}

export const DELETE_langBusinessWebAppLogoutPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppLogoutPayload> => {
    
    
    return {
    }
}