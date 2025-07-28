import { useState } from 'preact/hooks';
import ComponentClientAppInfoModal from './InfoModal.tsx';
import { ComponentChildren } from 'preact/src/index.d.ts';
import ComponentClientAppWifiModal from "./WifiModal.tsx";
import { useCommonStoreZustand, useCommonStore } from './zustand/storeCommon.ts';


interface Props {
    //isOpen: boolean;
}

export default function ClientAppViewWifiModal({ }: Props) {

    const {
        isOpenWifiModal,
        setOpenWifiModal

    } = useCommonStore()

    return (
        <>
            {
            isOpenWifiModal && (
            <ComponentClientAppWifiModal
                setOpen={setOpenWifiModal}
            />
            )
        }
        </>
    )
}
