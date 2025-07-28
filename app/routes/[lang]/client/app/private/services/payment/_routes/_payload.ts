
// @routes/[lang]/client/app/private/services/payment/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IAllowLangs } from "@type/index.d.ts";
import { importTranslation } from "@utils/translation.ts";



interface ITranslation {
    order_title?: string;
    ask_ticket?: string;
    change_lang?: string;
    placeholder_email?: string;
    terms_and_conditions?: string;
};

interface ITranslationClientAppCommonShoppingTab {
    products: string;
    payment: string;
    transaction: string;
}

interface ITranslationClientAppCommon {
    shopping_tab: ITranslationClientAppCommonShoppingTab;
};

export interface IGET_langClientAppPaymentPayload {
    actualLang: IAllowLangs;
    translation: ITranslation;
    translationClientAppCommon: ITranslationClientAppCommon;
    badFormatCvc: boolean;
    badFormatExpireDate: boolean;
    badFormatCardNumber: boolean;
};

export const GET_langClientAppPaymentPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langClientAppPaymentPayload> => {

    const session = ctx.state.sessions?.["sessionId"];
    
    const translation = await session.store.get("translation") as ITranslation || {};
    const actualLang: IAllowLangs = await session.store.get("lang") as IAllowLangs || "en";
    const translationClientAppCommon = await importTranslation<ITranslation>(actualLang, "client/app/common.json") as ITranslationClientAppCommon;
    const url = new URL(req.url);

    const badFormatCvc: boolean = url.searchParams.get("bad_format_cvc") === "true" ? true : false || false;
    const badFormatExpireDate: boolean = url.searchParams.get("bad_format_expire_date") === "true" ? true : false || false;
    const badFormatCardNumber: boolean = url.searchParams.get("bad_format_card_number") === "true" ? true : false || false;

    return {
        actualLang,
        translationClientAppCommon,
        translation,
        badFormatCvc,
        badFormatExpireDate,
        badFormatCardNumber
    }
}


export interface IPOST_langClientAppPaymentPayload {
    rawData: Record<string, FormDataEntryValue>;
    actualLang: IAllowLangs;
    url: URL;
}

export const POST_langClientAppPaymentPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langClientAppPaymentPayload> => {

    const session = ctx.state.sessions?.["sessionId"];
    
    const formData = await req.formData();
    const rawData = Object.fromEntries(formData.entries());
    const actualLang: IAllowLangs = await session.store.get("lang") as IAllowLangs || "en";
    const url = new URL(req.url);

    return {
        rawData,
        actualLang,
        url
    }
}


export interface IPUT_langClientAppPaymentPayload {

}

export const PUT_langClientAppPaymentPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langClientAppPaymentPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langClientAppPaymentPayload {

}

export const DELETE_langClientAppPaymentPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langClientAppPaymentPayload> => {
    
    
    return {
    }
}