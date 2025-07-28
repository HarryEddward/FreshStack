import clsx from 'npm:clsx';
import { useShoppingStoreZustand } from "../client/zustand/storeShopping.ts";
import { useCommonStore } from "../client/zustand/storeCommon.ts";


interface Props {
    className?: string;
};


export default function BusinessIslandLogoNavbar({ className }: Props) {

  const clearCart = useShoppingStoreZustand.getState().clearCart;
  const {
      displayUsername
  } = useCommonStore();

  function redirect_() {
    console.log(globalThis.window.location.href);
    globalThis.window.location.href = "/business";
    clearCart();
  }
  
  return (
    <button onClick={() => redirect_()} className={clsx("font-dancing font-bold text-3xl", className)}>
        <span>{displayUsername}</span>
    </button>
  )
}