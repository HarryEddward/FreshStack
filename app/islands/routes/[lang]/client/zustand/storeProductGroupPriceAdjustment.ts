import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
// import { useClientStore } from '@fresh-stack/zustand'; // Alternativa comentada

// Interfaz principal
export interface ProductGroupPriceAdjustment {
  id: string;
  productGroupId: string;
  adjustmentType: "INCREASE" | "DECREASE";
  percentageValue: number;
  description?: string;
  appliedAt?: Date;
  appliedByEmployeeName?: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interfaz del estado global
interface ProductGroupPriceAdjustmentState {
  productGroupPriceAdjustment: ProductGroupPriceAdjustment[];
  addProductGroupPriceAdjustment: (p: ProductGroupPriceAdjustment) => void;
  removeProductGroupPriceAdjustment: (id: string) => void;
  updateProductGroupPriceAdjustment: (
    id: string,
    updated: Partial<ProductGroupPriceAdjustment>
  ) => void;
  clearProductGroupPriceAdjustment: () => void;
}

// Store Zustand persistente
export const useProductGroupPriceAdjustmentStoreZustand = create(
  persist<ProductGroupPriceAdjustmentState>(
    (set) => ({
      productGroupPriceAdjustment: [],

      addProductGroupPriceAdjustment: (p) =>
        set((state) => ({
          productGroupPriceAdjustment: [...state.productGroupPriceAdjustment, p],
        })),

      removeProductGroupPriceAdjustment: (id) =>
        set((state) => ({
          productGroupPriceAdjustment: state.productGroupPriceAdjustment.filter(
            (p) => p.id !== id
          ),
        })),

      updateProductGroupPriceAdjustment: (id, updated) =>
        set((state) => ({
          productGroupPriceAdjustment: state.productGroupPriceAdjustment.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),

      clearProductGroupPriceAdjustment: () => set({ productGroupPriceAdjustment: [] }),
    }),
    {
      name: "ClientApp_storeProductGroupPriceAdjustment",
      storage: createJSONStorage(() => localStorage),
      // Optional: transforma las fechas al revivirlas
      /*
      partialize: (state) => ({
        ...state,
        productGroupPriceAdjustment: state.productGroupPriceAdjustment.map((p) => ({
          ...p,
          appliedAt: p.appliedAt?.toISOString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        })),
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        productGroupPriceAdjustment: persistedState.productGroupPriceAdjustment.map((p) => ({
          ...p,
          appliedAt: p.appliedAt ? new Date(p.appliedAt) : undefined,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        })),
      }),
      */
    }
  )
);

// Hook para acceder desde cliente
export function useProductGroupPriceAdjustmentStore() {
  return useClientStore(useProductGroupPriceAdjustmentStoreZustand);
}
