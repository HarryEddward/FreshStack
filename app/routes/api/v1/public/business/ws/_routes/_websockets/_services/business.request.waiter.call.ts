// @routes/api/v1/public/business/ws/_routes/_services/_services/bussines.request.waiter.call.ts

import { JSONWebsocketsStructure } from "@routes/api/v1/public/business/ws/_routes/_service.ts";
import { WebsocketResponseServerJSON } from "@utils/websockets.ts";

export async function businessRequestWaiterCallServiceWebsocket(socket: WebSocket, data: JSONWebsocketsStructure) {
    


    console.log("WS business.request.waiter.call");
    console.log(data.data);

    const params = new URLSearchParams(data.data as Record<string, string>);

    const res = await fetch(
        `http://localhost:3800/api/v1/model/business/findMany?${params}`,
        {
            method: "GET",
            
        }
    ).then((response) => { return response.json(); });

    console.log(res);

    WebsocketResponseServerJSON(socket, {
        status: 200,
        method: data.method,
        requestId: data.meta.requestId,
        data: {
            msg: res
        }
    });
    console.log('Llamando al camarero no tardará mucho!');
    
    
}