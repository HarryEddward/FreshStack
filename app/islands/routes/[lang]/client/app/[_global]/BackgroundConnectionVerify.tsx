// @routes/[lang]/client/app/[_global]/BackgroundConnectionVerify.tsx

import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import useLangClientApp_globalIslandBackgroundConnectionVerify from '@islands/routes/[lang]/client/app/[_global]/hooks/BackgroundConnectionVerify.tsx';
import clsx from 'clsx';
import { IWebsocketClientRequest, IWebsocketClientRequestMeta } from '@islands/utils/websockets.ts';
import { useWebSocketStore } from "@islands/providers/stores/websocketStore.ts";

interface Props {
  className?: string;
};

export default function LangClientApp_globalIslandBackgroundConnectionVerify({ className }: Props) {
  
  const { isConnected, sendWebsocketMessage, connect, disconnect } = useWebSocketStore();

  useEffect(() => {
    console.log('Layout useEffect: Initializing WebSocket connection');

    if (!isConnected){
      connect();
    }
    

    // Opcional: Limpieza si el layout se desmontara (aunque en Fresh suele ser la raíz)
    return () => {
      console.log('Layout useEffect cleanup: Disconnecting WebSocket');
      disconnect();
    };

  }, []);

  return (
    <div className={clsx(`flex flex-col w-full p-4 justify-left gap-x-2 font-semibold gap-y-2`, className)}>
      {isConnected ? (
        <div className={"flex gap-x-2 justify-left items-center"}>
          <div className={"h-3 w-3 bg-green-400 rounded-full"}/>
          <span>Connected</span>
        </div>
      ) : (
        <div className={"flex gap-x-2 justify-left items-center"}>
          <div className={"h-3 w-3 bg-red-400 rounded-full"}/>
          <span>Not Connected</span>
        </div>
        
      )}
      <button
      className={"p-4 border-2"}
      onClick={() => {
        sendWebsocketMessage(
          "business.ping",
          {
            msg: "Ping"
          },
          {}
        );
      }}
      >Ping</button>
      <button
      className={"p-4 border-2"}
      onClick={() => {
        sendWebsocketMessage(
          "business.request.waiter.call",
          {
            msg: "Hello waiter?"
          },
          {}
        );
      }}
      >Llamar al camarero</button>
      <button
      className={"p-4 border-2"}
      onClick={() => {
        sendWebsocketMessage(
          "business.status.mobile",
          {
            msg: "Is connected?"
          },
          {}
        );
      }}
      >Status</button>
    </div>
  )
}
