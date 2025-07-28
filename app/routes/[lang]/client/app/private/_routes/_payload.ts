// @routes/[lang]/client/_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IAllowLangs } from '@type/index.d.ts';


interface ITranslation {
    order_title?: string;
    ask_ticket?: string;
    change_lang?: string;
    placeholder_email?: string;
    terms_and_conditions?: string;
  }

export interface IGET_langClientAppPayload {
    actualLang: string;
    translation: ITranslation;
    notAcceptedTermsAndConditions: boolean;
    badFormatEmail: boolean;
    access_token: string;
}



export const GET_langClientAppPayload = async (req: Request, ctx: FreshContext<State>): Promise<IGET_langClientAppPayload> => {
    
    console.log("here?");
    const url = new URL(req.url);
    const notAcceptedTermsAndConditions: boolean = url.searchParams.get("not_accepted_terms_and_conditions") === "true" ? true : false || false;
    const badFormatEmail: boolean = url.searchParams.get("bad_format_email") === "true" ? true : false || false;
    
    
    const allowedLangs: IAllowLangs[] = ['ca-mall', 'es', 'de', 'en', 'fr', 'ar', 'it'];
    const isSetManualLang = url.searchParams.get("set_manual_lang");
    
    const sessionHttp = ctx.state.sessions?.["sessionId"];
    const sessionWs = ctx.state.sessions?.["wsSession"];
    const access_token = await sessionWs.store.get("access_token"); //await response.json();
    
    if(isSetManualLang) {
        const manualLang: string = allowedLangs.includes(url.searchParams.get("set_manual_lang") as IAllowLangs) ? url.searchParams.get("set_manual_lang") || 'es' : 'es';
        console.log("New Lang Set");
        //await session.delete("lang")
        ctx.state.lang = manualLang;
        await sessionHttp.store.set("lang", manualLang);
    }
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const sessionState = url.searchParams.get("session_state");

    sessionHttp.store.delete("terms_accepted");
    sessionHttp.store.delete("wants_ticket");
    await sessionHttp.store.delete("ticket_email");

    const actualLang = await sessionHttp.store.get("lang") as string || "ca-mall";
    console.log('actualLang: ');
    console.log(actualLang);
    const translation = await sessionHttp.store.get("translation") as ITranslation || {};

    return {
        actualLang,
        translation,
        notAcceptedTermsAndConditions,
        badFormatEmail,
        access_token: access_token as string
    }
}


export interface IPOST_langClientAppPayload {
    actualLang: string;
    rawData: Record<string, FormDataEntryValue>;
    formData: FormData;
}

export const POST_langClientAppPayload = async (req: Request, ctx: FreshContext<State>): Promise<IPOST_langClientAppPayload> => {
    
    const session = ctx.state.sessions?.["sessionId"];
    
    const formData = await req.formData();
    const rawData = Object.fromEntries(formData.entries());
    const actualLang = await session.store.get("lang") as string;

    return {
        actualLang,
        rawData,
        formData
    }
}