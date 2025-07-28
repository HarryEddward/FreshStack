import { Handlers, PageProps, FreshContext } from '$fresh/server.ts';
import { GET_langClientAppPaymentQrController, POST_langClientAppPaymentQrController, PUT_langClientAppPaymentQrController, DELETE_langClientAppPaymentQrController } from '@routes/[lang]/client/app/private/services/payment_qr/_routes/_controller.ts';
import { IGET_langClientAppPaymentQrPayload } from '@routes/[lang]/client/app/private/services/payment_qr/_routes/_payload.ts';
import { State } from "@middleware/sessionHandler.ts";
import ShoppingNavbar from '@islands/routes/[lang]/client/ShoppingNavbar.tsx';
import ComponentClientAppShoppingTab from '@components/routes/client/app/ShoppingTab.tsx';
import ClientAppPaymentQrNextButton from "@islands/routes/[lang]/client/app/payment_qr/NextButton.tsx";
import QrCode from "@islands/routes/[global]/QrSvg.tsx";
import LangClientAppPaymentQrIslandTotalPriceOrder from "@islands/routes/[lang]/client/app/payment_qr/TotalPriceOrder.tsx";
import LangClientAppPaymentQrIslandQrOrder from "@islands/routes/[lang]/client/app/payment_qr/QrOrder.tsx";

export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langClientAppPaymentQrController(req, ctx);
  },
  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langClientAppPaymentQrController(req, ctx);
  },
  async PUT(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await PUT_langClientAppPaymentQrController(req, ctx);
  },
  async DELETE(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await DELETE_langClientAppPaymentQrController(req, ctx);
  },
};

export default function Index({ data }: PageProps<IGET_langClientAppPaymentQrPayload>) {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      {/* Navbar alineada al inicio */}
      <div className="flex-none">
        <ShoppingNavbar number_products={data.number_products} />
        <ComponentClientAppShoppingTab translation={data.translationClientAppCommon.shopping_tab} activeTab="payment" />
      </div>

      <LangClientAppPaymentQrIslandQrOrder/>

      {/* Botón alineado al final */}
      <div className="flex-none flex justify-center mb-8">
        <ClientAppPaymentQrNextButton actualLang={data.actualLang} />
      </div>
    </div>
  );
}