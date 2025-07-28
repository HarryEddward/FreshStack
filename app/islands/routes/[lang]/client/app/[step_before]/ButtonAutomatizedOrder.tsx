import { ClockArrowUpIcon, CreditCardIcon } from "npm:lucide-preact@^0.485.0";
import { IAllowLangs } from "@type/index.d.ts";
import { useLanguageStore } from "@islands/routes/[lang]/client/app/[_global]/zustand/storeLang.ts";
import { useEffect } from 'preact/hooks';
import { useWebSocketStore } from '@islands/providers/stores/websocketStore.ts';

interface Props {
  translationCSR: string;
}

export default function LangClientAppIslandButtonAutomatizedOrder({ translationCSR }: Props) {

  const { lang } = useLanguageStore();


  function redirect_(lang: IAllowLangs) {
    

    console.log(globalThis.window.location.href);
    globalThis.window.location.href = `/${lang}/client/app/private`;
  }

  return (
    <button onClick={() => redirect_(lang)} className={"w-full rounded-lg py-4 flex justify-center items-center gap-x-2 transition-colors duration-300 border-2 border-black drop-shadow-2xl shadow-white bg-green-300 hover:bg-green-400"}>
      <CreditCardIcon />
      <span>{translationCSR}</span>
    </button>
  )
}
