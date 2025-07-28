import { create } from "zustand";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
import { createJSONStorage, persist } from 'zustand/middleware';


interface BusinessMenuID {
    id: string;
};

interface BusinessMenuCategoryPriceAdjustmentID {
    id: string;
};


export interface MenuCategory {
  id: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
  menus: BusinessMenuID[]; // ← relación uno-a-muchos con los menús
  priceAdjustments: BusinessMenuCategoryPriceAdjustmentID[];
}




interface MenuCategoryState {
  menuCategories: MenuCategory[];
  addMenuCategory: (category: MenuCategory) => void;
  removeMenuCategory: (id: string) => void;
  updateMenuCategory: (id: string, updated: Partial<MenuCategory>) => void;
  clearMenuCategories: () => void;
}

export const useMenuCategoryStoreZustand = create(
  persist<MenuCategoryState>(
    (set) => ({
      menuCategories: [],

      addMenuCategory: (category) =>
        set((state) => ({
          menuCategories: [...state.menuCategories, category],
        })),

      removeMenuCategory: (id) =>
        set((state) => ({
          menuCategories: state.menuCategories.filter((cat) => cat.id !== id),
        })),

      updateMenuCategory: (id, updated) =>
        set((state) => ({
          menuCategories: state.menuCategories.map((cat) =>
            cat.id === id ? { ...cat, ...updated } : cat
          ),
        })),

      clearMenuCategories: () => set({ menuCategories: [] }),
    }),
    {
      name: "ClientApp_storeMenuCategories",
      storage: createJSONStorage(() => globalThis.localStorage)
    }
  )
);

export function useMenuCategoryStore() {
  return useClientStore(useMenuCategoryStoreZustand);
}
