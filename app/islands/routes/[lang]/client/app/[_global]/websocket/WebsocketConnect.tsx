// Archivo: @islands/routes/[lang]/client/app/[_global]/websocket/WebsocketConnect.tsx
import { useWebSocketStore } from "@islands/providers/stores/websocketStore.ts";
import { useEffect } from 'preact/hooks';

export default function LangClientApp_globalHooksWebsocketIslandWebsocketConnect() {
    // Llama a los hooks en el nivel superior del componente
    const { connect, disconnect, isConnected, socket } = useWebSocketStore();

    useEffect(() => {
        console.log("[WebsocketConnect.tsx] useEffect: Estado actual de conexión:", { isConnected, socketReadyState: socket?.readyState });

        // Conectar solo si no está ya conectado o intentando conectarse, y el socket está cerrado.
        // Esto evita intentos de conexión redundantes si el componente se re-renderiza.
        if (!isConnected && (!socket || socket.readyState === WebSocket.CLOSED)) {
            console.log("[WebsocketConnect.tsx] useEffect: Llamando a connect()");
            connect();
        }

        // La función de limpieza se llamará cuando el componente se desmonte.
        return () => {
            console.log("[WebsocketConnect.tsx] useEffect cleanup: Llamando a disconnect()");
            // Considera cuidadosamente si siempre quieres desconectar aquí.
            // Si este componente gestiona el ciclo de vida global de la conexión,
            // desconectar al desmontar podría ser solo para escenarios específicos.
            // El manejador `beforeunload` en `websocketStore.ts` es para una limpieza más global.
            // Si esta isla puede montarse y desmontarse y NO es la única que gestiona la conexión,
            // entonces `disconnect()` podría ser apropiado. Dado el nombre, parece un gestor global.
            // Por ahora, comentaremos la desconexión aquí para evitar cierres prematuros
            // si la isla se re-renderiza o se desmonta temporalmente.
            // disconnect();
        };
    }, [connect, disconnect, isConnected, socket]); // Añade las dependencias correctas

    return null; // Este componente no necesita renderizar nada visible
}