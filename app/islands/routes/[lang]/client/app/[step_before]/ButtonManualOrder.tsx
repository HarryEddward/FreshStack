// @routes/[lang]/client/app/[step_before]/ButtonManualOrder.tsx

import { PhoneCallIcon } from "npm:lucide-preact@^0.485.0";
import useLangClientApp_globalIslandBackgroundConnectionVerify from '@islands/routes/[lang]/client/app/[_global]/hooks/BackgroundConnectionVerify.tsx';
import { useWebSocketStore } from "@islands/providers/stores/websocketStore.ts";
import { useEffect } from 'preact/hooks';
import useRPCWebsockets from "@islands/hooks/useRPCWebsockets.ts";

interface Props {
    translationCSR: string;
}

export default function LangClientAppIslandButtonManualOrder({ translationCSR }: Props) {

    const { sendWebsocketMessage } = useWebSocketStore();

    const { makeRequest, stateRequestSignal } = useRPCWebsockets('business.ping');
    


    return (
        <button
        className={"w-full rounded-lg py-4 flex justify-center items-center gap-x-2 transition-colors duration-300 border-2 border-gray-100 bg-white hover:bg-gray-50"}
        onClick={() => {
            makeRequest({ msg: "Ping" });
        }}
        >
            <PhoneCallIcon/>
            <span>{translationCSR}</span>
        </button>
    )
  }
  