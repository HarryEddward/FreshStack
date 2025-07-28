// @routes/api/v1/public/business/ws/_routes/_services/_services/bussines.redirect.api.ts

import { JSONWebsocketsStructure } from "@routes/api/v1/public/business/ws/_routes/_service.ts";
import { WebsocketResponseServerJSON } from "@utils/websockets.ts";
import { resolvePath } from '@utils/api/ws/resolvers.ts';

export async function businessRedirectApiServiceWebsocket(socket: WebSocket, data: JSONWebsocketsStructure) {
    

    const dataRequestInit = data.data.RequestInit as RequestInit;
    const paramsUrl = data.data.params as URLSearchParams;


    const res = await fetch(
        `http://localhost:3800/api/v1/model/business/findMany?${paramsUrl}`,
        dataRequestInit
    )
    .then((response) => { return response.json(); })
    .catch((error) => {
        WebsocketResponseServerJSON(socket, {
            status: 500,
            method: data.method,
            requestId: data.meta.requestId,
            data: {
                msg: "Error fetching data from API: " + error.message
            }
        });
        return null;
    });

    console.log(res);

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