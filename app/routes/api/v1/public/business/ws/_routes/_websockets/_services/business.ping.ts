// @routes/api/v1/public/business/ws/_routes/_services/_services/bussines.ping.ts

import { JSONWebsocketsStructure } from "@routes/api/v1/public/business/ws/_routes/_service.ts";
import { WebsocketResponseServerJSON } from "@utils/websockets.ts";

export function businessPingServiceWebsocket(socket: WebSocket, data: JSONWebsocketsStructure) {
    WebsocketResponseServerJSON(socket, {
        status: 200,
        method: data.method,
        requestId: data.meta.requestId,
        data: {
            msg: "Pong"
        }
    });
    console.log('Pong');
}