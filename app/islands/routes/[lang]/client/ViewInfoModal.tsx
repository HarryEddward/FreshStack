import { useState } from 'preact/hooks';
import ComponentClientAppInfoModal from './InfoModal.tsx';
import { ComponentChildren } from 'preact/src/index.d.ts';


interface Props {
    isOpen: boolean;
    msg: string | ComponentChildren;
    title: string;
}

export default function ClientAppViewInfoModal({ isOpen, msg, title }: Props) {
    const [openNotAcceptedTemsModal, setOpenNotAcceptedTemsModal] = useState<boolean>(isOpen);
  
  
    return (
        <>
            {
            openNotAcceptedTemsModal && (
            <ComponentClientAppInfoModal
                open={openNotAcceptedTemsModal}
                setOpen={setOpenNotAcceptedTemsModal}
                msg={msg}
                title={title}
            />
            )
        }
        </>
    )
}
