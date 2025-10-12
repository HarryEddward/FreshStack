
// @router/[lang]/hello/_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_langBusinessPayload {

}

export const GET_langBusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langBusinessPayload> => {
    
    
    return {
    }
}


export interface IPOST_langBusinessPayload {

}

export const POST_langBusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langBusinessPayload> => {
    
    
    return {
    }
}


export interface IPUT_langBusinessPayload {

}

export const PUT_langBusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langBusinessPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langBusinessPayload {

}

export const DELETE_langBusinessPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langBusinessPayload> => {
    
    
    return {
    }
}