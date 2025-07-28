import clsx from 'npm:clsx';
import { useShoppingStoreZustand } from "./zustand/storeShopping.ts";
import { useCommonStore } from "./zustand/storeCommon.ts";
import { useEffect } from 'preact/hooks';


interface Props {
    className?: string;
};


export default function LogoNavbar({ className }: Props) {

  const clearCart = useShoppingStoreZustand.getState().clearCart;
  const {
    displayUsername
  } = useCommonStore();
  console.log(displayUsername);

  useEffect(() => {
    console.log("1" + displayUsername);
    
  }, [displayUsername]);

  

  function redirect_() {
    console.log(globalThis.window.location.href);
    globalThis.window.location.href = "/client/app/private/step_before";
    clearCart();
  }
  
  return (
    <button onClick={() => redirect_()} className={clsx("font-dancing font-bold text-3xl", className)}>
        <span>{displayUsername}</span>
    </button>
  )
}