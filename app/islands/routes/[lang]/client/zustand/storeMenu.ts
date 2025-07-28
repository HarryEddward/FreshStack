import { create } from "zustand";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FunctionalComponent } from "preact";

type IconType = FunctionalComponent<any> | null;

export interface CategorySchedule {
  morning?: TimeRange;
  afternoon?: TimeRange;
}

export interface TimeRange {
  open: string;
  close: string;
}

interface ProductID {
  id: string;
}

interface MenuPriceAdjustmentID {
  id: string;
}

export interface Menu {
  id: string;
  title: string;
  tags?: string;
  nameLastModificationEmployee?: string;
  vip: boolean;
  haveSchedule: boolean;
  schedule?: CategorySchedule;
  products: ProductID[];
  priceAdjustments: MenuPriceAdjustmentID[];
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MenuState {
  loadingMenu: Menu[];
  selectedMenu: Menu | null;
  setSelectedMenu: (id: string) => void;
  menu: Menu[];
  addMenu: (menu: Menu) => void;
  removeMenu: (id: string) => void;
  updateMenu: (id: string, updatedMenu: Partial<Menu>) => void;
  clearMenu: () => void;
}

export const useMenuStoreZustand = create(
  persist<MenuState>(
    (set) => ({
      loadingMenu: [
        {
          id: "0",
          vip: false,
          title: "Cargando...",
          tags: "",
          nameLastModificationEmployee: "",
          haveSchedule: false,
          schedule: undefined,
          products: [],
          priceAdjustments: [],
          businessId: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      menu: [],
      selectedMenu: null,
      setSelectedMenu: (id) =>
        set((state) => {
          console.log('Setting selected menu ID:', id);
          const selected = state.menu.find((menu) => menu.id === id);
          return { selectedMenu: selected || null };
        }),

      addMenu: (menu) =>
        set((state) => {
          console.log('Adding menu:', menu.title);
          return { menu: [...state.menu, menu] };
        }),

      removeMenu: (id) =>
        set((state) => ({
          menu: state.menu.filter((menu) => menu.id !== id),
        })),

      updateMenu: (id, updatedMenu) =>
        set((state) => ({
          menu: state.menu.map((menu) =>
            menu.id === id ? { ...menu, ...updatedMenu } : menu
          ),
        })),

      clearMenu: () => set({ menu: [] }),
    }),
    {
      name: "ClientApp_storeMenus",
      storage: createJSONStorage(() => globalThis.localStorage),
    }
  )
);

export function useMenuStore() {
  return useClientStore(useMenuStoreZustand);
}