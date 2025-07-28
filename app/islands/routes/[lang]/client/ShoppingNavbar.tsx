import { ShoppingBasketIcon } from "npm:lucide-preact";
import LogoNavbar from '@islands/routes/[lang]/client/LogoNavbar.tsx';
import BasketButton from "@islands/routes/[lang]/client/BasketButton.tsx";
import ComponentClientAppBasketModal from "@islands/routes/[lang]/client/app/products/BasketModal.tsx";
import { useState } from 'preact/hooks';
import { useShoppingStore } from "./zustand/storeShopping.ts";
//import { useClientStore } from '@fresh-stack/zustand';

interface Props {
    number_products: number
};

export default function ShoppingNavbar({ number_products }: Props) {

  const [open, setOpen] = useState(false);

  console.log("Rendering ShoppingNavbar - Server:", typeof window === "undefined");
  console.log("Rendering ShoppingNavbar - Client:", typeof window !== "undefined");

  const {products} = useShoppingStore();
  console.log(products);


  return (
    <div className={"fixed top-0 left-0 w-full bg-white/30 backdrop-blur-sm z-[60]"}>
          {
            open && <ComponentClientAppBasketModal open={open} setOpen={setOpen}/>
          }
        <div className="flex flex-row w-full  p-2 py-4">
          
        
            <LogoNavbar className="flex flex-row justify-start w-full"/>
            <div className={"flex flex-row justify-end w-full  items-center pr-4"}>

              <div className={"relative flex h-full justify-center"}>
                <BasketButton open={open} setOpen={setOpen}/>
                {
                  products.length !== 0 && (
                    <div className={"absolute top-1 left-5 h-2 w-2 bg-red-500 rounded-full"}/>
                  )
                }
              </div>
            </div>
        </div>
        
    </div>
  )
}
