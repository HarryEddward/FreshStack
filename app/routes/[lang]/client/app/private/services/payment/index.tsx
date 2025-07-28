import { useSignal } from "@preact/signals";
import Counter from "@islands/routes/[lang]/client/Counter.tsx";
import Footer from "@components/Footer/index.tsx";
import BankCardScanner from '@islands/routes/[lang]/client/app/payment/BankCardScanner.tsx';
import Navbar from "@islands/routes/[lang]/client/ShoppingNavbar.tsx";
import { Handlers, PageProps } from '$fresh/server.ts';
import ClientAppShoppingTab from "@islands/routes/[lang]/client/ShoppingTab.tsx";
import ClientAppPaymentProductsButton from "@islands/routes/[lang]/client/app/payment/ProductsButton.tsx";
import { importTranslation } from "@utils/translation.ts";
import { IAllowLangs } from '@type/index.d.ts';
import ComponentClientAppShoppingTab from "@components/routes/client/app/ShoppingTab.tsx";
import { State } from "@middleware/sessionHandler.ts";
import ClientAppIslandRedirectEmpyProducts from "@islands/routes/[lang]/client/RedirectEmpyProducts.tsx";

import { IGET_langClientAppPaymentPayload } from '@routes/[lang]/client/app/private/services/payment/_routes/_payload.ts';
import {
  GET_langClientAppPaymentController,
  POST_langClientAppPaymentController
} from '@routes/[lang]/client/app/private/services/payment/_routes/_controller.ts';
import LangClientApp_globalIslandBackgroundConnectionVerify from "@islands/routes/[lang]/client/app/[_global]/BackgroundConnectionVerify.tsx";
import useLangClientApp_globalIslandBackgroundConnectionVerify from '@islands/routes/[lang]/client/app/[_global]/hooks/BackgroundConnectionVerify.tsx';
import ClientAppViewInfoModal from "@islands/routes/[lang]/client/ViewInfoModal.tsx";



export const handler: Handlers<unknown, State> = {

  async GET(req, ctx) {
    return await GET_langClientAppPaymentController(req, ctx);
  },
  
  async POST(req, ctx) {
    return await POST_langClientAppPaymentController(req, ctx);
  }
}

export default function Home({ data }: PageProps<IGET_langClientAppPaymentPayload>) {
  const count = useSignal(3);
  return (
    
      
      <main className="w-full h-screen">
        <ClientAppViewInfoModal
          isOpen={data.badFormatCardNumber}
          title="Número de Tarjeta Incorrecto"
          msg="Trata de ser lo mas preciso y revisa que tu tarjeta bancaría es correcto antes de seguir."
        />
        <ClientAppViewInfoModal
          isOpen={data.badFormatCvc}
          title="CVC Incorrecto"
          msg="Trata de ser lo mas preciso y revisa que tu tarjeta bancaría es correcto antes de seguir."
        />
        <ClientAppViewInfoModal
          isOpen={data.badFormatExpireDate}
          title="Fecha de Expiración Incorrecto"
          msg="Trata de ser lo mas preciso y revisa que tu tarjeta bancaría es correcto antes de seguir."
        />
        
        <ClientAppIslandRedirectEmpyProducts actualLang={data.actualLang}/>
        <Navbar number_products={0}/>
        
        <ComponentClientAppShoppingTab translation={data.translationClientAppCommon.shopping_tab} activeTab="payment"/>
        <BankCardScanner actualLang={data.actualLang}/>
        <ClientAppPaymentProductsButton actualLang={data.actualLang}/>
        <LangClientApp_globalIslandBackgroundConnectionVerify className="justify-start text-black"/>
      </main>
      
    
    
  );
}
