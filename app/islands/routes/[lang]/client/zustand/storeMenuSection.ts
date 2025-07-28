import { create } from "zustand";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
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

export interface SetMenu {
  id: string;
  products: string[];
}

interface MenuSectionState {
  selectedMenu: SetMenu | Record<any, any>;
  setSelectedMenu: (menu: SetMenu) => void;
}

export const useMenuStoreSectionZustand = create<MenuSectionState>((set) => ({
  selectedMenu: {},
  setSelectedMenu: (menu: SetMenu) =>
    set(() => ({
      selectedMenu: JSON.parse(JSON.stringify(menu)),
    })),
}));

export function useMenuSectionStore() {
  return useClientStore(useMenuStoreSectionZustand);
}
