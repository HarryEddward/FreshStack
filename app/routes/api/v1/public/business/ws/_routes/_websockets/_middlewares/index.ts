// @routes/api/v1/public/business/ws/_routes/_websockets/_middlewares/index.ts

import { fastifyApiRequestWebsocket } from "@routes/api/v1/public/business/ws/_routes/_websockets/_middlewares/fastifyApiRequest.ts";

const middlewares = [
    fastifyApiRequestWebsocket
];

export async function WebsocketRPCMiddlewares(socket: WebSocket, data: any) {
    // This function is a placeholder for the Websocket RPC middleware.
    // It can be used to handle RPC calls over WebSockets.
    
    for (const middleware of middlewares) {
        try {
            await middleware(socket, data);
        } catch (error) {
            console.error("Error in Websocket RPC Middleware:", error);
            // Optionally, you can send an error response back to the client
            socket.send(JSON.stringify({
                status: 500,
                method: data.method,
                requestId: data.meta.requestId,
                data: {
                    msg: "Internal server error"
                }
            }));
        }
    }
}