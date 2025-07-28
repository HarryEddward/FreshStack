// @routes/api/v1/public/business/ws/_routes/_websockets/_middlewares/fastifyApiRequest.ts

import { resolvePath } from "@utils/api/ws/resolvers.ts";
import { JSONWebsocketsStructure } from "@routes/api/v1/public/business/ws/_routes/_service.ts";
import { WebsocketResponseServerJSON } from "@utils/websockets.ts";
import { config } from "@config/index.ts";

export async function fastifyApiRequestWebsocket(
    socket: WebSocket,
    data: JSONWebsocketsStructure
): Promise<void> {
    const rawApiPath = resolvePath(data.method);
    const isValidApiPath = rawApiPath.startsWith("/api/v1/");

    console.log("Is API path valid?", isValidApiPath);

    if (!isValidApiPath) return;

    try {
        const init: RequestInit = data.data.init;
        const encodedParams = encodeURIComponent(data.data.params); // ❗ ya es string (probablemente JSON stringificado)
        
        const querySuffix = encodedParams ? `?q=${encodedParams}` : "";
        const fullUrl = `${config.mainApiUrl}${rawApiPath}${querySuffix}`;

        console.log("Encoded query:", encodedParams);
        console.log("Requesting URL:", fullUrl);

        const response = await fetch(fullUrl, init);
        const contentType = response.headers.get("content-type") || "";

        const responseData = contentType.includes("application/json")
            ? await response.json()
            : await response.text(); // Evita errores si viene HTML

        WebsocketResponseServerJSON(socket, {
            status: response.status,
            method: data.method,
            requestId: data.meta.requestId,
            data: responseData
        });
    } catch (error: any) {
        console.error("API request failed:", error);

        WebsocketResponseServerJSON(socket, {
            status: 500,
            method: data.method,
            requestId: data.meta.requestId,
            data: {
                msg: `Error fetching data from API: ${error.message}`
            }
        });
    }
}
