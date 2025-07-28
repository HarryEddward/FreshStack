import { useEffect, useState } from "preact/hooks";
import clsx from 'npm:clsx';

interface ITranslation {

};

export interface Props {
  translation?: ITranslation;
  activeTab: string;
  className?: string;
};

const listTabs: Record<string, string>[] = [
  { "products": "products" },
  { "payment": "payment" },
  { "transaction": "transaction" }
];

export default function ClientAppShoppingTab({ activeTab, className, translation }: Props) {
  //const raw = Deno.readTextFile(`./translations/${lang}/client/app/common.json`);
  


  //if (!translation) return null; // o un loader/spinner si querés

  return (
    <div className="w-full flex flex-row justify-around gap-x-3 mt-20 p-2">
      {translation.map((tabObj) => {
        const tabKey = Object.keys(tabObj)[0];

        return (
          <div
            key={tabKey}
            className={clsx(
              "w-full flex border-2 rounded-lg justify-center py-4",
              activeTab === tabKey && "border-green-300",
              className
            )}
          >
            {tabKey}
          </div>
        );
      })}
    </div>
  );
}
