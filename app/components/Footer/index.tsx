import ClientAppTransactionOrderBarcode from "@islands/routes/[lang]/client/app/transaction/OrderBarcode.tsx";
import FooterExtended from "./Extended/index.tsx";
import FooterMobile from "./Mobile/index.tsx";
import clsx from 'npm:clsx';


interface Props {
  className?: string;
}

export default function Footer({ className }: Props) {
  return (
    <div className={clsx(className, "flex flex-col w-full p-6 border-t-2 border-[#55bf7c] items-center text-white bg-[#86efac] -z-30")}>
      <div className="block md:hidden w-full">
        <FooterMobile />
      </div>

      {/* Componente visible en tablet/PC (md en adelante) */}
      <div className="hidden md:block w-full">
        <FooterExtended />
      </div>

      <ClientAppTransactionOrderBarcode valueBarcode="restart" className="mt-5 "/>
      
    </div>
  );
}
