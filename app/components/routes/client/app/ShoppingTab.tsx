// components/router/client/app/ShoppingTab.tsx
import clsx from 'npm:clsx';
import { ITranslationClientAppCommonShoppingTab } from '@routes/[lang]/client/app/private/services/products/index.tsx';

export interface Props {
  translation: ITranslationClientAppCommonShoppingTab;
  activeTab: string;
  className?: string;
};


const listTabs: Record<string, string>[] = [
  { "products": "products" },
  { "payment_qr": "payment_qr" },
  /*{ "payment": "payment" },
  { "transaction": "transaction" }*/
];

export default function ComponentClientAppShoppingTab({ activeTab, className, translation }: Props) {

  
  return (
    <div className="w-full flex flex-row justify-around gap-x-3 mt-20 p-2">
      {Object.entries(translation).map(([key, value]) => {
        const tabKey = Object.keys(key)[0];

        return (
          <div
            key={value}
            className={clsx(
              "w-full flex border-2 rounded-lg justify-center py-4 border-gray-300",
              activeTab === key  && "font-medium  bg-gray-200/30 text-gray-700 border-gray-300 opacity-85",
              "opacity-45",
              className
            )}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}
