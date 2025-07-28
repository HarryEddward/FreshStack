import { ShoppingBasketIcon } from "npm:lucide-preact";
import LogoNavbar from '@islands/routes/[lang]/business/app/LogoNavbar.tsx';
import { AppWindowIcon, BookMarkedIcon, GrapeIcon, HomeIcon } from "npm:lucide-preact@^0.485.0";
import { handleRedirect } from "@utils/frontend/redirect.ts";

interface Props {
    number_products: number
};

export default function LangBusinessAppIslandNavigationBar() {

  return (
    <div className={"fixed bottom-0 left-0 w-full bg-white/30 backdrop-blur-sm"}>
        <div className="flex flex-row justify-evenly w-full  p-2 py-6 gap-x-4">

          <button onClick={() => handleRedirect('/business/app/')}>
            <HomeIcon/>
          </button>
            
          <button>
            <AppWindowIcon />
          </button>
          
          <button>
            <BookMarkedIcon />
          </button>
          
            
        </div>
        
        
    </div>
  )
}
