import clsx from 'npm:clsx';
import { useShoppingStoreZustand } from "../../client/zustand/storeShopping.ts";


interface Props {
    className?: string;
};


export default function LogoNavbar({ className }: Props) {

  const clearCart = useShoppingStoreZustand.getState().clearCart;

  function redirect_() {
    console.log(globalThis.window.location.href);
    globalThis.window.location.href = "/business/app";
    clearCart();
  }
  
  return (
    <button onClick={() => redirect_()} className={clsx("font-dancing font-bold text-3xl", className)}>
        <span>Sa Plaça</span>
    </button>
  )
}