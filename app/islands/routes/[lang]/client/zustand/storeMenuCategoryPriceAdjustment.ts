import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useClientStore } from "@islands/hooks/useClientStore.ts";

export interface MenuCategoryPriceAdjustment {
  id: string;
  menuCategoryId: string;
  adjustmentType: 'INCREASE' | 'DECREASE';
  percentageValue: number;
  description?: string;
  appliedAt?: Date;
  appliedByEmployeeName?: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MenuCategoryPriceAdjustmentState {
  menuCategoryPriceAdjustments: MenuCategoryPriceAdjustment[];
  addMenuCategoryPriceAdjustment: (adjustment: MenuCategoryPriceAdjustment) => void;
  removeMenuCategoryPriceAdjustment: (id: string) => void;
  updateMenuCategoryPriceAdjustment: (id: string, updated: Partial<MenuCategoryPriceAdjustment>) => void;
  clearMenuCategoryPriceAdjustments: () => void;
}

export const useMenuCategoryPriceAdjustmentStoreZustand = create(
  persist<MenuCategoryPriceAdjustmentState>(
    (set) => ({
      menuCategoryPriceAdjustments: [],

      addMenuCategoryPriceAdjustment: (adjustment) =>
        set((state) => ({
          menuCategoryPriceAdjustments: [...state.menuCategoryPriceAdjustments, adjustment],
        })),

      removeMenuCategoryPriceAdjustment: (id) =>
        set((state) => ({
          menuCategoryPriceAdjustments: state.menuCategoryPriceAdjustments.filter((adj) => adj.id !== id),
        })),

      updateMenuCategoryPriceAdjustment: (id, updated) =>
        set((state) => ({
          menuCategoryPriceAdjustments: state.menuCategoryPriceAdjustments.map((adj) =>
            adj.id === id ? { ...adj, ...updated } : adj
          ),
        })),

      clearMenuCategoryPriceAdjustments: () => set({ menuCategoryPriceAdjustments: [] }),
    }),
    {
      name: "ClientApp_storeMenuCategoryPriceAdjustments",
      storage: createJSONStorage(() => localStorage),
      /*
      // Opcional para manejo de fechas en persistencia
      partialize: (state) => ({
        ...state,
        menuCategoryPriceAdjustments: state.menuCategoryPriceAdjustments.map((adj) => ({
          ...adj,
          createdAt: adj.createdAt.toISOString(),
          updatedAt: adj.updatedAt.toISOString(),
          appliedAt: adj.appliedAt?.toISOString(),
        })),
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        menuCategoryPriceAdjustments: persistedState.menuCategoryPriceAdjustments.map((adj) => ({
          ...adj,
          createdAt: new Date(adj.createdAt),
          updatedAt: new Date(adj.updatedAt),
          appliedAt: adj.appliedAt ? new Date(adj.appliedAt) : undefined,
        })),
      }),
      */
    }
  )
);

export function useMenuCategoryPriceAdjustmentStore() {
  return useClientStore(useMenuCategoryPriceAdjustmentStoreZustand);
}
