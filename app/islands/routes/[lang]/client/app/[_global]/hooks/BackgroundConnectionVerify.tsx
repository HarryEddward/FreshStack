// @routes/[lang]/client/app/[_global]/hooks/BackgroundConnectionVerify.tsx

import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function useLangClientApp_globalIslandBackgroundConnectionVerify() {
  const isConnected = useSignal(false);
  const socket = useSignal<WebSocket | null>(null);

  // Señal para controlar el retraso antes del próximo intento de reconexión.
  // Empezamos con 1 milisegundo para el primer reintento después de la primera falla.
  const reconnectDelay = useSignal(0); // 1ms = 1 milisegundo

  // Señal para almacenar el ID del temporizador de setTimeout para poder limpiarlo.
  const reconnectTimerId = useSignal<number | null>(null);

  // IMPORTANTE: Reemplaza 'localhost' con la dirección IP de tu máquina de desarrollo.
  // Esta IP debe ser accesible desde el dispositivo/emulador donde se ejecuta la app Capacitor.
  // Por tus logs, parece ser 192.168.1.136.
  const url: string = "ws://localhost:8000/api/v1/public/business/ws"; // IMPORTANTE: Reemplaza con la IP correcta.

  console.log('Entry WS connection hook');

  useEffect(() => {
    console.log('useEffect running: Setting up WS connection logic');

    // Función para crear y configurar una nueva conexión WebSocket
    const createWebSocket = () => {
      console.log(`Attempting to connect to ${url}`);
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("Conexión WebSocket establecida");
        isConnected.value = true;
        // Limpiar cualquier temporizador de reconexión pendiente si la conexión fue exitosa.
        if (reconnectTimerId.value !== null) {
          clearTimeout(reconnectTimerId.value);
          reconnectTimerId.value = null;
        }
        // Restablecer el retraso a 1 segundo para la *próxima* desconexión potencial.
        reconnectDelay.value = 1000;
      };

      ws.onmessage = (msg: MessageEvent) => {
        console.log(JSON.parse(msg.data) || msg.data);
      }

      ws.onclose = (event) => {
        console.log(`Conexión WebSocket cerrada (Código: ${event.code}, Razón: ${event.reason || 'N/A'})`);
        isConnected.value = false;
        // Programar el próximo intento de reconexión.
        scheduleReconnect();
      };

      ws.onerror = (error) => {
         // Los errores de WebSocket a menudo resultan en un cierre inmediato,
         // por lo que `onclose` probablemente se llamará justo después de esto.
         // Sin embargo, es una buena práctica manejarlo aquí también.
         console.warn("WebSocket error detectado");
         // No es necesario programar la reconexión aquí, onclose lo manejará,
         // pero nos aseguramos de que isConnected sea false.
         isConnected.value = false;
      };

      socket.value = ws;
    };

    // Función auxiliar para programar el próximo intento de reconexión.
    const scheduleReconnect = () => {
      // Limpiar cualquier temporizador existente primero para evitar duplicados.
      if (reconnectTimerId.value !== null) {
        clearTimeout(reconnectTimerId.value);
      }

      console.log(`Scheduling next reconnection attempt in ${reconnectDelay.value / 1000} seconds.`);

      const timerId = setTimeout(() => {
        console.log(`Attempting reconnection now...`);
        createWebSocket(); // Intentar crear la conexión de nuevo después del retraso
      }, reconnectDelay.value);

      // Guardar el ID del temporizador
      reconnectTimerId.value = timerId as number; // Es posible que necesites el `as number` según tu configuración de TypeScript

      // Después de programar el intento *actual*, establecer el retraso para el *siguiente* intento a 5 segundos.
      reconnectDelay.value = 5000;
    };

    // --- Intento de conexión inicial ---
    // Creamos la conexión cuando el efecto se ejecuta por primera vez.
    createWebSocket();

    // --- Función de limpieza ---
    return () => {
      console.log('Cleaning up WS connection hook');
      // Limpiar cualquier temporizador de reconexión pendiente ANTES de cerrar el socket,
      // para que el evento onclose no programe uno nuevo durante la limpieza.
      if (reconnectTimerId.value !== null) {
         console.log('Clearing reconnection timer during cleanup');
        clearTimeout(reconnectTimerId.value);
        reconnectTimerId.value = null;
      }

      // Cerrar la conexión WebSocket si existe y no está ya cerrada.
      if (socket.value && socket.value.readyState !== WebSocket.CLOSED) {
         console.log('Closing WebSocket connection during cleanup');
         socket.value.close(); // Esto activará el evento onclose, pero el timer ya está limpiado.
      }

      // Por buena práctica, nulificar la señal del socket en la limpieza.
      socket.value = null;
    };

  }, [url]); // El efecto depende de la URL para reconectarse si cambia (aunque en este caso es fija).

  return { isConnected, socket };
}