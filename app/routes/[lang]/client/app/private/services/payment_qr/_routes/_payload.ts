
// @routes/[lang]/client/app/private/services/payment_qr/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { importTranslation } from "@utils/translation.ts";
import { IAllowLangs } from "@type/index.d.ts";


export interface ITranslationClientAppCommonShoppingTab {
  products: string;
  payment: string;
}


interface ITranslationClientAppCommon {
  shopping_tab: ITranslationClientAppCommonShoppingTab;
};


export interface IGET_langClientAppPaymentQrPayload {
  actualLang: IAllowLangs;
  translationClientAppCommon: ITranslationClientAppCommonShoppingTab;
  business_id: string;
  license: string;
};

export const GET_langClientAppPaymentQrPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langClientAppPaymentQrPayload> => {


    const session = ctx.state.sessions?.["sessionId"];
    
    const business_id = String(await session.store.get("business_id")) || "";
    const license = String(await session.store.get("license")) || "";
    const actualLang: IAllowLangs = await session.store.get("lang") as IAllowLangs || "en";
    const translationClientAppCommon = await importTranslation<ITranslationClientAppCommonShoppingTab>(actualLang, "client/app/common.json") as ITranslationClientAppCommonShoppingTab
    
    //console.log(translationClientAppCommon);
    
    return {
        actualLang,
        translationClientAppCommon,
        business_id,
        license
    };
}


export interface IPOST_langClientAppPaymentQrPayload {

}

export const POST_langClientAppPaymentQrPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langClientAppPaymentQrPayload> => {
    
    
    return {
    }
}


export interface IPUT_langClientAppPaymentQrPayload {

}

export const PUT_langClientAppPaymentQrPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langClientAppPaymentQrPayload> => {
    
    
    return {
    }
}


export interface IDELETE_langClientAppPaymentQrPayload {

}

export const DELETE_langClientAppPaymentQrPayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langClientAppPaymentQrPayload> => {
    
    
    return {
    }
}