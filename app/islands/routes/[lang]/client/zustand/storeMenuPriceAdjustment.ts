import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useClientStore } from "@islands/hooks/useClientStore.ts";

export interface MenuPriceAdjustment {
  id: string;
  menuId: string;
  adjustmentType: 'INCREASE' | 'DECREASE';
  percentageValue: number;
  description?: string;
  appliedAt?: Date;
  appliedByEmployeeName?: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MenuPriceAdjustmentState {
  menuPriceAdjustments: MenuPriceAdjustment[];
  addMenuPriceAdjustment: (adjustment: MenuPriceAdjustment) => void;
  removeMenuPriceAdjustment: (id: string) => void;
  updateMenuPriceAdjustment: (id: string, updated: Partial<MenuPriceAdjustment>) => void;
  clearMenuPriceAdjustments: () => void;
}

export const useMenuPriceAdjustmentStoreZustand = create(
  persist<MenuPriceAdjustmentState>(
    (set) => ({
      menuPriceAdjustments: [],

      addMenuPriceAdjustment: (adjustment) =>
        set((state) => ({
          menuPriceAdjustments: [...state.menuPriceAdjustments, adjustment],
        })),

      removeMenuPriceAdjustment: (id) =>
        set((state) => ({
          menuPriceAdjustments: state.menuPriceAdjustments.filter((adj) => adj.id !== id),
        })),

      updateMenuPriceAdjustment: (id, updated) =>
        set((state) => ({
          menuPriceAdjustments: state.menuPriceAdjustments.map((adj) =>
            adj.id === id ? { ...adj, ...updated } : adj
          ),
        })),

      clearMenuPriceAdjustments: () => set({ menuPriceAdjustments: [] }),
    }),
    {
      name: "ClientApp_storeMenuPriceAdjustments",
      storage: createJSONStorage(() => localStorage),
      // Optional: revive fechas si decides usarlas con `Date` nuevamente
      /*
      partialize: (state) => ({
        ...state,
        menuPriceAdjustments: state.menuPriceAdjustments.map((adj) => ({
          ...adj,
          createdAt: adj.createdAt.toISOString(),
          updatedAt: adj.updatedAt.toISOString(),
          appliedAt: adj.appliedAt?.toISOString(),
        })),
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        menuPriceAdjustments: persistedState.menuPriceAdjustments.map((adj) => ({
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

export function useMenuPriceAdjustmentStore() {
  return useClientStore(useMenuPriceAdjustmentStoreZustand);
}
