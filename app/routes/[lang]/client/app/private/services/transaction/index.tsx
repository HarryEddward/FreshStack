import { Handlers, PageProps } from '$fresh/server.ts';
import ShoppingNavbar from "@islands/routes/[lang]/client/ShoppingNavbar.tsx";
import ClientAppProductsNextButton from "@islands/routes/[lang]/client/app/products/NextButton.tsx";
import ShoppingTab from "@islands/routes/[lang]/client/ShoppingTab.tsx";
import Footer from '@components/Footer/index.tsx';
import { CheckCircleIcon, XCircle, XCircleIcon } from "npm:lucide-preact";
import Barcode from "@islands/routes/[lang]/client/Barcode.tsx";
import ClientAppTransactionOrderBarcode from "@islands/routes/[lang]/client/app/transaction/OrderBarcode.tsx";
import { nanoid } from "nanoid";
import ClientAppTransactionViewTransaction from "@islands/routes/[lang]/client/app/transaction/ViewTransaction.tsx";
import { IAllowLangs } from "@type/index.d.ts";
import { importTranslation } from "@utils/translation.ts";
import ComponentClientAppShoppingTab from "@components/routes/client/app/ShoppingTab.tsx";
import LogoNavbar from "@islands/routes/[lang]/client/LogoNavbar.tsx";
import { State } from "@middleware/sessionHandler.ts";
import LangClientApp_globalIslandBackgroundConnectionVerify from "@islands/routes/[lang]/client/app/[_global]/BackgroundConnectionVerify.tsx";

interface ITranslation {
    order_title?: string;
    ask_ticket?: string;
    change_lang?: string;
    placeholder_email?: string;
    terms_and_conditions?: string;
  };
  
  export interface ITranslationClientAppCommonShoppingTab {
    products: string;
    payment: string;
    transaction: string;
  }
  
  interface ITranslationClientAppCommon {
    shopping_tab: ITranslationClientAppCommonShoppingTab;
  };
  
  interface Props {
    actualLang: IAllowLangs;
    translation: ITranslation;
    translationClientAppCommon: ITranslationClientAppCommon
  };
  
  export const handler: Handlers<unknown, State>= {
    async GET(_req, ctx) {
      const session = ctx.state.sessions?.["sessionId"];
  
      const translation = await session.store.get("translation") as ITranslation || {};
      const actualLang: IAllowLangs = await session.store.get("lang") as IAllowLangs || "en";
      const translationClientAppCommon = await importTranslation<ITranslation>(actualLang, "client/app/common.json") as ITranslationClientAppCommon
      
      console.log(translationClientAppCommon);
  
      const data: Props = {
        actualLang,
        translationClientAppCommon,
        translation
      };
  
      return ctx.render(data);
    },
  };

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    img?: string;
}

const listProducts: Product[] = [
    {
        id: 1,
        name: "Café con leche",
        price: 2.00,
        description: "Producto de prueba 1",
        img: "/img/coffee_with_milk.png",
    },
    {
        id: 2,
        name: "Cafe manchado",
        price: 1.40,
        description: "Producto de prueba 1",
        img: "/img/coffee_manchado.png",
    },
    {
        id: 3,
        name: "Café Late",
        price: 2.30,
        description: "Producto de prueba 1",
        img: "/img/coffee_late.png",
    },
    {
        id: 4,
        name: "Capuchino",
        price: 3.40,
        description: "Producto de prueba 1",
        img: "/img/coffee_small.png",
    },
];

export default function index({ data }: PageProps<Props>) {

    return (
      <>
        <div className="w-full h-full">
          {/*<LogoNavbar className="fixed top-0 left-0  bg-white/30 backdrop-blur-sm p-2 pt-4"/>*/}
          {/*<ShoppingNavbar number_products={data.number_products}/>*/}
          
          <ComponentClientAppShoppingTab translation={data.translationClientAppCommon.shopping_tab} activeTab="transaction" className=""/>
          
          <div className={"flex w-full h-full p-2"}>
              <ClientAppTransactionViewTransaction actualLang={data.actualLang}/>
          </div>
          <LangClientApp_globalIslandBackgroundConnectionVerify className="justify-start text-black"/>
        
        
        </div>
        
      </>
    
  )
};