import {
  LayoutDashboardIcon,
  BarChartIcon,
  SettingsIcon,
  UsersIcon,
} from "npm:lucide-preact@^0.485.0";
import LangBusinessWebWWWIslandFooter from "@islands/routes/[lang]/business/web/www/Footer.tsx";
import { JSX } from "preact";
import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';


export default function LangBusinessWebAppConfigurationsIslandViewPage({
  actualLang,
}: {
  actualLang: string;
}) {
  

  return (
    <div className={"w-full h-full overflow-x-hidden"}>
      <LangBusinessWebWWWComponentNavbar authenticated={true}/>
      <div className="w-full min-h-[calc(100vh-4rem)] flex justify-center items-center p-4 bg-gray-50 border-2">
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 rounded-xl shadow-lg p-4">
          Configurations
        </div>
      </div>
      <LangBusinessWebWWWIslandFooter />
    </div>
  );
}
