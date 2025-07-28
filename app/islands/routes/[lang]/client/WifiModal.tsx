import { h } from "preact";
import { memo } from "preact/compat";
import { useState } from "preact/hooks";
import ComponentClientAppModalLayout from "@components/routes/client/app/ModalLayout.tsx";
import { TrashIcon, XIcon } from "npm:lucide-preact@^0.485.0";
import { ComponentChildren } from 'preact/src/index.d.ts';
import ClientAppProductsProductsPanel from '@islands/routes/[lang]/client/app/products/ProductsPanel.tsx';
import QrCode from "../../[global]/QrSvg.tsx";
import { useCommonStore } from "./zustand/storeCommon.ts";

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
  //open: boolean;
  setOpen: (value: boolean) => void;
}

export default function ComponentClientAppWifiModal({ setOpen }: Props) {

  const {
    wifiPassword,
  } = useCommonStore();


  return (
    <ComponentClientAppModalLayout>
      <>
        <div className="fixed top-0 right-0 flex flex-row w-full justify-between items-end py-4 rounded-t-lg">
            <button type="button" className="p-2 rounded-full hover:bg-gray-900 transition-colors" onClick={() => setOpen(false)}>
              <XIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className={"flex flex-col w-full p-3"}>
          <h2 className={"font-dancing text-5xl pb-8 "}>Wifi</h2>
          <div className="w-full flex flex-col justify-center items-center">
            <div className={"py-4 break-words"}>
              <span className={"font-black"}>Contraseña:</span>
              <span className={"pl-2"}>{wifiPassword ? wifiPassword : "(Nothing)"}</span>
            </div>
            <QrCode text={wifiPassword}/>
          </div>
        </div>
      </>
      
    </ComponentClientAppModalLayout>
  );
}
