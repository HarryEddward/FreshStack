import { MartiniIcon, UtensilsCrossedIcon } from "npm:lucide-preact@^0.485.0";
import { useCommonStore } from "../../zustand/storeCommon.ts";

interface Props {
    translationCSR: string;
}

export default function LangClientAppIslandButtonMenu({ translationCSR }: Props) {
    
    const {
        setOpenMenuModal
    } = useCommonStore();

    return (
        <button onClick={() => setOpenMenuModal(true)} className={"w-full py-4 flex justify-center items-center gap-x-4 transition-colors duration-300 border-2 border-black  bg-white text-black rounded-bl-lg rounded-tl-lg transition hover:scale-105"}>
            <UtensilsCrossedIcon color="#000000"/>
            <span>{translationCSR}</span>
        </button>
    )
  }
  