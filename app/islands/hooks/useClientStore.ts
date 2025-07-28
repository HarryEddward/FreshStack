// islands/utils/useClientStore.ts
import { useState, useEffect } from "preact/hooks";
import { StoreApi, UseBoundStore } from "zustand";

/**
 * Hook personalizado para usar stores de Zustand en Fresh, manejando SSR y CSR de forma transparente.
 * Devuelve el estado completo del store, seguro para usar directamente en SSR y CSR.
 *
 * NO ES COMPATIBLE CON STORES PERSISTENTES
 * 
 * @template T - El tipo del estado del store de Zustand.
 * @param store - El store de Zustand creado con `create`.
 * @returns El estado actual del store, siempre válido.
 */
export function useClientStore<T>(store: UseBoundStore<StoreApi<T>>): T {

  let number = 0;

  // Obtenemos el estado inicial del store (seguro en SSR)
  const initialState = store.getState();

  // Estado local que se sincronizará con el store en CSR
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    //console.log("CARGANDO ZUSTAND");

    // Sincronizamos con el store en el cliente
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });

    // Actualizamos el estado inicial tras la hidratación
    setState(store.getState());
    //console.log("ZUSTAND CARGADO");

    return () => unsubscribe();
  }, [store]);

  // Siempre devolvemos el estado (inicial en SSR, actualizado en CSR)
  return state;
}