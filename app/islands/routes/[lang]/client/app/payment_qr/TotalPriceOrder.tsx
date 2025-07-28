import { useProductStore } from "../../zustand/storeProduct.ts";
import { useShoppingStore } from "../../zustand/storeShopping.ts";



export default function LangClientAppPaymentQrIslandTotalPriceOrder() {

    const { products: cartProducts } = useShoppingStore();
    const { products: allProducts } = useProductStore();

    // Calculate total price using unityConsumePrice from useProductStore
    const totalPrice = cartProducts.reduce((acc, cartProduct) => {
        const storeProduct = allProducts.find((p) => p.id === cartProduct.id);
        const price = storeProduct ? Number(storeProduct.unityConsumePrice) || 0 : 0;
        return acc + price * cartProduct.number;

    }, 0);
    return (
        <span className="text-black text-4xl font-bold">Total a pagar: {totalPrice.toFixed(2)}€</span>
    )
}
