import { useClientStore } from '@islands/hooks/useClientStore.ts';
import { create } from 'zustand';

interface ProductSettingsState {
  openModalSettingsCreateProduct: boolean;
  openModalSettingsEditorProduct: boolean;
  openModalSettingsEditorStock: boolean;

  setOpenModalSettingsCreateProduct: () => void;
  setOpenModalSettingsEditorProduct: () => void;
  setOpenModalSettingsEditorStock: () => void;
  
  productIdSelectedSettingsEditorStock: string | null;
  setProductIdSelectedSettingsEditorStock: (productId: string) => void;
}

const useProductSettingsStoreZustand = create<ProductSettingsState>((set) => ({
  openModalSettingsCreateProduct: false,
  openModalSettingsEditorProduct: false,
  openModalSettingsEditorStock: false,

  setOpenModalSettingsCreateProduct: () => set(s => ({ openModalSettingsCreateProduct: !s.openModalSettingsCreateProduct })),
  setOpenModalSettingsEditorProduct: () => set(s => ({ openModalSettingsEditorProduct: !s.openModalSettingsEditorProduct })),
  setOpenModalSettingsEditorStock: () => set(s => ({ openModalSettingsEditorStock: !s.openModalSettingsEditorStock })),

  productIdSelectedSettingsEditorStock: null,
  setProductIdSelectedSettingsEditorStock: (productId) => set({ productIdSelectedSettingsEditorStock: productId }),
}));

export function useProductSettingsStore() {
  return useClientStore(useProductSettingsStoreZustand);
}
