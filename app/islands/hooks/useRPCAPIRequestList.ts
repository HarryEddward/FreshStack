import { useEffect, useRef } from 'preact/hooks';

type RequestFn = () => void;

interface UseMultiRequestsOptions {
  once?: boolean;
  enabled?: boolean;
}

/**
 * Ejecuta múltiples funciones de petición API (fetch) cuando cambian dependencias,
 * con soporte para ejecución única y habilitación condicional.
 */
export default function useRPCAPIRequestList(
  requests: RequestFn[],
  dependencies: any[] = [],
  { once = true, enabled = true }: UseMultiRequestsOptions = {}
) {
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    if (once && hasRunOnce.current) return;

    requests.forEach((requestFn) => {
      if (typeof requestFn === 'function') {
        requestFn();
      }
    });

    if (once) {
      hasRunOnce.current = true;
    }
  }, [enabled, ...dependencies]);
}
