import {
  UsersIcon,
  HistoryIcon,
  BriefcaseIcon,
  GlobeIcon,
  ChevronDownIcon,
  ShieldIcon,
  CookieIcon,
  FileTextIcon,
  HelpCircleIcon,
} from 'npm:lucide-preact@^0.485.0';
import { Tooltip } from "@islands/routes/[lang]/business/web/www/Tooltip.tsx";


interface Props {
  authenticated: boolean;
};



export default function LangBusinessWebWWWComponentNavbar({ authenticated=false }: Props) {
  return (
    <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm">
      {/* Left - Home */}
      <a href="/es/business/web/www" aria-label="Inicio">
        <span className="text-5xl font-black text-gray-700 hover:text-black transition">CafeBuy Technologies®</span>
      </a>

      {/* Center Navigation */}
      <div className="flex gap-x-12 items-center">
        {/* About Dropdown */}
        <DropdownMenu label="About" href="/es/business/web/www/about">
          <DropdownItem
            href="/es/business/web/www/team"
            icon={<UsersIcon className="text-blue-600" />}
            title="Team"
            description="Conoce a nuestro equipo de expertos."
          />
          <DropdownItem
            href="/es/business/web/www/history"
            icon={<HistoryIcon className="text-yellow-500" />}
            title="History"
            description="Nuestra evolución y hitos clave."
          />
          <DropdownItem
            href="/es/business/web/www/careers"
            icon={<BriefcaseIcon className="text-green-600" />}
            title="Careers"
            description="Únete a nuestro equipo global."
          />
        </DropdownMenu>

        {/* Partners Dropdown */}
        <DropdownMenu label="Partners" href="/es/business/web/www/partners">
          <DropdownItem
            href="/es/business/web/www/partners/local"
            icon={<BriefcaseIcon className="text-indigo-600" />}
            title="Local Partners"
            description="Colaboradores en tu región."
          />
          <DropdownItem
            href="/es/business/web/www/partners/global"
            icon={<GlobeIcon className="text-purple-600" />}
            title="Global Partners"
            description="Nuestra red internacional."
          />
        </DropdownMenu>

        {/* Legal Dropdown */}
        <DropdownMenu label="Legal" href="/es/business/web/www/legal">
          <DropdownItem
            href="/es/business/web/www/privacy"
            icon={<ShieldIcon className="text-gray-800" />}
            title="Privacy"
            description="Tu privacidad es nuestra prioridad."
          />
          <DropdownItem
            href="/es/business/web/www/cookies"
            icon={<CookieIcon className="text-orange-500" />}
            title="Cookies"
            description="Uso de cookies y opciones."
          />
          <DropdownItem
            href="/es/business/web/www/terms"
            icon={<FileTextIcon className="text-blue-500" />}
            title="Terms"
            description="Condiciones legales de uso."
          />
        </DropdownMenu>

        {/* Pricing Link */}
        {
          !authenticated && (
            <a
              href="/es/business/web/www/pricing"
              className="inline-flex items-center gap-1 text-gray-700 hover:text-black font-medium"
            >
              Pricing
            </a>

          )
        }
        

        {/* Help Link */}
        <a
          href="/es/business/web/www/help"
          className="inline-flex items-center gap-1 text-gray-700 hover:text-black font-medium"
        >
          <HelpCircleIcon className="w-4 h-4" />
          FAQ
        </a>
      </div>

      {/* Right - Auth Links */}
      {
        !authenticated && (
            <div className="flex items-center gap-x-4 pr-2">
              <Tooltip label="Currently not available, contact us for more information">
                <a disabled href="/es/business/web/www" className="text-sm text-gray-700 hover:text-black transition line-through">Registro Privado</a>
              </Tooltip>
              
              <a
                href="/es/business/web/www/login"
                className="text-sm text-white bg-gray-800 hover:bg-black transition px-4 py-1.5 rounded-full"
              >
                Login
              </a>
            </div>
          )
      }
      
    </nav>
  );
}

// Generic Dropdown Menu
function DropdownMenu({ label, href, children }) {
  return (
    <div className="relative group">
      <a
        href={href}
        className="inline-flex items-center gap-1 text-gray-700 hover:text-black font-medium"
      >
        {label}
        <ChevronDownIcon className="w-4 h-4" />
      </a>
      <div className="absolute left-0 top-full mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <ul className="divide-y divide-gray-100">{children}</ul>
      </div>
    </div>
  );
}

// Dropdown Item
function DropdownItem({ href, icon, title, description }) {
  return (
    <li>
      <a
        href={href}
        className="flex items-start gap-3 px-4 py-4 hover:bg-gray-50 transition rounded-xl"
      >
        <div className="mt-1">{icon}</div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </a>
    </li>
  );
}
