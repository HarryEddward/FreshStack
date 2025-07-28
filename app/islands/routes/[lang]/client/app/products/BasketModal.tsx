import { h } from "preact";
import { memo } from "preact/compat";
import { useState } from "preact/hooks";
import ComponentClientAppModalLayout from "@components/routes/client/app/ModalLayout.tsx";
import { TrashIcon, XIcon } from "npm:lucide-preact@^0.485.0";
import { useShoppingStore } from "../../zustand/storeShopping.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string;
  number: number;
  urlImage?: string; // Added to match the usage in the img src
}

const selectedProductsList: Product[] = [
  { id: 1, name: "Café con leche", price: 2.0, description: "Producto de prueba 1", img: "/img/coffee_with_milk.png", number: 3, urlImage: "/img/coffee_with_milk.png" },
  { id: 2, name: "Cafe manchado", price: 1.4, description: "Producto de prueba 1", img: "/img/coffee_manchado.png", number: 1, urlImage: "/img/coffee_manchado.png" },
  { id: 3, name: "Café Late", price: 2.3, description: "Producto de prueba 1", img: "/img/coffee_late.png", number: 1, urlImage: "/img/coffee_late.png" },
  { id: 4, name: "Capuchino", price: 3.4, description: "Producto de prueba 1", img: "/img/coffee_small.png", number: 10, urlImage: "/img/coffee_small.png" },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ProductItem = memo(({ product }: { product: Product }) => {
  const { removeOneProduct, removeAllProducts } = useShoppingStore();
  console.log("Renderizando producto:", product.name);

  return (
    <div className="w-full p-4 flex flex-col border-2 rounded-lg bg-white shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex-1 flex flex-col gap-y-2">
          <div className="text-2xl font-normal py-2 font-dancing text-gray-600">
            <span>{product.name} x{product.number}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <button
              onClick={() => removeOneProduct(product.id)}
              className="flex items-center py-2 gap-x-2 justify-center bg-green-200 border-2 border-black p-2 rounded-lg hover:bg-green-300 transition-transform duration-200 active:scale-95"
            >
              <TrashIcon className="w-5 h-5" />
              <span>Uno</span>
            </button>
            <button
              onClick={() => removeAllProducts(product.id)}
              className="flex w-full py-2 items-center justify-center gap-x-2 text-green-200 bg-gray-800 border-2 border-black p-2 rounded-lg hover:bg-gray-950 transition-transform duration-200 active:scale-95"
            >
              <TrashIcon className="w-5 h-5" color="#bbf7d0" />
              <span>Todos</span>
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 ml-4">
          <img
            src={product.urlImage || "/img/client/app/unavailable.png"}
            onError={(e) => {
              console.log("Error loading image for product: ", product.urlImage);
              e.currentTarget.src = "/img/client/app/unavailable.png";
            }}
            className="max-h-24 object-contain"
            alt={product.name}
          />
        </div>
      </div>
    </div>
  );
});

export default function ComponentClientAppBasketModal({ open, setOpen }: Props) {
  const { products } = useShoppingStore();

  return (
    <ComponentClientAppModalLayout>
      <div className="flex flex-row w-full justify-between items-start py-4 rounded-t-lg">
        <h2 className="text-4xl font-bold text-gray-800 font-dancing border-l-2 border-black pl-4">Productos Seleccionados</h2>
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={() => setOpen(!open)}>
          <XIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex flex-col gap-y-4 mt-4 h-full">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </ComponentClientAppModalLayout>
  );
}