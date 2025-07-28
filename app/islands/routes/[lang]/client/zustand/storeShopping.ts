import { create } from "zustand";
import { createJSONStorage, persist, PersistStorage } from "zustand/middleware";
import { Preferences } from "@capacitor/preferences";
import { useClientStore } from "@islands/hooks/useClientStore.ts";
import { useProductStoreZustand } from "./storeProduct.ts";

interface Product {
  id: string;          // cambiado a string
  name: string;
  price: number;
  description: string;
  img?: string;
  number: number;
}

interface ShoppingState {
  products: Product[];
  addOneProduct: (id: string) => void;
  removeOneProduct: (id: string) => void;
  removeAllProducts: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  clearCart: () => void;
}

// Adaptar Storage de Capacitor a PersistStorage<ShoppingState>
const capacitorStorage: PersistStorage<ShoppingState> = {
  getItem: async (name: string) => {
    const item = await Preferences.get({ key: name });
    if (!item.value) return null;
    const parsed = JSON.parse(item.value);
    return { state: parsed as ShoppingState };
  },
  setItem: async (name: string, value: { state: ShoppingState; version?: number }) => {
    await Preferences.set({ key: name, value: JSON.stringify(value.state) });
  },
  removeItem: async (name: string) => {
    await Preferences.remove({ key: name });
  },
};

export const useShoppingStoreZustand = create(
  persist<ShoppingState>(
    (set) => ({
      products: [
        // Puedes agregar productos de prueba aquí si quieres
      ],

      addOneProduct: (id) =>
        set((state) => {
          const availableProducts = useProductStoreZustand.getState().products;

          const productInCart = state.products.find((p) => p.id === id);

          if (productInCart) {
            return {
              products: state.products.map((p) =>
                p.id === id ? { ...p, number: p.number + 1 } : p
              ),
            };
          } else {
            const productToAdd = availableProducts.find((p) => p.id === id);
            if (!productToAdd) return {};

            return {
              products: [...state.products, { ...productToAdd, number: 1 }],
            };
          }
        }),

      removeOneProduct: (id) =>
        set((state) => ({
          products: state.products
            .map((p) => (p.id === id ? { ...p, number: p.number - 1 } : p))
            .filter((p) => p.number > 0),
        })),

      removeAllProducts: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          ),
        })),

      clearCart: () => set({ products: [] }),
    }),
    {
      name: "ClientApp_storeShopping",
      storage: createJSONStorage(() => globalThis.localStorage),
      // storage: capacitorStorage,
    }
  )
);

export function useShoppingStore() {
  return useClientStore(useShoppingStoreZustand);
}
