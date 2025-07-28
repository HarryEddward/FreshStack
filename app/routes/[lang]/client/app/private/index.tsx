// @routes/[lang]/client/index.tsx
// REFACTORIZAR TODO: Cambiar el nombre de la ruta a /client/app

import { useSignal } from "@preact/signals";
import Footer from "@components/Footer/index.tsx";
import { Handlers, PageProps, FreshContext } from '$fresh/server.ts';
import Navbar from "@components/Navbar.tsx";
import ClientOrderButton from "@islands/routes/[lang]/client/OrderButton.tsx";
import ClientLangButton from "@islands/routes/[lang]/client/LangButton.tsx";
import ClientEmailField from "@islands/routes/[lang]/client/EmailField.tsx";
import { Head } from "$fresh/runtime.ts";
import { mergeMeta, MetaComponent } from "@utils/mergeMeta.ts";
import { State } from "@middleware/sessionHandler.ts";
import { z } from "npm:zod@3.23.8";
import { termsAndConditionsErrorResponse, emptyEmailFieldErrorResponse } from "./_routes/_utils.ts";
import { useState, useEffect } from 'preact/hooks';
import ClientAppViewInfoModal from "@islands/routes/[lang]/client/ViewInfoModal.tsx";
import { GET_langClientAppController, POST_langClientAppController } from './_routes/_controller.ts';
import FooterAdminOptions from "@components/routes/client/app/FooterAdminOptions.tsx";
import useLangClientApp_globalIslandBackgroundConnectionVerify from "@islands/routes/[lang]/client/app/[_global]/hooks/BackgroundConnectionVerify.tsx";
import LangClientApp_globalIslandBackgroundConnectionVerify from "@islands/routes/[lang]/client/app/[_global]/BackgroundConnectionVerify.tsx";
import { useWebSocketStore } from "@islands/providers/stores/websocketStore.ts";
import { IAllowLangs } from '@type/index.d.ts';


interface ITranslation {
  order_title?: string;
  ask_ticket?: string;
  change_lang?: string;
  placeholder_email?: string;
  terms_and_conditions?: string;
};

interface Props {
  notAcceptedTermsAndConditions: boolean;
  badFormatEmail: boolean;
  actualLang: IAllowLangs;
  translation: ITranslation;
  access_token?: string;
};



export const handler: Handlers<unknown, State> = {
  async GET(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await GET_langClientAppController(req, ctx);
  },

  async POST(req: Request, ctx: FreshContext<State>): Promise<Response> {
    return await POST_langClientAppController(req, ctx);
  },
};

const meta = mergeMeta();

export default function Home({ data }: PageProps<Props>) {

  return (
    <main className="w-full h-full">
      <ClientAppViewInfoModal
        isOpen={data.notAcceptedTermsAndConditions}
        title="Terminos & Condiciones"
        msg="Debes de aceptar los terminos y condiciones para continuar con la compra."
      />
      <ClientAppViewInfoModal
        isOpen={data.badFormatEmail}
        title="Email incorrecto"
        msg="
          El email proporcionado no es correcto. Por favor, revisalo e intentalo de nuevo.

          Recuerda que eres responsable de la información que proporcionas.  
        "
      />
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.og?.title} />
        <meta property="og:description" content={meta.og?.description} />
      </Head>
      
      <Navbar />
      <View data={data} />
    </main>
  );
}

function View({ data }: { data: Props }) {
  const termsAccepted = useSignal<boolean>(false);
  const wantsTicket = useSignal<boolean>(false);

  

  return (
    <form
      method="POST"
      className="w-full max-w-[30rem] h-screen flex flex-col justify-center items-center px-4 gap-y-4"
    >
      {/*JSON.stringify(data.access_token)*/}
      
      <div className="w-full flex flex-col p-2 border-2 border-gray-100 gap-y-4 py-3 rounded-lg bg-white bg-green-100 bg-white/30 backdrop-blur-md shadow-md">
        <TermsAndConditions
          name={data.translation.terms_and_conditions}
          checked={termsAccepted.value}
          onChange={(e: Event) => (termsAccepted.value = e.currentTarget.checked)}
        />
        <ClientOrderButton
          name={data.translation.order_title}
          actualLang={data.actualLang}
        />
      </div>
      <div className="w-full flex flex-col p-2 border-2 border-gray-100 gap-y-4 py-3 rounded-lg bg-white bg-green-100">
        <TicketProcesor
          name={data.translation.ask_ticket}
          checked={wantsTicket.value}
          onChange={(e: Event) => (wantsTicket.value = e.currentTarget.checked)}
        />
        <ClientEmailField placeholder={data.translation.placeholder_email} />
        
      </div>
      
      {/*<ClientLangButton
        actualLang={data.actualLang}
        nameChangeButton={data.translation.change_lang}
      />*/ ""}
      
    </form>
  );
}

function TermsAndConditions({
  name,
  checked,
  onChange,
}: {
  name?: string;
  checked: boolean;
  onChange: (e: Event) => void;
}) {
  return (
    <div className="w-full">
      <input
        type="checkbox"
        id="TermsAndConditions"
        name="terms"
        value="accepted"
        checked={checked}
        onChange={onChange}
        className="text-green-600 border-green-300 rounded focus:ring-2 focus:ring-green-500"
      />
      <label htmlFor="TermsAndConditions" className="pl-1 self-center underline text-black font-light">
        {name || "Terms & Conditions"}
      </label>
    </div>
  );
}

function TicketProcesor({
  name,
  checked,
  onChange,
}: {
  name?: string;
  checked: boolean;
  onChange: (e: Event) => void;
}) {
  return (
    <div className="w-full">
      <input
        type="checkbox"
        id="TicketProcesor"
        name="ticket"
        value="requested"
        checked={checked}
        onChange={onChange}
        className="text-green-600 border-green-300 rounded focus:ring-2 focus:ring-green-500"
      />
      <label htmlFor="TicketProcesor" className="pl-1 self-center text-black font-light">
        {name || "Vols el ticket?"}
      </label>
    </div>
  );
}

function WalkingEasterEgg() {
    return (
      <div className="relative w-full h-20 bg-white overflow-hidden rotate-180">
        <div className="absolute bottom-0 left-0 animate-walk-cycle">
          <div className="w-10 h-20 relative">
            {/* Cabeza */}
            <div className="w-6 h-6 bg-black rounded-full absolute top-0 left-[0.3rem]" />
            {/* Cuerpo */}
           
            {/* Pierna izquierda */}
            <div className="w-1 h-6 bg-black absolute top-[15px] left-3 animate-leg-left origin-top" />
            {/* Pierna derecha */}
            <div className="w-1 h-6 bg-black absolute top-[15px] left-5 animate-leg-right origin-top" />
            {/* Brazos */}
            <div className="w-1 h-6 bg-black absolute top-[6px] left-2 animate-arm-left origin-top" />
            <div className="w-1 h-6 bg-black absolute top-[6px] left-6 animate-arm-right origin-top" />
          </div>
        </div>
      </div>
    );
}