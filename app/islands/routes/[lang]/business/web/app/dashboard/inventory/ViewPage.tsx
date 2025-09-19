import { IGET_langBusinessWebAppDashboardInventoryPayload } from "@routes/[lang]/business/web/app/dashboard/inventory/_routes/_payload.ts";
import clsx from "npm:clsx@^2.1.1";
import LangBusinessWebWWWComponentNavbar from "@components/routes/lang/business/web/www/Navbar.tsx";
import { useState, useMemo, useEffect } from 'preact/hooks';
import { 
  AlbumIcon,
  ShoppingCartIcon,
  BanknoteIcon,
  WarehouseIcon
} from "npm:lucide-preact@^0.485.0";
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCAPIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';
import LangBusinessWebAppDashboardInventoryIslandProductsSettings from "./ProductsSettings.tsx";
import LangBusinessWebAppDashboardInventoryIslandAjustmentPricesSettings from "./AjustmentPricesSettings.tsx";
import LangBusinessWebAppDashboardInventoryIslandMenuSettings from './MenuSettings.tsx';
import LangBusinessWebAppDashboardInventoryIslandStockSettings from './StockSettings.tsx';


const configurationTabs = [
  {
    key: "products",
    label: "Configuración de Productos",
    icon: ShoppingCartIcon,
    component: LangBusinessWebAppDashboardInventoryIslandProductsSettings,
    disabled: false,
  },
  {
    key: "menus",
    label: "Configuración de Menús",
    icon: AlbumIcon,
    component: LangBusinessWebAppDashboardInventoryIslandMenuSettings,
    disabled: false,
  },
  {
    key: "ajustment_prices",
    label: "Ajustamiento de Precios",
    icon: BanknoteIcon,
    component: LangBusinessWebAppDashboardInventoryIslandAjustmentPricesSettings,
    disabled: false,
  },
  {
    key: "stock",
    label: "Movimientos de Stock",
    icon: WarehouseIcon,
    component: LangBusinessWebAppDashboardInventoryIslandStockSettings,
    disabled: false
  }
];

export default function LangBusinessWebAppDashboardInventoryIslandViewPage({ 
  data 
}: { 
  data: IGET_langBusinessWebAppDashboardInventoryPayload 
}) {
  const [activeTab, setActiveTab] = useState<string>(
    () => configurationTabs.find(tab => !tab.disabled)?.key || ""
  );

  const ActiveComponent = useMemo(() => {
    return configurationTabs.find((tab) => tab.key === activeTab)?.component;
  }, [activeTab]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50">
      <LangBusinessWebWWWComponentNavbar authenticated={true} />
      <main className="flex-1 w-full flex items-center justify-center p-4 lg:p-8 overflow-hidden">
        <div className="w-full max-w-7xl h-full bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col md:flex-row gap-4 lg:gap-6 p-4 overflow-hidden">
          
          <aside className="flex-shrink-0 flex flex-row md:flex-col items-center justify-start p-2 md:p-4 gap-2 md:gap-4 bg-slate-100 rounded-xl md:w-[80px]">
            {configurationTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => !tab.disabled && setActiveTab(tab.key)}
                  title={tab.label}
                  aria-label={tab.label}
                  disabled={tab.disabled}
                  className={clsx(
                    "p-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                    {
                      "bg-blue-600 text-white shadow-md transform scale-105": isActive && !tab.disabled,
                      "text-slate-600 hover:bg-slate-200 hover:text-slate-800 hover:scale-105": !isActive && !tab.disabled,
                      "opacity-40 cursor-not-allowed text-slate-400": tab.disabled,
                    }
                  )}
                >
                  <tab.icon size={24} />
                </button>
              );
            })}
          </aside>

          <section className="flex-1 h-full overflow-hidden rounded-lg bg-gray-50">
            <div className="h-full bg-white rounded-lg border border-gray-100">
              {ActiveComponent ? <ActiveComponent /> : null}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}