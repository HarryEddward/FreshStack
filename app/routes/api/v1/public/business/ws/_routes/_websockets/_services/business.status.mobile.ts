// @routes/api/v1/public/business/ws/_routes/_services/_services/bussines.status.mobile.ts

import { JSONWebsocketsStructure } from "@routes/api/v1/public/business/ws/_routes/_service.ts";
import { WebsocketResponseServerJSON } from "@utils/websockets.ts";

export async function businessStatusMobileServiceWebsocket(socket: WebSocket, data: JSONWebsocketsStructure) {
    
    WebsocketResponseServerJSON(socket, {
        status: 200,
        method: data.method,
        requestId: data.meta.requestId,
        data: {
            msg: "Everything is ok!"
        }
    });
    console.log('Todo ok!');
}