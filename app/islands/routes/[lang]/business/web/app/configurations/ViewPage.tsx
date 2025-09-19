// routes/[lang]/business/web/app/configurations/index.tsx

import { useState, useMemo, useEffect, useRef, useCallback } from 'preact/hooks';
import { JSX } from "preact";
import clsx from "clsx";
import {
  LayoutDashboardIcon,
  SettingsIcon,
  UsersIcon,
  CctvIcon,
  LanguagesIcon,
  CogIcon,
  FileSlidersIcon,
  PlusIcon,
  LockIcon,
  KeyIcon,
  CreditCardIcon,
  FilesIcon,
  FileTextIcon,
  ImageIcon,
  FileArchiveIcon,
  DownloadIcon,
  Trash2Icon,
  SearchIcon,
  FolderArchiveIcon,
  Loader2Icon,
  CheckCircleIcon,
  AlertCircleIcon,
  UploadIcon,
} from "npm:lucide-preact@^0.485.0";
import prettyBytes from 'npm:pretty-bytes';

// Importaciones de componentes propios
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import LangBusinessWebWWWComponentNavbar from "@components/routes/lang/business/web/www/Navbar.tsx";
import Global_GenericSelect from '@islands/routes/[global]/GenericSelect.tsx';
import { resolveMimeType } from "@utils/frontend/mimeType.ts";
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCPAIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';
import { LangBusinessWebAppConfigurationsViewPageIslandFilesSettings } from "./FilesSettings.tsx";
import { LangBusinessWebAppConfigurationsViewPageIslandConfigurationSettings } from "./ConfigurationSettings.tsx";
import { LangBusinessWebAppConfigurationsViewPageIslandKeysSettings } from "./KeysSettings.tsx";

export enum CESTTimeZone {
  EUROPE_AMSTERDAM = "EUROPE_AMSTERDAM",
  EUROPE_ANDORRA = "EUROPE_ANDORRA",
  EUROPE_BELGRADE = "EUROPE_BELGRADE",
  EUROPE_BERLIN = "EUROPE_BERLIN",
  EUROPE_BRATISLAVA = "EUROPE_BRATISLAVA",
  EUROPE_BRUSSELS = "EUROPE_BRUSSELS",
  EUROPE_BUDAPEST = "EUROPE_BUDAPEST",
  EUROPE_COPENHAGEN = "EUROPE_COPENHAGEN",
  EUROPE_GIBRALTAR = "EUROPE_GIBRALTAR",
  EUROPE_LISBON = "EUROPE_LISBON",
  EUROPE_LJUBLJANA = "EUROPE_LJUBLJANA",
  EUROPE_LUXEMBOURG = "EUROPE_LUXEMBOURG",
  EUROPE_MADRID = "EUROPE_MADRID",
  EUROPE_MALTA = "EUROPE_MALTA",
  EUROPE_MONACO = "EUROPE_MONACO",
  EUROPE_OSLO = "EUROPE_OSLO",
  EUROPE_PARIS = "EUROPE_PARIS",
  EUROPE_PODGORICA = "EUROPE_PODGORICA",
  EUROPE_PRAGUE = "EUROPE_PRAGUE",
  EUROPE_ROME = "EUROPE_ROME",
  EUROPE_SAN_MARINO = "EUROPE_SAN_MARINO",
  EUROPE_SARAJEVO = "EUROPE_SARAJEVO",
  EUROPE_SKOPJE = "EUROPE_SKOPJE",
  EUROPE_STOCKHOLM = "EUROPE_STOCKHOLM",
  EUROPE_TIRANE = "EUROPE_TIRANE",
  EUROPE_VADUZ = "EUROPE_VADUZ",
  EUROPE_VIENNA = "EUROPE_VIENNA",
  EUROPE_WARSAW = "EUROPE_WARSAW",
  EUROPE_ZAGREB = "EUROPE_ZAGREB",
  EUROPE_ZURICH = "EUROPE_ZURICH",
  AFRICA_CEUTA = "AFRICA_CEUTA",
  AFRICA_TUNIS = "AFRICA_TUNIS",
  ARCTIC_LONGYEARBYEN = "ARCTIC_LONGYEARBYEN",
}

export const cestTimeZoneOptions = [
  { label: "EUROPE_AMSTERDAM", value: CESTTimeZone.EUROPE_AMSTERDAM },
  { label: "EUROPE_ANDORRA", value: CESTTimeZone.EUROPE_ANDORRA },
  { label: "EUROPE_BELGRADE", value: CESTTimeZone.EUROPE_BELGRADE },
  { label: "EUROPE_BERLIN", value: CESTTimeZone.EUROPE_BERLIN },
  { label: "EUROPE_BRATISLAVA", value: CESTTimeZone.EUROPE_BRATISLAVA },
  { label: "EUROPE_BRUSSELS", value: CESTTimeZone.EUROPE_BRUSSELS },
  { label: "EUROPE_BUDAPEST", value: CESTTimeZone.EUROPE_BUDAPEST },
  { label: "EUROPE_COPENHAGEN", value: CESTTimeZone.EUROPE_COPENHAGEN },
  { label: "EUROPE_GIBRALTAR", value: CESTTimeZone.EUROPE_GIBRALTAR },
  { label: "EUROPE_LISBON", value: CESTTimeZone.EUROPE_LISBON },
  { label: "EUROPE_LJUBLJANA", value: CESTTimeZone.EUROPE_LJUBLJANA },
  { label: "EUROPE_LUXEMBOURG", value: CESTTimeZone.EUROPE_LUXEMBOURG },
  { label: "EUROPE_MADRID", value: CESTTimeZone.EUROPE_MADRID },
  { label: "EUROPE_MALTA", value: CESTTimeZone.EUROPE_MALTA },
  { label: "EUROPE_MONACO", value: CESTTimeZone.EUROPE_MONACO },
  { label: "EUROPE_OSLO", value: CESTTimeZone.EUROPE_OSLO },
  { label: "EUROPE_PARIS", value: CESTTimeZone.EUROPE_PARIS },
  { label: "EUROPE_PODGORICA", value: CESTTimeZone.EUROPE_PODGORICA },
  { label: "EUROPE_PRAGUE", value: CESTTimeZone.EUROPE_PRAGUE },
  { label: "EUROPE_ROME", value: CESTTimeZone.EUROPE_ROME },
  { label: "EUROPE_SAN_MARINO", value: CESTTimeZone.EUROPE_SAN_MARINO },
  { label: "EUROPE_SARAJEVO", value: CESTTimeZone.EUROPE_SARAJEVO },
  { label: "EUROPE_SKOPJE", value: CESTTimeZone.EUROPE_SKOPJE },
  { label: "EUROPE_STOCKHOLM", value: CESTTimeZone.EUROPE_STOCKHOLM },
  { label: "EUROPE_TIRANE", value: CESTTimeZone.EUROPE_TIRANE },
  { label: "EUROPE_VADUZ", value: CESTTimeZone.EUROPE_VADUZ },
  { label: "EUROPE_VIENNA", value: CESTTimeZone.EUROPE_VIENNA },
  { label: "EUROPE_WARSAW", value: CESTTimeZone.EUROPE_WARSAW },
  { label: "EUROPE_ZAGREB", value: CESTTimeZone.EUROPE_ZAGREB },
  { label: "EUROPE_ZURICH", value: CESTTimeZone.EUROPE_ZURICH },
  { label: "AFRICA_CEUTA", value: CESTTimeZone.AFRICA_CEUTA },
  { label: "AFRICA_TUNIS", value: CESTTimeZone.AFRICA_TUNIS },
  { label: "ARCTIC_LONGYEARBYEN", value: CESTTimeZone.ARCTIC_LONGYEARBYEN },
];


// --- Componente de Archivos Mejorado ---

const mockFiles = [
  { id: 1, name: "factura-julio-2024.pdf", type: "pdf", size: "1.2 MB", uploadDate: "2024-07-28" },
  { id: 2, name: "logo-empresa-final.png", type: "image", size: "345 KB", uploadDate: "2024-07-25" },
  { id: 3, name: "contrato-proveedor.docx", type: "doc", size: "87 KB", uploadDate: "2024-07-22" },
  { id: 4, name: "fotos-evento.zip", type: "zip", size: "25.6 MB", uploadDate: "2024-07-20" },
  { id: 5, name: "reporte-ventas-q2.pdf", type: "pdf", size: "5.8 MB", uploadDate: "2024-07-15" },
  { id: 6, name: "banner-promocional.jpg", type: "image", size: "1.5 MB", uploadDate: "2024-07-14" },
];


// La interfaz del modelo de datos que viene de tu API de ZenStack
interface BusinessFile {
  id: string;
  name: string;
  path: string;
  mimeType: 'WEBP' | 'PDF'; // Tipos de Mime que tu API soporta
  hash: string;
  sizeBytes: number;
  businessId: string;
  createdAt: string;
  updatedAt: string;
}


// Componente principal de la sección de Archivos

const PlaceholderSettings = ({ title, icon: Icon, description }: { title: string; icon: any; description?: string }) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-fade-in">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <Icon size={40} className="text-gray-300" />
    </div>
    <h2 className="text-2xl font-bold text-gray-700 mb-3">{title}</h2>
    <p className="text-gray-500 max-w-md">
      {description || "Esta sección estará disponible próximamente. Estamos trabajando para ofrecerte las mejores funcionalidades."}
    </p>
  </div>
);

// --- Estructura de datos actualizada ---
const configurationTabs = [
  {
    key: "api-keys",
    label: "Claves API",
    icon: KeyIcon,
    component: LangBusinessWebAppConfigurationsViewPageIslandKeysSettings,
    disabled: false,
  },
  {
    key: "general",
    label: "Ajustes Generales",
    icon: CogIcon,
    component: LangBusinessWebAppConfigurationsViewPageIslandConfigurationSettings,
    disabled: false,
  },
  {
    key: "files",
    label: "Archivos",
    icon: FilesIcon,
    component: LangBusinessWebAppConfigurationsViewPageIslandFilesSettings,
    disabled: false,
  },
  {
    key: "security",
    label: "Seguridad",
    icon: LockIcon,
    component: () => <PlaceholderSettings title="Seguridad" icon={LockIcon} description="Configura la seguridad y autenticación de tu cuenta" />,
    disabled: true,
  },
  {
    key: "languages",
    label: "Idiomas",
    icon: LanguagesIcon,
    component: () => <PlaceholderSettings title="Idiomas" icon={LanguagesIcon} description="Personaliza el idioma de tu interfaz" />,
    disabled: true,
  },
  {
    key: "integrations",
    label: "Integraciones",
    icon: FileSlidersIcon,
    component: () => <PlaceholderSettings title="Integraciones" icon={FileSlidersIcon} description="Conecta con herramientas externas y APIs" />,
    disabled: true,
  },
];

export default function LangBusinessWebAppConfigurationsIslandViewPage({
  actualLang,
}: {
  actualLang: string;
}) {
  const [activeTab, setActiveTab] = useState<string>(
    () => configurationTabs.find(tab => !tab.disabled)?.key || ""
  );

  const ActiveComponent = useMemo(() => {
    return configurationTabs.find((tab) => tab.key === activeTab)?.component;
  }, [activeTab]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50 overflow-hidden">
      <LangBusinessWebWWWComponentNavbar authenticated={true} />
      <main className="flex-1 w-full flex items-center justify-center p-4 lg:p-8 overflow-hidden">
        <div className="w-full max-w-7xl h-full bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col md:flex-row gap-4 lg:gap-6 p-4 overflow-hidden">
          
          {/* Barra Lateral de Navegación - Fija */}
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
                    "p-3 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 relative",
                    {
                      "bg-blue-600 text-white shadow-md transform scale-105": isActive && !tab.disabled,
                      "text-slate-600 hover:bg-slate-200 hover:text-slate-800 hover:scale-105": !isActive && !tab.disabled,
                      "opacity-40 cursor-not-allowed text-slate-400": tab.disabled,
                    }
                  )}
                >
                  <tab.icon size={24} />
                  {tab.disabled && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Área de Contenido Principal */}
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


