import { MailIcon, PhoneIcon, UsersIcon } from 'npm:lucide-preact@^0.485.0';
import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWIslandFooter from '@islands/routes/[lang]/business/web/www/Footer.tsx';
import { config } from '@config/frontend/index.ts';

export default function LangBusinessWebWWWTeam() {
  const { businessTeams } = config;

  return (
    <>
      <div className="w-full bg-white">
        <LangBusinessWebWWWComponentNavbar />
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight ">
              Conoce a Nuestro Equipo
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              En CafeBuy, nuestro equipo de profesionales apasionados trabaja incansablemente para ofrecer soluciones innovadoras y personalizadas que impulsan el éxito de tu negocio.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessTeams.map((team) => (
              <div
                key={team.name}
                className="relative bg-white border border-gray-200 rounded-md shadow-lg p-8 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/*<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-t-2xl"></div>*/}
                <div className="flex items-center gap-3 mb-4">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                  <h6 className="text-2xl font-bold text-gray-900 capitalize ">
                    {team.role}
                  </h6>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {team.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MailIcon className="w-5 h-5 text-blue-600" />
                    <a
                      href={`mailto:${team.email}`}
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                    >
                      {team.email}
                    </a>
                  </div>
                  {team.phone && (
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-green-600" />
                      <a
                        href={`tel:${team.phone}`}
                        className="text-sm font-medium text-gray-700 hover:text-green-600 transition"
                      >
                        {team.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LangBusinessWebWWWIslandFooter />
    </>
  );
}