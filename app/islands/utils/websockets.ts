// src/types/websocket.ts (o donde quieras definir tus tipos)

// Metadatos para la solicitud del cliente
export interface IWebsocketClientRequestMeta {
    requestId?: string; // ID generado por el cliente para correlacionar la respuesta
    timestamp?: string; // Opcional: timestamp de envío desde el cliente
    // Otros metadatos del cliente si son necesarios
}

// Estructura general de una solicitud del cliente via WebSocket
export interface IWebsocketClientRequest {
    v?: number; // Versión del protocolo de mensajería (opcional, como ya usas 1)
    method: string; // El método o acción que el cliente solicita
    meta?: IWebsocketClientRequestMeta; // Metadatos opcionales de la solicitud
    data?: Record<string, any>; // Payload o argumentos de la solicitud
}