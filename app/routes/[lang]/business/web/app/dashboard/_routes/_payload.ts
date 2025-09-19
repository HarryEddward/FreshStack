
// @routes/[lang]/business/web/app/dashboard/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebAppDashboardPayload {
    actualLang: string;
    businessId: string;
}

export const GET_langBusinessWebAppDashboardPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebAppDashboardPayload> => {
    
    const session = ctx.state.sessions?.["sessionId"];
    const actualLang = await session.store.get<string>("lang") || "ca-mall";
    const businessId = await session.store.get<string>("business_id") || "";
    
    
    return {
        actualLang,
        businessId
    }
}


export interface IPOST_langBusinessWebAppDashboardPayload {

}

export const POST_langBusinessWebAppDashboardPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebAppDashboardPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebAppDashboardPayload {

}

export const PUT_langBusinessWebAppDashboardPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebAppDashboardPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebAppDashboardPayload {

}

export const DELETE_langBusinessWebAppDashboardPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebAppDashboardPayload> => {
    
    
    return {
    }
}