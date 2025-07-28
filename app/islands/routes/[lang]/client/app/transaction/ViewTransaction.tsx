import React from 'react'
import ClientAppTransactionOrderBarcode from "@islands/routes/[lang]/client/app/transaction/OrderBarcode.tsx";
import { useState } from 'preact/hooks';
import { CheckCircleIcon, XCircleIcon } from 'npm:lucide-preact';
import { nanoid } from 'npm:nanoid';
import ClientAppProductsNextButton from "@islands/routes/[lang]/client/app/products/NextButton.tsx";
import ClientAppPaymentNextButton from "@islands/routes/[lang]/client/app/payment/NextButton.tsx";
import ClientAppPaymentPaymentButton from '@islands/routes/[lang]/client/app/transaction/PaymentButton.tsx';

interface Props {
    actualLang?: string;
};

export default function ClientAppTransactionViewTransaction({ actualLang }: Props) {

    const [transactionSucceded, setTransactionSucceded] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full min-h-[65vh] justify-center items-center border-2 rounded-lg gap-y-3">
        {
            transactionSucceded ?
            <>
                <div className={"flex flex-row items-center justify-center gap-x-2 "}>
                    <CheckCircleIcon size={70} color="#22c55e"/>
                    <h1 className={"text-5xl font-bold text-green-500 font-dancing"}>Transacción exitosa</h1>
                </div>
                <ClientAppTransactionOrderBarcode valueBarcode={nanoid()}/>
            </> : 
            <>
                <div className={"flex flex-row items-center justify-center gap-x-2"}>
                    <XCircleIcon size={70} color="#ef4444"/>
                    <h1 className={"text-5xl font-bold text-red-500 font-dancing"}>Transacción fallida</h1>
                </div>
                <ClientAppPaymentPaymentButton actualLang={actualLang}/>
            </>
        
        }
        <button onClick={() => setTransactionSucceded(!transactionSucceded)} className={`w-full text-white ${transactionSucceded ? "bg-green-200" : "bg-red-200"}`}>
            {transactionSucceded ? "Transacción exitosa" : "Transacción fallida"}
        </button>
    </div>
  )
}
