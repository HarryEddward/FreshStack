import { useEffect } from 'preact/hooks';

// Hook que ejecuta un efecto después de un delay, reiniciando el timer si cambian las dependencias
export const useDebouncedEffect = (effect: () => void, deps: any[], delay = 500) => {
  useEffect(() => {
    const handler = setTimeout(effect, delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
};
