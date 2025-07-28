
// @routes/api/v1/public/business/ws/_routes//_service.ts


import { FreshContext } from '$fresh/server.ts';
import { State } from "@middleware/sessionHandler.ts";

import {
    IGET_apiV1PublicBusinessWsPayload,
    IPOST_apiV1PublicBusinessWsPayload,
    IPUT_apiV1PublicBusinessWsPayload,
    IDELETE_apiV1PublicBusinessWsPayload,
} from "@routes/api/v1/public/business/ws/_routes/_payload.ts";

import {
    GET_apiV1PublicBusinessWsResponse_Success,
    POST_apiV1PublicBusinessWsResponse_Success,
    DELETE_apiV1PublicBusinessWsResponse_Success,
    PUT_apiV1PublicBusinessWsResponse_Success,
} from "@routes/api/v1/public/business/ws/_routes/_response.ts";

import {
    GET_apiV1PublicBusinessWsFormSchema,
    POST_apiV1PublicBusinessWsFormSchema,
    DELETE_apiV1PublicBusinessWsFormSchema,
    PUT_apiV1PublicBusinessWsFormSchema,
    JSONWebsocketsStructureFormSchema,
} from "@routes/api/v1/public/business/ws/_routes/_validation.ts";

import { serviceRequestProcessor, websocketServices } from "@routes/api/v1/public/business/ws/_routes/_websockets/_services.ts";
import { sessionWsApiManager } from '@utils/api/cookieProcessor.ts';
import { verifyJwt, verifyOrRefreshToken } from "@utils/jwt.ts";
const sockets = new Set<WebSocket>();


export interface JSONWebsocketsStructure {
    v: number;
    method: string;
    meta: Record<any, any>;
    data: Record<any, any>;
}

export interface IGET_apiV1PublicBusinessWsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IGET_apiV1PublicBusinessWsPayload;
};

export const GET_apiV1PublicBusinessWsService = async ({
    req,
    ctx,
    payload
}: IGET_apiV1PublicBusinessWsService): Promise<Response> => {

    const sessionWsContext = await sessionWsApiManager.getSession(req);
    const accessToken = String(await sessionWsContext.store.get("access_token")) || "";

    //console.log(accessToken);
    if (!accessToken) {
        return new Response("Unauthorized", { status: 401 });
    };

    try {
    await verifyJwt(accessToken);
  } catch (_err) {
    // Si el token no es válido, intenta refrescarlo
    const refreshRes = await fetch(
      "https://10.241.157.225:8000/api/v1/public/business/ws/tokens/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: req.headers.get("cookie") ?? "",
        },
      }
    );

    const refreshJson = await refreshRes.json();

    // Si el refresh fue exitoso, devolver el JWT como JSON
    if (!refreshRes.ok) {
        // Si el refresh falla también, devolver 401
        console.error("Keycloak response:", JSON.stringify(refreshJson));
        return new Response(JSON.stringify({ error: "Token refresh failed" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }
    
    //ws.close(4001, 'Token inválido');
    
  }


    



    const { socket, response } = Deno.upgradeWebSocket(req);

    


    socket.onopen = () => {
      sockets.add(socket);
      console.log("Cliente conectado");
      
    };

    socket.onmessage = (e) => {

        try {
            const data: JSONWebsocketsStructure | unknown = JSON.parse(e.data);
            const resultValidation = JSONWebsocketsStructureFormSchema.safeParse(data);

            if (!resultValidation.success) {
                console.log(resultValidation.error.flatten())
                console.log("La valdiación de la información fué fallida");
            } else {
                console.log("La valdiación de la información es exitosa");
                serviceRequestProcessor(socket, resultValidation.data);
            };

        } catch (e) {
            socket.send(JSON.stringify({ error: "Server error" }));
            console.error("WebSocket message processing failed:", e);
        }
      
        


        // Broadcast
        /*sockets.forEach((s) => {
            if (s !== socket) s.send(e.data);
        });*/
    };

    socket.onclose = () => {
      sockets.delete(socket);
      console.log("Cliente desconectado");
    };

    

    return response;


    return await GET_apiV1PublicBusinessWsResponse_Success(req, ctx, payload);
};




export interface IPOST_apiV1PublicBusinessWsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPOST_apiV1PublicBusinessWsPayload;
};


export const POST_apiV1PublicBusinessWsService = async ({
    req,
    ctx,
    payload
}: IPOST_apiV1PublicBusinessWsService): Promise<Response> => {


    const validation = POST_apiV1PublicBusinessWsFormSchema.safeParse(payload.rawData);

    return await POST_apiV1PublicBusinessWsResponse_Success(req, ctx, payload, validation);

};



export interface IPUT_apiV1PublicBusinessWsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IPUT_apiV1PublicBusinessWsPayload;
};

export const PUT_apiV1PublicBusinessWsService = async ({
    req,
    ctx,
    payload
}: IPUT_apiV1PublicBusinessWsService): Promise<Response> => {


    return await PUT_apiV1PublicBusinessWsResponse_Success(req, ctx, payload);
};



export interface IDELETE_apiV1PublicBusinessWsService {
    req: Request;
    ctx: FreshContext<State>;
    payload: IDELETE_apiV1PublicBusinessWsPayload;
};

export const DELETE_apiV1PublicBusinessWsService = async ({
    req,
    ctx,
    payload
}: IDELETE_apiV1PublicBusinessWsService): Promise<Response> => {


    return await DELETE_apiV1PublicBusinessWsResponse_Success(req, ctx, payload);
}
