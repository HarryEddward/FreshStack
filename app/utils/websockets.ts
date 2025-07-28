
interface IWebsocketResponseServerJSON_ResponseMeta {
    requestId?: string;
    timestamp?: string;
}

interface IWebsocketResponseServerJSON {
    status: number;
    method?: string;
    requestId?: string;
    meta?: IWebsocketResponseServerJSON_ResponseMeta;
    data?: Record<any, any>
};

export const WebsocketResponseServerJSON = (socket: WebSocket, { status, method, requestId, data, meta }: IWebsocketResponseServerJSON) => {

    socket.send(JSON.stringify({
        status: status,
        method: method || '',
        response: {
            meta: {
                requestId,
                timestamp: meta?.timestamp || new Date().toISOString()
            },
            data: data || {}
        }
    }));

}
