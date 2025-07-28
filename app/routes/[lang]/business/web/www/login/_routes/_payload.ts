
// @routes/[lang]/business/web/www/login/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessWebWWWLoginPayload {
    uri: URL;
}


import { Handlers, PageProps } from '$fresh/server.ts';
import { oauth2ClientWeb } from "@utils/oauth_client.ts";
import ClientAppLoginIslandView from '@islands/routes/[lang]/client/app/login/View.tsx';


export const GET_langBusinessWebWWWLoginPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessWebWWWLoginPayload> => {

    console.log("Login route");
    const { uri, codeVerifier } = await oauth2ClientWeb.code.getAuthorizationUri();
    console.log("uri", uri);

    const session = ctx.state.sessions?.["sessionId"];
    await session.store.set("code_verifier", codeVerifier);

    console.log(await session.store.get("code_verifier"));
    console.log(JSON.stringify(await session.store.getAll()));
    
    
    return {
        uri
    }
}


export interface IPOST_langBusinessWebWWWLoginPayload {

}

export const POST_langBusinessWebWWWLoginPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessWebWWWLoginPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessWebWWWLoginPayload {

}

export const PUT_langBusinessWebWWWLoginPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessWebWWWLoginPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessWebWWWLoginPayload {

}

export const DELETE_langBusinessWebWWWLoginPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessWebWWWLoginPayload> => {
    
    
    return {
    }
}