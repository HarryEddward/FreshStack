export const _payload: string = `
// <%= componentPathRouter %>/_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";


export interface IGET_<%= componentName %>Payload {

}

export const GET_<%= componentName %>Payload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_<%= componentName %>Payload> => {
    
    
    return {
    }
}


export interface IPOST_<%= componentName %>Payload {

}

export const POST_<%= componentName %>Payload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_<%= componentName %>Payload> => {
    
    
    return {
    }
}


export interface IPUT_<%= componentName %>Payload {

}

export const PUT_<%= componentName %>Payload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_<%= componentName %>Payload> => {
    
    
    return {
    }
}


export interface IDELETE_<%= componentName %>Payload {

}

export const DELETE_<%= componentName %>Payload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_<%= componentName %>Payload> => {
    
    
    return {
    }
}`;