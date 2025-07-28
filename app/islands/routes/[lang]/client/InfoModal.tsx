import { h } from "preact";
import { memo } from "preact/compat";
import { useState } from "preact/hooks";
import ComponentClientAppModalLayout from "@components/routes/client/app/ModalLayout.tsx";
import { TrashIcon, XIcon } from "npm:lucide-preact@^0.485.0";
import { ComponentChildren } from 'preact/src/index.d.ts';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  img?: string;
  number: number;
}

const selectedProductsList: Product[] = [
  { id: 1, name: "Café con leche", price: 2.0, description: "Producto de prueba 1", img: "/img/coffee_with_milk.png", number: 3 },
  { id: 2, name: "Cafe manchado", price: 1.4, description: "Producto de prueba 1", img: "/img/coffee_manchado.png", number: 1 },
  { id: 3, name: "Café Late", price: 2.3, description: "Producto de prueba 1", img: "/img/coffee_late.png", number: 1 },
  { id: 4, name: "Capuchino", price: 3.4, description: "Producto de prueba 1", img: "/img/coffee_small.png", number: 10 },
];

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  msg: string | ComponentChildren;
  title: string;
}

export default function ComponentClientAppInfoModal({ open, setOpen, msg, title }: Props) {



  return (
    <ComponentClientAppModalLayout>
      <div className="flex flex-row w-full justify-between items-start py-4 rounded-t-lg">
        <h2 className="text-4xl font-bold text-gray-800 font-dancing border-l-2 border-black pl-4">{title}</h2>
        <button type="button" className="p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={() => setOpen(false)}>
          <XIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="flex flex-col gap-y-4 mt-4 h-full overflow-y-scroll text-lg">
        {msg}
      </div>
    </ComponentClientAppModalLayout>
  );
}
