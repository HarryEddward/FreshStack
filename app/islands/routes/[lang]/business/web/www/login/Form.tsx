import { MailIcon, KeyIcon, LockIcon } from 'npm:lucide-preact@^0.485.0';

export default function LangBusinessWebWWWLoginIslandForm() {
  return (
    <div className="flex flex-row justify-center my-14 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-green-600"></div>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Inicia Sesión
            </h1>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Accede a CafeBuy Suite para gestionar tu negocio con facilidad.
            </p>
          </div>
          <form className="flex flex-col gap-y-6">
            <div className="relative">
              <MailIcon className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-200 rounded-lg p-3 pl-10 w-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow duration-200 shadow-sm hover:shadow-md"
                required
              />
            </div>
            <div className="relative">
              <KeyIcon className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Licencia"
                className="border border-gray-200 rounded-lg p-3 pl-10 w-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow duration-200 shadow-sm hover:shadow-md"
                required
              />
            </div>
            <div className="relative">
              <LockIcon className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                placeholder="Contraseña"
                className="border border-gray-200 rounded-lg p-3 pl-10 w-full text-sm text-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow duration-200 shadow-sm hover:shadow-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-md"
            >
              Iniciar Sesión
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-6 opacity-45 line-through">
            ¿No tienes una cuenta?{' '}
            <a href="/es/business/web/www" className="text-blue-600 hover:underline">
              Registro Privado
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}