import Navbar from "@components/Navbar.tsx";
import { Handlers, PageProps } from '$fresh/server.ts';
import ShoppingNavbar from "@islands/routes/[lang]/client/ShoppingNavbar.tsx";
import ClientAppShoppingTab from "@islands/routes/[lang]/client/ShoppingTab.tsx";
import Footer from '@components/Footer/index.tsx';
import { ComponentChildren } from 'preact/src/index.d.ts';
import { ShoppingBasketIcon } from 'npm:lucide-preact';
import ClientAppProductsNextButton from "@islands/routes/[lang]/client/app/products/NextButton.tsx";
import ClientAppProductsBasketButton from '@islands/routes/[lang]/client/app/products/BasketButton.tsx';
import ComponentClientAppShoppingTab from "@components/routes/client/app/ShoppingTab.tsx";
import { IAllowLangs } from "@type/index.d.ts";
import { importTranslation } from "@utils/translation.ts";
import ClientAppProductsProductsPanel from "@islands/routes/[lang]/client/app/products/ProductsPanel.tsx";
import ClientAppProductsTotalPriceToPay from "@islands/routes/[lang]/client/app/products/TotalPriceToPay.tsx";
import { getCookies } from "https://deno.land/std@0.224.0/http/cookie.ts";
import { State } from "@middleware/sessionHandler.ts";
import FooterAdminOptions from "@components/routes/client/app/FooterAdminOptions.tsx";
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
  translationClientAppCommon: ITranslationClientAppCommon;
  business_id: string;
  license: string;
};

export const handler: Handlers<unknown, State> = {
  async GET(_req, ctx) {

    const session = ctx.state.sessions?.["sessionId"];

    const translation = await session.store.get("translation") as ITranslation || {};
    const business_id = String(await session.store.get("business_id")) || "";
    const license = String(await session.store.get("license")) || "";
    const actualLang: IAllowLangs = await session.store.get("lang") as IAllowLangs || "en";
    const translationClientAppCommon = await importTranslation<ITranslation>(actualLang, "client/app/common.json") as ITranslationClientAppCommon
    
    //console.log(translationClientAppCommon);

    const data: Props = {
      actualLang,
      translationClientAppCommon,
      translation,
      business_id,
      license
    };

    return ctx.render(data);
  },
}


interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    img?: string;
};


export default function index({ data }: PageProps<Props>) {

  return (
    <>
      <div className="w-full h-screen overflow-y-scroll">
          <ShoppingNavbar number_products={data.number_products}/>
          <ComponentClientAppShoppingTab translation={data.translationClientAppCommon.shopping_tab} activeTab="products"/>
          {/*<ClientAppProductsTotalPriceToPay/>*/}
          <ClientAppProductsNextButton actualLang={data.actualLang}/>
          <div className="w-full p-2">
            <ClientAppProductsProductsPanel business_id={data.business_id} license={data.license}/>
          </div>
          
      </div>
      
    </>
    
  )
}
