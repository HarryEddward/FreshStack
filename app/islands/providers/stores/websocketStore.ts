// @islands/providers/stores/websocketStore.ts
import { create } from "zustand"; // O la versión que uses
import { IWebsocketClientRequest, IWebsocketClientRequestMeta } from '@islands/utils/websockets.ts'; // Asegúrate de la ruta correcta
import { useClientStore } from "@islands/hooks/useClientStore.ts";
import { config } from "@config/frontend/index.ts";

// IMPORTANTE: Reemplaza 'localhost' con la dirección IP correcta.
const WS_URL_PARAMS = new URLSearchParams({
    access_token: "access_token"
});
const WS_URL: string = `${config.backendEndpointWs}/api/v1/public/business/ws?${WS_URL_PARAMS}`;

// Define la forma del estado de tu store
interface WebSocketState {
  socket: WebSocket | null;
  isConnected: boolean;
  reconnectDelay: number; // Retraso para la reconexión
  lastMessage: any | null; // O el tipo de tus mensajes recibidos

  // Puedes añadir aquí más estado relevante, como un historial de mensajes, etc.
}

// Define la forma de las acciones de tu store
interface WebSocketActions {
  connect: () => void;
  disconnect: (code?: number, reason?: string) => void;
  sendWebsocketMessage: (method: string, data?: Record<string, any>, meta?: IWebsocketClientRequestMeta) => void;
  scheduleReconnect: () => void;
  // Acciones internas llamadas por los eventos del socket
  handleOpen: () => void;
  handleMessage: (event: MessageEvent) => void;
  handleClose: (event: CloseEvent) => void;
  handleError: (event: Event) => void;

  // Variables internas que no son estado pero el store necesita mantener
  _reconnectTimerId: number | null;
}

// Combina estado y acciones en un solo tipo para el store
export type WebSocketStore = WebSocketState & WebSocketActions;

// Variable para mantener el ID del temporizador de reconexión fuera del estado reactivo si es necesario
// Aunque podemos ponerlo en el store como estado si no nos preocupa que cambie
// Pero para evitar re-renders innecesarios causados SOLO por el cambio del timerId, lo manejamos internamente.
let reconnectTimerId: number | null = null;

// Crea el store
export const useWebSocketStoreZustand = create<WebSocketStore>((set, get) => ({
  // Estado inicial
  socket: null,
  isConnected: false,
  reconnectDelay: 1000, // Empieza en 1 segundo
  lastMessage: null,
  _reconnectTimerId: null, // Mantenerlo aquí permite accederlo via get()

  // Acciones
  connect: () => {
    const { socket, _reconnectTimerId, scheduleReconnect, handleOpen, handleMessage, handleClose, handleError } = get();

    // Limpiar cualquier socket o temporizador existente antes de crear uno nuevo
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        console.log('Closing existing socket before attempting new connection');
        // Usamos código 1000 y una razón especial para que handleClose no programe una reconexión inmediata
        socket.close(1000, 'Attempting Reconnect/New Connection');
    }
     if (_reconnectTimerId !== null) {
         clearTimeout(_reconnectTimerId);
         set({ _reconnectTimerId: null });
     }


    console.log(`Attempting to connect to ${WS_URL}`);

    

    const ws = new WebSocket(WS_URL);

    console.log(ws.url);
    

    // Configurar los manejadores de eventos
    ws.onopen = handleOpen;
    ws.onmessage = handleMessage;
    ws.onclose = handleClose;
    ws.onerror = handleError;

    // Actualizar el estado con la nueva instancia del socket
    set({ socket: ws });
  },

  disconnect: (code = 1000, reason = 'Client disconnecting') => {
      const { socket, _reconnectTimerId } = get();
      if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
          console.log('Explicitly closing WebSocket');
          socket.close(code, reason); // Usar código 1000 para cierre normal
      }
       // Asegurarse de limpiar el temporizador también en desconexión explícita
       if (_reconnectTimerId !== null) {
           clearTimeout(_reconnectTimerId);
           set({ _reconnectTimerId: null });
       }
       // Actualizar estado inmediatamente
      set({ isConnected: false, socket: null });
  },

  sendWebsocketMessage: (method: string, data: Record<string, any> = {}, meta: IWebsocketClientRequestMeta = {}) => {
     const { socket, isConnected } = get();
     if (isConnected && socket?.readyState === WebSocket.OPEN) {
        const message: IWebsocketClientRequest = {
            v: 1,
            method: method,
            ...(Object.keys(meta).length > 0 && { meta: meta }),
            data: data,
        };
        try {
            socket.send(JSON.stringify(message));
            console.log(`Sent message: ${method}`, message);
        } catch (e) {
            console.error("Error sending WebSocket message:", e);
            // Aquí podrías añadir lógica para manejar fallos de envío (ej: poner en cola)
        }
     } else {
         console.warn('WebSocket is not connected. Cannot send message:', method);
         // Opcional: Podrías añadir la lógica para poner mensajes en cola aquí
     }
  },

  scheduleReconnect: () => {
       const { _reconnectTimerId, connect, reconnectDelay } = get();

       // Limpiar cualquier temporizador existente
       if (_reconnectTimerId !== null) {
          clearTimeout(_reconnectTimerId);
       }

       console.log(`Scheduling next reconnection attempt in ${reconnectDelay / 1000} seconds.`);

       const timerId = setTimeout(() => {
           console.log('Attempting reconnection now...');
           connect(); // Llama a la acción de conexión
       }, reconnectDelay);

       // Guarda el ID del temporizador en el estado interno del store
       set({ _reconnectTimerId: timerId as number });

       // Incrementa el retraso para el próximo intento (Backoff exponencial)
       set(state => ({ reconnectDelay: Math.min(state.reconnectDelay * 2, 30000) })); // Max 30 segundos
  },

  // --- Manejadores de Eventos del Socket (llamados por la instancia del socket) ---
  handleOpen: () => {
      console.log("Conexión WebSocket establecida");
      // Actualizar estado de conexión y reiniciar el retraso
      set({ isConnected: true, reconnectDelay: 1000 });
       // Asegurarse de que el temporizador de reconexión esté limpiado si se conecta exitosamente
       if (get()._reconnectTimerId !== null) {
         clearTimeout(get()._reconnectTimerId);
         set({ _reconnectTimerId: null });
       }
  },

    handleMessage: (event: MessageEvent) => {
        console.log('[WebSocketStore] Raw event.data received:', event.data);
        try {
            const parsedMessage = JSON.parse(event.data);
            console.log('[WebSocketStore] Parsed message:', parsedMessage);
            
            // Loguear detalles importantes del mensaje
            if (parsedMessage.method) {
                console.log(`[WebSocketStore] Message method: ${parsedMessage.method}`);
            }
            if (parsedMessage.meta?.requestId) {
                console.log(`[WebSocketStore] Message meta.requestId: ${parsedMessage.meta.requestId}`);
            }

            set({ lastMessage: parsedMessage }); // Guardar el último mensaje recibido
        } catch (e) {
            console.error("[WebSocketStore] Failed to parse WebSocket message:", e);
            set({ lastMessage: event.data }); // Guardar el mensaje sin parsear si falla
        }
    },

  handleClose: (event: CloseEvent) => {
      console.log(`Conexión WebSocket cerrada (Código: ${event.code}, Razón: ${event.reason || 'N/A'})`);
      // Actualizar estado de conexión y nulificar el socket
      set({ isConnected: false, socket: null });

      // Solo intentar reconectar si no fue un cierre normal (código 1000)
      // Puedes añadir lógica para NO reconectar en ciertos códigos (ej: autenticación fallida)
      if (event.code !== 1000) {
          console.log(`WebSocket closed with code ${event.code}, attempting to schedule reconnect.`);
          get().scheduleReconnect(); // Programa el próximo intento de reconexión
      } else {
            console.log(`WebSocket closed normally (code ${event.code}).`);
           console.log('WebSocket closed normally (code 1000).');
           // Si fue un cierre normal, asegurarnos de que el timer de reconexión está limpio
           if (get()._reconnectTimerId !== null) {
              clearTimeout(get()._reconnectTimerId);
              set({ _reconnectTimerId: null });
           }
      }
  },

    handleError: (event: Event) => {
        
        console.warn("WebSocket error detectado", JSON.stringify(event));
        console.log(`Close code: ${event.code}, reason: ${event.reason}`);

        // El evento `onerror` usualmente va seguido por un evento `onclose`.
        // La lógica de reconexión y actualización del estado se maneja principalmente en `handleClose`.
        // Podrías registrar el error en el estado si quieres mostrarlo en la UI.
    },
}));

export function useWebSocketStore() {
    return useClientStore(useWebSocketStoreZustand)
};


// Exportar acciones específicas si prefieres que los componentes no usen el store directamente para llamar acciones
export const connectWebSocket = useWebSocketStoreZustand.getState().connect;
export const disconnectWebSocket = useWebSocketStoreZustand.getState().disconnect;
export const sendWebSocketMessage = useWebSocketStoreZustand.getState().sendWebsocketMessage;

// --- Importante: Cómo iniciar la conexión y limpiarla ---
// A diferencia del hook de Contexto que se inicia al montar el Provider,
// el store de Zustand no inicia la conexión automáticamente al definirse.
// Debes llamar a la acción `connect` explícitamente una vez al iniciar tu aplicación.
// También necesitas una limpieza al cerrar la pestaña/aplicación.


// Limpiar al cerrar la página (opcional pero recomendado)
// Puedes añadir esto en tu archivo de layout principal o en un script global de cliente.
if (typeof globalThis.window !== 'undefined') {
    globalThis.window.addEventListener('beforeunload', () => {
        console.log('Window is unloading, disconnecting WebSocket.');
        useWebSocketStoreZustand.getState().disconnect(1000, 'Window Unload'); // Código 1000 para cierre normal
    });
};
