import { useEffect, useCallback, useRef } from 'preact/hooks';
import { useSignal, Signal } from '@preact/signals';
import { useWebSocketStore, WebSocketStore } from "@islands/providers/stores/websocketStore.ts";
import { useWebSocketStoreZustand } from '@islands/providers/stores/websocketStore.ts';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

// NUEVO: Opciones para el hook
interface UseRPCWebsocketsOptions {
    timeout?: number; // en milisegundos
}

export default function useRPCWebsockets<T>(
    endpointMethod: string,
    options?: UseRPCWebsocketsOptions, // NUEVO: Se aceptan opciones
) {
    const { isConnected, socket } = useWebSocketStore();
    console.log(`[useRPCWebsockets] Mounting for endpointMethod: ${endpointMethod}`);

    const state = useSignal<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const currentExpectedRequestId = useSignal<string | null>(null);
    // NUEVO: Signal para guardar el ID del temporizador del timeout
    const timeoutId = useSignal<number | null>(null);
    // NUEVO: Signal para recordar el cuerpo de la última petición para poder revalidar
    const lastRequestBody = useSignal<Record<string, any> | undefined>(undefined);

    const makeRequest = useCallback(
        (requestBody?: Record<string, any>) => {
            if (!isConnected && socket?.readyState !== WebSocket.OPEN) {
                console.warn(`[useRPCWebsockets] (${endpointMethod}) WebSocket is not connected. Cannot make request.`);
                return;
            }

            // NUEVO: Limpiar cualquier timeout anterior antes de una nueva petición
            if (timeoutId.value) {
                clearTimeout(timeoutId.value);
            }

            const newRequestId = crypto.randomUUID();
            console.log(`[useRPCWebsockets] (${endpointMethod}) Making request with requestId: ${newRequestId}`);

            currentExpectedRequestId.value = newRequestId;
            lastRequestBody.value = requestBody; // NUEVO: Guardamos el body para revalidar
            state.value = { data: null, loading: true, error: null };

            useWebSocketStoreZustand.getState().sendWebsocketMessage(
                endpointMethod,
                requestBody,
                { requestId: newRequestId }
            );

            // NUEVO: Iniciar el temporizador de timeout si se especificó en las opciones
            if (options?.timeout) {
                const newTimeoutId = setTimeout(() => {
                    // Comprobamos si la petición todavía está en curso para este requestId
                    if (currentExpectedRequestId.value === newRequestId) {
                        console.error(`[useRPCWebsockets] (${endpointMethod}) Request timed out after ${options.timeout}ms.`);
                        state.value = {
                            data: null,
                            loading: false,
                            error: new Error('Request timed out'),
                        };
                    }
                }, options.timeout);
                timeoutId.value = newTimeoutId as unknown as number; // Deno/Node y Navegador devuelven tipos diferentes
            }
        },
        [endpointMethod, isConnected, socket, options?.timeout] // Dependencias actualizadas
    );

    useEffect(() => {
        if (!isConnected && socket?.readyState !== WebSocket.OPEN) {
            console.warn(`[useRPCWebsockets] (${endpointMethod}) WebSocket is not connected. Cannot subscribe to messages.`);
            return;
        }

        const unsubscribe = useWebSocketStoreZustand.subscribe((newState) => {
            const newLastMessage = newState.lastMessage;

            if (
                newLastMessage &&
                newLastMessage.method === endpointMethod &&
                newLastMessage.response?.meta?.requestId === currentExpectedRequestId.value
            ) {
                console.log(`[useRPCWebsockets] (${endpointMethod}) Received matching response for requestId: ${currentExpectedRequestId.value}`);
                
                // NUEVO: Si recibimos una respuesta, limpiamos el timeout
                if (timeoutId.value) {
                    clearTimeout(timeoutId.value);
                    timeoutId.value = null;
                }

                state.value = {
                    data: newLastMessage.response.data as T,
                    loading: false,
                    error: null,
                };
            }
        });

        return () => {
            console.log(`[useRPCWebsockets] (${endpointMethod}) Unsubscribing and cleaning up.`);
            unsubscribe();
            // NUEVO: Asegurarse de limpiar el timeout si el componente se desmonta
            if (timeoutId.value) {
                clearTimeout(timeoutId.value);
            }
        };
    }, [endpointMethod, isConnected, socket]); // Se han quitado dependencias que no eran necesarias aquí

    // NUEVO: Función de revalidación
    const revalidate = useCallback(() => {
        if (lastRequestBody.value !== undefined) {
            console.log(`[useRPCWebsockets] (${endpointMethod}) Revalidating...`);
            makeRequest(lastRequestBody.value);
        } else {
            console.warn(`[useRPCWebsockets] (${endpointMethod}) Cannot revalidate because no request has been made yet.`);
        }
    }, [makeRequest]);


    console.log(`[useRPCWebsockets] (${endpointMethod}) Hook initialized.`);
    return {
        makeRequest,
        revalidate, // NUEVO: Devolvemos la función de revalidación
        stateRequestSignal: state,
    };
}