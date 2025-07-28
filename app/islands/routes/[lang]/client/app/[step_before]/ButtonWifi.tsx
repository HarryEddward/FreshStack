import { WifiIcon, WifiOffIcon } from "npm:lucide-preact@^0.485.0";
import { useCommonStore, useCommonStoreZustand } from "../../zustand/storeCommon.ts";


export default function LangClientAppIslandButtonWifi() {

  const {
    wifiEnabled,
    setOpenWifiModal
  } = useCommonStore();


  return (
    <button
    disabled={!wifiEnabled}
    onClick={() => {
      setOpenWifiModal(!useCommonStoreZustand.getState().isOpenWifiModal);
    }}
    className="p-4 px-6 border-2 border-black bg-white transition hover:scale-105">
        {
          wifiEnabled ? (
            <WifiIcon/>
          ) : (
            <WifiOffIcon/>
          )
        }
        
    </button>
  )
}
