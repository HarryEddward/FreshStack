
// @routes/[lang]/app/_routes/_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langAppPayload {

}

export const GET_langAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langAppPayload> => {

    const sessionAppConfiguration = ctx.state.sessions?.["appConfiguration"];
    const sessionWebConfiguration = ctx.state.sessions?.["webConfiguration"];

    await sessionAppConfiguration.store.set("is_app", true);
    await sessionWebConfiguration.store.set("is_web", false);
    
    
    return {
    }
}


export interface IPOST_langAppPayload {
    selectedMobileApp: string;
}

export const POST_langAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langAppPayload> => {

    const formData = await req.formData();
    const selectedMobileApp = String(formData.get("url_type_app")) || "/client/app/private/step_before";

    const sessionAppConfiguration = ctx.state.sessions?.["appConfiguration"];

    await sessionAppConfiguration.store.set("url_type_app", selectedMobileApp);
    console.log("Url Type App")
    console.log(await sessionAppConfiguration.store.get("url_type_app"));

    return {
        selectedMobileApp
    }
}


export interface IPUT_langAppPayload {

}

export const PUT_langAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langAppPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langAppPayload {

}

export const DELETE_langAppPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langAppPayload> => {
    
    
    return {
    }
}