import { useCallback } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import { config } from '@config/frontend/index.ts';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseRPCAPIOptions {
  timeout?: number; // en milisegundos
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // por defecto: POST
  headers?: Record<string, string>;
  zenstackQuery?: boolean;
}

/**
 * Hook para consumir un endpoint HTTP con control de estado, timeout y revalidación.
 */
export default function useRPCAPI<T>(
  endpointUrl: string,
  options?: UseRPCAPIOptions
) {
  const state = useSignal<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const controller = useSignal<AbortController | null>(null);
  const lastRequestParams = useSignal<Record<string, any> | undefined>(undefined);

  const makeRequest = useCallback(
    async (params?: Record<string, any>) => {
      const abortCtrl = new AbortController();
      controller.value = abortCtrl;
      lastRequestParams.value = params;

      state.value = { data: null, loading: true, error: null };

      const timeoutMs = options?.timeout ?? 10000;
      const method = options?.method ?? 'POST';
      const zenstackQuery = options?.zenstackQuery ?? false;
      

      let url = config.mainApiUrl + endpointUrl;
      let body: string | undefined;

      // Manejo de parámetros según el método HTTP
      if (method === 'GET') {
        // Para GET, convertir params a query string URLEncoded
        if (params) {
          const queryString = encodeURIComponent(
            JSON.stringify(params)
          ).toString();
          url += `?${zenstackQuery === true ? "q=" : ""}${queryString}`;
        }
      } else {
        // Para POST, PUT, DELETE, etc., enviar params como JSON en el cuerpo
        body = JSON.stringify(params ?? {});
      }

      const timeoutId = setTimeout(() => {
        abortCtrl.abort();
        state.value = {
          data: null,
          loading: false,
          error: new Error('Request timed out'),
        };
      }, timeoutMs);

      try {
        const headers: Record<string, string> = {
          ...options?.headers,
        };
        if (method !== 'GET') {
          headers['Content-Type'] = 'application/json';
        }

        const res = await fetch(url, {
          method,
          signal: abortCtrl.signal,
          headers,
          credentials: 'include',
          body,
        });

        if (!res.ok) {
          console.log(`[useRPCAPI] Request: ${res.status} - ${res.statusText}`);
          throw new Error(`HTTP ${res.status} - ${res.statusText}`);
        }

        const json = await res.json();
        console.log(`[useRPCAPI] Request: ${JSON.stringify(json)}`);
        state.value = { data: json as T, loading: false, error: null };
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          console.warn(`[useRPCAPI] Request aborted: ${endpointUrl}`);
        }
        state.value = { data: null, loading: false, error: err as Error };
      } finally {
        clearTimeout(timeoutId);
      }
    },
    [endpointUrl, options?.timeout, options?.method, options?.headers]
  );

  const revalidate = useCallback(() => {
    if (lastRequestParams.value !== undefined) {
      console.log(`[useRPCAPI] Revalidating: ${endpointUrl}`);
      makeRequest(lastRequestParams.value);
    } else {
      console.warn(`[useRPCAPI] No previous request to revalidate for: ${endpointUrl}`);
    }
  }, [makeRequest]);

  return {
    makeRequest,
    revalidate,
    stateRequestSignal: state,
  };
}