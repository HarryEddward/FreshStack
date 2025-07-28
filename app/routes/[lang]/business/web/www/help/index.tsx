import LangBusinessWebWWWComponentNavbar from '@components/routes/lang/business/web/www/Navbar.tsx';
import LangBusinessWebWWWIslandFooter from '@islands/routes/[lang]/business/web/www/Footer.tsx';
import LangBusinessWebWWWIslandViewHelp from '@islands/routes/[lang]/business/web/www/help/ViewHelp.tsx';

export default function LangBusinessWebWWWHelp() {
  return (
    <>
      <div className="w-full bg-white">
        <LangBusinessWebWWWComponentNavbar />
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Centro de Ayuda
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas a las preguntas más comunes sobre CafeBuy Suite. Si necesitas más ayuda, nuestro equipo está listo para apoyarte.
            </p>
          </div>
          <LangBusinessWebWWWIslandViewHelp />
        </div>
      </div>
      <LangBusinessWebWWWIslandFooter />
    </>
  );
}