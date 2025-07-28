import LangClientAppPaymentQrIslandTotalPriceOrder from '@islands/routes/[lang]/client/app/payment_qr/TotalPriceOrder.tsx';
import QrCode from '@islands/routes/[global]/QrSvg.tsx';
import { generateRandomWords } from '../../../../../../utils/generateWords.ts';

export default function LangClientAppPaymentQrIslandQrOrder() {
  return (
    <>
        {/* QR centrado verticalmente */}
        <div className="flex-grow flex flex-col items-center justify-center gap-y-8">
            <LangClientAppPaymentQrIslandTotalPriceOrder/>
            <QrCode
            size={290}
            text={JSON.stringify({
                order_id: crypto.randomUUID()
            })}
            />
        </div>
    </>
  );
}
