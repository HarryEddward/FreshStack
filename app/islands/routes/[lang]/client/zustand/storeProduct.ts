import { create } from "zustand";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Product {
  id: string;
  menuId: string;
  name: string;
  unityAmount: number;
  stockBatches: number[];
  expirationDates: Date[];
  unityConsumeStock: number;
  unityConsumePrice?: number; // Decimal
  typeUnitConsumeMeasurement: string;
  tags?: string;
  nameLastModificationEmployee?: string;
  preparationDuration?: number;
  urlImage?: string;
  businessId: string;
  createdAt: Date;
  updatedAt: Date;
  productGroupId?: string;
  parentId?: string;
}

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  clearProduct: () => void;
};

export const useProductStoreZustand = create(
  persist<ProductState>(
    (set) => ({
      products: [],

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        })),

      clearProduct: () => set({ products: [] }),
    }),
    {
      name: "ClientApp_storeProduct", // Nombre del storage
      storage: createJSONStorage(() => globalThis.localStorage)
    }
  )
);

export function useProductStore() {
  return useClientStore(useProductStoreZustand);
}
