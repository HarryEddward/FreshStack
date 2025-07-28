
// @routes/[lang]/client/[step_before]/_routes//_payload.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { config } from "@config/index.ts";
import { getCookies } from 'https://deno.land/std/http/cookie.ts';


interface IGET_langClient_step_beforePayload_businessConfigurationBusinessConfiguration {
    //id?: string;
    wifi?: {
        enabled: boolean;
        password: string;
    };
    schedule?: {
        morning?: {
            open: string;
            close: string;
        };
        afternoon?: {
            open: string;
            close: string;
        }
    };
    functionsActivated?: {
        orders?: {
            manual?: string;
            automatized?: string;
        }
    };
    /*apiKey?: {
        sumup?: {
            key?: boolean;
            activated?: boolean;
        };
        google_drive?: {
            key?: boolean;
            activated?: boolean;
        };
    };*/
    //affiliate?: boolean;
    //maxPhonesDevices?: number;
    displayUsername?: string;
    //createdAt?: string;
    //updatedAt?: string;

}

interface IGET_langClient_step_beforePayload_businessConfigurationBusiness {
    configuration: IGET_langClient_step_beforePayload_businessConfigurationBusinessConfiguration
}

interface IGET_langClient_step_beforePayload_businessConfiguration {
    business: IGET_langClient_step_beforePayload_businessConfigurationBusiness
}

export interface IGET_langClient_step_beforePayload {
    businessConfiguration: IGET_langClient_step_beforePayload_businessConfiguration | null;
}

export const GET_langClient_step_beforePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IGET_langClient_step_beforePayload | Response> => {

    console.log("GET_langClient_step_beforePayload");
    
    const session = ctx.state.sessions?.["sessionId"];
    const cookies = req.headers.get("cookie");

    //console.log(JSON.stringify(getCookies(req.headers.)));

    const license = await session.store.get("license");
    console.log(license);
    const lang = await session.store.get("lang");
    console.log(lang);

    const newPath = `/${lang}/license`;
    const licenseFailedPage = new URL(newPath, req.url);

    const queryBusiness = encodeURIComponent(JSON.stringify({ 
        "where": { "id": license },
        "select": {
            "business": {
                "select": {
                    "configuration": {
                        "select": {
                            "wifi": true,
                            "schedule": true,
                            "functionsActivated": true,
                            "displayUsername": true
                        }
                    },
                },
            },
        },
    }));
    
    const responseBusinessConfiguration = await fetch(`${config.mainApiUrl}/api/v1/model/businessLicense/findUnique?q=${queryBusiness}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookies ?? ""
        },
    });

    if (!responseBusinessConfiguration.ok) {
      console.error(`Error al hacer fetch: ${responseBusinessConfiguration.statusText}`);
      await session.store.set("error_license", "true");
      
      return Response.redirect(licenseFailedPage, 307);
    }

    const businessConfigurationRaw = await responseBusinessConfiguration.json(); // Ej: { data: [...] }
    console.log(businessConfigurationRaw);

    const businessConfiguration = businessConfigurationRaw?.["data"];
    console.log(businessConfiguration);

    return {
        businessConfiguration
    }
}


export interface IPOST_langClient_step_beforePayload {

}

export const POST_langClient_step_beforePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPOST_langClient_step_beforePayload> => {
    
    
    return {
    }
}


export interface IPUT_langClient_step_beforePayload {

}

export const PUT_langClient_step_beforePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IPUT_langClient_step_beforePayload> => {
    
    
    return {
    }
}


export interface IDELETE_langClient_step_beforePayload {

}

export const DELETE_langClient_step_beforePayload = async (
    req: Request,
    ctx: FreshContext<State>
): Promise<IDELETE_langClient_step_beforePayload> => {
    
    
    return {
    }
}