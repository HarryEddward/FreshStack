
// @routes/[lang]/web/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langWebPayload {

}

export const GET_langWebPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langWebPayload> => {
    
    
    return {
    }
}


export interface IPOST_langWebPayload {
    selectedWebApp: string;
}

export const POST_langWebPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langWebPayload> => {
    
    const formData = await req.formData();
    const selectedWebApp = String(formData.get("url_type_web")) || "/business/web/app/dashboard";

    const sessionWebConfiguration = ctx.state.sessions?.["webConfiguration"];

    await sessionWebConfiguration.store.set("url_type_web", selectedWebApp);
    console.log("Url Type Web")
    console.log(await sessionWebConfiguration.store.get("url_type_web"));
    
    
    return {
        selectedWebApp
    }
}


export interface IPUT_langWebPayload {

}

export const PUT_langWebPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langWebPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langWebPayload {

}

export const DELETE_langWebPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langWebPayload> => {
    
    
    return {
    }
}