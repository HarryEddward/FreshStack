import {
  LayoutDashboardIcon,
  BarChartIcon,
  SettingsIcon,
  UsersIcon,
  HandshakeIcon,
} from "npm:lucide-preact@^0.485.0";
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import { JSX } from "preact";
import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import { Tooltip } from "../www/Tooltip.tsx";

interface ICards {
  title: string;
  description: string;
  icon: JSX.Element;
  redirect: () => void; // ← ahora es función sin parámetros
}

export default function LangBusinessWebAppIslandViewPage({
  actualLang,
}: {
  actualLang: string;
}) {
  const handleRedirect = (route: string) => {
    globalThis.window.location.href = `/${actualLang}${route}`;
  };

  const cards: ICards[] = [
    {
      title: "Panel de Control",
      description: "Gestiona tu app desde una única interfaz.",
      icon: <LayoutDashboardIcon className="text-sky-500 w-10 h-10" />,
      redirect: () => handleRedirect("/business/web/app/dashboard"),
    },
    {
      title: "Estadísticas",
      description: "Visualiza métricas clave en tiempo real.",
      icon: <BarChartIcon className="text-green-600 w-10 h-10" />,
      redirect: () => handleRedirect("/business/web/app/analitics"),
    },
    {
      title: "Configuraciones",
      description: "Personaliza opciones para tu entorno.",
      icon: <SettingsIcon className="text-yellow-500 w-10 h-10" />,
      redirect: () => handleRedirect("/business/web/app/configurations"),
    },
    {
      title: "Usuarios",
      description: "Administra accesos y permisos fácilmente.",
      icon: <UsersIcon className="text-purple-600 w-10 h-10" />,
      redirect: () => handleRedirect("/business/web/app/users"),
    }
  ];

  return (
    <div className={"w-full h-full overflow-x-hidden"}>
      <LangBusinessWebWWWComponentNavbar authenticated={true}/>
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center p-4 bg-gray-50 border-2">
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8 rounded-xl py-8">
          {cards.map((card) => (
            <button
              key={card.title}
              onClick={card.redirect}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start gap-4 border hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 select-none"
            >
              <div className="bg-gray-100 rounded-full p-2 shadow-sm">
                {card.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{card.title}</h2>
              <p className="text-gray-600 text-lg text-left">{card.description}</p>
            </button>
          ))}
        </div>
        
          <button
          onClick={() => handleRedirect("/business/web/app/multibusiness")}
          className="w-full p-4 flex bg-gray-100 max-w-6xl rounded-xl shadow-sm hover:shadow-md bg-opacity-30 ">
            <Tooltip
              className="w-full"
              label="No disponible"
            >
              <span className="opacity-30">Acceso a gestión multiempresa</span>
            </Tooltip>
          </button>
      </div>
      <LangBusinessWebWWWIslandFooter />
    </div>
  );
}
