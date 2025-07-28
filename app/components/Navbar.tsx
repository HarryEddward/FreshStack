import { ShoppingBasketIcon } from "npm:lucide-preact";
import LogoNavbar from '@islands/routes/[lang]/client/LogoNavbar.tsx';

interface Props {
    number_products: number
};

export default function Navbar() {

  return (
    <div className={"fixed top-0 left-0 w-full bg-white/30 backdrop-blur-sm"}>
        <div className="flex flex-row w-full  p-2 py-4">
            <LogoNavbar className="flex flex-row justify-start w-full"/>
            
        </div>
        
        
    </div>
  )
}
