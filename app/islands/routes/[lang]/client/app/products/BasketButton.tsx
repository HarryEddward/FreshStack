
import { ShoppingBasketIcon } from 'lucide-preact';
import { useShoppingStore } from "../../zustand/storeShopping.ts";


interface Props {
  id: string;
};


export default function ClientAppProductsBasketButton({ id }: Props) {

  const { addOneProduct } = useShoppingStore();

  return (  
    <button
    onClick={() => addOneProduct(id)}
        className="bg-green-300 p-4 rounded-lg transition-transform duration-200 active:scale-90 border-2 border-black shadow-2xl shadow-gray-400 z-50"
    >
        <ShoppingBasketIcon />
    </button>
    
  );
}

