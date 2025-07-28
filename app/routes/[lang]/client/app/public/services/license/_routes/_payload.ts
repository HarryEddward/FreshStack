
// @routes/[lang]/[license]/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { IAllowLangs } from "@type/index.d.ts";


export interface IGET_lang_licensePayload {
    errorLicense: boolean;

}

export const GET_lang_licensePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_lang_licensePayload> => {
    
    const session = ctx.state.sessions?.["sessionId"];
    const errorLicense = await session.store.get("error_license") === "true" ? true : false  || false;
    

    const url = new URL(req.url);
    const redirectUrl = url.searchParams.get("redirect_url");


    if (redirectUrl && typeof redirectUrl === "string") {
        session.store.set('redirect_url', redirectUrl);
    };
    


    return {
        errorLicense
    }
}


/**
 * Hay que borrar lo que son los url's de los tipos de dispositivos, para
 * evitar conflictos en futuro.
 * Por hora se usa una URL directo de aprametros, luego se borra y se aplica directamente
 * como url eivtadno redundacias o especificaciones muy concretas.
 */
export interface IPOST_lang_licensePayload {

    urlTypeWeb: string | null;
    urlTypeApp: string | null;
    isApp: boolean | null;
    isWeb: boolean | null;
    redirectUrl: string;
    lang: IAllowLangs;
}

export const POST_lang_licensePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_lang_licensePayload> => {

    console.log("licensePayload");
    
    const formData = await req.formData();

    const codeLicense = formData.get("code_license");
    const phoneLicense = formData.get("phone_license");

    console.log("Code License: " + codeLicense);
    console.log("Phone License: " + phoneLicense);

    const sessionAppConfiguration = ctx.state.sessions?.["appConfiguration"];
    const sessionWebConfiguration = ctx.state.sessions?.["webConfiguration"];
    const session = ctx.state.sessions?.["sessionId"];

    const lang = await session.store.get<string>("lang") as IAllowLangs || "ca-mall";


    const isApp = await sessionAppConfiguration.store.get<boolean>("is_app");
    const isWeb = await sessionWebConfiguration.store.get<boolean>("is_web");

    const urlTypeWeb = await sessionWebConfiguration.store.get<string>("url_type_web"); //"/business/web/www";
    const urlTypeApp = await sessionAppConfiguration.store.get<string>("url_type_app"); //"/client/app/private/step_before";
    
    const redirectUrl = await session.store.get<string>('redirect_url') || "/";
    if (redirectUrl) {
        await session.store.delete('redirect_url');
    };

    console.log("urlTypeWeb: " + urlTypeWeb);
    console.log("urlTypeApp: " + urlTypeApp);

    await session.store.set("license", codeLicense);
    await session.store.set("phone_license", phoneLicense);
    
    return {
        urlTypeWeb,
        urlTypeApp,
        isApp,
        isWeb,
        redirectUrl,
        lang
    }
}


export interface IPUT_lang_licensePayload {

}

export const PUT_lang_licensePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_lang_licensePayload> => {
    
    
    return {
    }
}


export interface IDELETE_lang_licensePayload {

}

export const DELETE_lang_licensePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_lang_licensePayload> => {
    
    
    return {
    }
}