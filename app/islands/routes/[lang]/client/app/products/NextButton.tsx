import { ArrowRightIcon } from "npm:lucide-preact";
import { useShoppingStore } from '../../zustand/storeShopping.ts';
import { useProductStore } from '../../zustand/storeProduct.ts';

interface Props {
    actualLang?: string;
}

export default function ClientAppProductsNextButton({ actualLang = "es" }: Props) {
    const { products: cartProducts } = useShoppingStore();
    const { products: allProducts } = useProductStore();

    // Calculate total price using unityConsumePrice from useProductStore
    const totalPrice = cartProducts.reduce((acc, cartProduct) => {
        const storeProduct = allProducts.find((p) => p.id === cartProduct.id);
        const price = storeProduct ? Number(storeProduct.unityConsumePrice) || 0 : 0;
        return acc + price * cartProduct.number;
    }, 0);

    const handleRedirect = (actualLang: string) => {
        if (cartProducts.length === 0) return; // Prevent redirect if cart is empty
        console.log("Redirigiendo a la página de pago");
        globalThis.window.location.href = `/${actualLang}/client/app/private/services/payment_qr`;
    };

    return (
        <div className="w-full p-2">
            <button 
                onClick={() => handleRedirect(actualLang)} 
                disabled={totalPrice === 0}
                className={`w-full rounded-lg py-4 flex justify-center items-center gap-x-2 transition-colors duration-300 border-2 border-black drop-shadow-2xl shadow-white
                    ${totalPrice === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-300 hover:bg-green-400'}
                `}
            >
                <span className="text-black text-2xl">{totalPrice.toFixed(2)}€</span>
                <ArrowRightIcon color="black" size={40} />
            </button>
        </div>
    );
}