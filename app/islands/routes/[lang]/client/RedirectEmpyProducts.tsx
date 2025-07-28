
import { useShoppingStore } from "./zustand/storeShopping.ts";
import { useEffect } from "preact/hooks";


interface Props {
    actualLang: string;
}

export default function ClientAppIslandRedirectEmpyProducts({ actualLang = "ca-mall" }: Props) {
  
    const { products } = useShoppingStore();

    useEffect(() => {
        if (products.length === 0) {
            globalThis.window.location.href = `/${actualLang}/client/app/private/services/products`;
        }
        
    }, [products]);
    
    return null;
}
