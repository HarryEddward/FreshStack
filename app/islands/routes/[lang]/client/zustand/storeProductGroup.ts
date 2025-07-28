import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
// import { useClientStore } from '@fresh-stack/zustand';


interface ProductID {
  id: string;
};

export interface ProductGroup {
  id: string;
  name: string;
  description?: string;
  products: ProductID[];
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductGroupState {
  productGroup: ProductGroup[];
  addProductGroup: (productGroup: ProductGroup) => void;
  removeProductGroup: (id: string) => void;
  updateProductGroup: (id: string, updated: Partial<ProductGroup>) => void;
  clearProductGroup: () => void;
}

export const useProductGroupStoreZustand = create(
  persist<ProductGroupState>(
    (set) => ({
      productGroup: [],

      addProductGroup: (productGroup) =>
        set((state) => ({
          productGroup: [...state.productGroup, productGroup],
        })),

      removeProductGroup: (id) =>
        set((state) => ({
          productGroup: state.productGroup.filter((group) => group.id !== id),
        })),

      updateProductGroup: (id, updated) =>
        set((state) => ({
          productGroup: state.productGroup.map((group) =>
            group.id === id ? { ...group, ...updated } : group
          ),
        })),

      clearProductGroup: () => set({ productGroup: [] }),
    }),
    {
      name: "ClientApp_storeProductGroup",
      storage: createJSONStorage(() => localStorage),
      // Optional: revive fechas después de persistencia si las usas
      /*
      partialize: (state) => ({
        ...state,
        productGroup: state.productGroup.map((group) => ({
          ...group,
          createdAt: group.createdAt.toISOString(),
          updatedAt: group.updatedAt.toISOString(),
        })),
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        productGroup: persistedState.productGroup.map((group) => ({
          ...group,
          createdAt: new Date(group.createdAt),
          updatedAt: new Date(group.updatedAt),
        })),
      }),
      */
    }
  )
);

export function useProductGroupStore() {
  return useClientStore(useProductGroupStoreZustand);
}
