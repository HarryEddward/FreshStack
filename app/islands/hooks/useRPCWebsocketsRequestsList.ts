import { useEffect, useRef } from 'react';
import { useWebSocketStore } from "@islands/providers/stores/websocketStore.ts";

type RequestFn = () => void;

interface UseMultiRequestsOptions {
  once?: boolean;  // si solo quieres enviar cada request una vez
  enabled?: boolean; // si quieres controlar habilitación
}

export default function useRPCWebsocketsRequestList(
  requests: RequestFn[],
  dependecies: any[] = [],
  { once = true, enabled = true }: UseMultiRequestsOptions = {}
) {
  const { isConnected, socket } = useWebSocketStore();

  useEffect(() => {
    
      if (isConnected && socket?.readyState === WebSocket.OPEN) {
        requests.forEach((requestFn) => {
          if (typeof requestFn === 'function') {
            requestFn();
          }
        });
      }  
  }, [isConnected, socket, ...dependecies]);
}
