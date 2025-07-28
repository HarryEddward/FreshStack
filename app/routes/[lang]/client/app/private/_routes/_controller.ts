// @routes/[lang]/client/_controller.ts

import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";
import { GET_langClientAppPayload, POST_langClientAppPayload } from "./_payload.ts";
import { POST_langClientApp_formSchema } from './_validation.ts';
import { GET_langClientAppService, POST_langClientAppService } from './_service.ts';


export const GET_langClientAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {
    
    /**
     * Que usa?:
     * - Payload
     * - Service
     * - Response
     */

    try {

        const payload = await GET_langClientAppPayload(req, ctx);
        return GET_langClientAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    
};


/**
 * El controlador se encarga de menjar la petición al servicio correspondiente. Trata los tiapdos de forma muy explicita, 
 * de forma que sea predecible los errores de tiapdos que puedan ocurrir. Y al pasar a _service.ts, se encarga de procesar
 * la solicitud y devolver la respuesta correspondiente.
 * @param req 
 * @param ctx 
 * @returns Response
 */

export const POST_langClientAppController = async (req: Request, ctx: FreshContext<State>): Promise<Response> => {
    
    /**
     * Que usa?:
     * - Payload
     * - Service
     * - Validation
     * - Response
     */

    try {
        console.log('-- langClientAppController --');

        const payload = await POST_langClientAppPayload(req, ctx);
        return POST_langClientAppService({ req, ctx, payload });


    } catch (err) {
        return new Response("Internal Server Error", { status: 500 });
    }
    

};