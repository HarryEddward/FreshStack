// @routes/api/v1/public/business/ws/_routes/_services/_services.ts

import { businessPingServiceWebsocket } from "@routes/api/v1/public/business/ws/_routes/_websockets/_services/business.ping.ts";
import { businessStatusMobileServiceWebsocket } from '@routes/api/v1/public/business/ws/_routes/_websockets/_services/business.status.mobile.ts';
import { businessRequestWaiterCallServiceWebsocket } from '@routes/api/v1/public/business/ws/_routes/_websockets/_services/business.request.waiter.call.ts';
import { JSONWebsocketsStructure } from "@routes/api/v1/public/business/ws/_routes/_service.ts";
import { WebsocketResponseServerJSON } from '@utils/websockets.ts';
import { WebsocketRPCMiddlewares } from "@routes/api/v1/public/business/ws/_routes/_websockets/_middlewares/index.ts";

export const serviceRequestProcessor = async (socket: WebSocket, data: JSONWebsocketsStructure) => {

    console.log(data);
    const obtainFunctionService = websocketServices[data.method];
    await WebsocketRPCMiddlewares(socket, data);

    if (obtainFunctionService) {
        await obtainFunctionService(socket, data);
    }
    /*
    El middleware puede ser un proxy como cliente de otra API, y se debe de respestar no como función existente sino como proxy
    en este caso se debe de hacer un proxy a la función que se llama, y no a la función que se llama directamente
    */

    /*else {
        WebsocketResponseServerJSON(socket, {
            status: 404,
            method: data.method,
            requestId: data.meta.requestId,
            data: {
                msg: "Doesn't exists that function"
            }
        });

    }*/
}
type Props = Record<string, Function>;

export const websocketServices: Props = {

    "business.ping": businessPingServiceWebsocket,
    "business.request.waiter.call": businessRequestWaiterCallServiceWebsocket,
    "business.status.mobile": businessStatusMobileServiceWebsocket,

}