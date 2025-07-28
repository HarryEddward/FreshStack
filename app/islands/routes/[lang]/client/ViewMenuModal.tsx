import { useState } from 'preact/hooks';
import ComponentClientAppInfoModal from './InfoModal.tsx';
import { ComponentChildren } from 'preact/src/index.d.ts';
import ComponentClientAppMenuModal from "./MenuModal.tsx";
import { useCommonStore } from "./zustand/storeCommon.ts";


interface Props {
    //isOpen: boolean;
}

export default function ClientAppViewMenuModal({ }: Props) {

    const {
        isOpenMenuModal,
        setOpenMenuModal
    } = useCommonStore();
  
    return (
        <>
            {
            isOpenMenuModal && (
            <ComponentClientAppMenuModal
                setOpen={setOpenMenuModal}
            />
            )
        }
        </>
    )
}
