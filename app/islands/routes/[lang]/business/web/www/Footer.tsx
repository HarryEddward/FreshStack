export default function LangBusinessWebWWWIslandFooter() {
  return (
    <footer class="bg-white text-gray-700 text-sm border-t border-gray-200 mt-20">
      <div class="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Marca */}
        <div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">CafeBuy Suite</h2>
          <p class="text-gray-600 leading-relaxed">
            Soluciones empresariales para cafeterías, restaurantes y negocios de hostelería. Automatiza, gestiona y escala.
          </p>
        </div>

        {/* Empresa */}
        <div>
          <h3 class="text-base font-semibold text-gray-900 mb-3 uppercase tracking-wide">Empresa</h3>
          <ul class="space-y-2">
            <li><a href="/about" class="hover:text-gray-900 transition">Sobre nosotros</a></li>
            <li><a href="/careers" class="hover:text-gray-900 transition">Trabaja con nosotros</a></li>
            <li><a href="/partners" class="hover:text-gray-900 transition">Partners</a></li>
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h3 class="text-base font-semibold text-gray-900 mb-3 uppercase tracking-wide">Soporte</h3>
          <ul class="space-y-2">
            <li><a href="/help" class="hover:text-gray-900 transition">Centro de ayuda</a></li>
            <li><a href="/contact" class="hover:text-gray-900 transition">Contacto</a></li>
            <li><a href="/status" class="hover:text-gray-900 transition">Estado del sistema</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 class="text-base font-semibold text-gray-900 mb-3 uppercase tracking-wide">Legal</h3>
          <ul class="space-y-2">
            <li><a href="/privacy" class="hover:text-gray-900 transition">Política de privacidad</a></li>
            <li><a href="/terms" class="hover:text-gray-900 transition">Términos y condiciones</a></li>
            <li><a href="/cookies" class="hover:text-gray-900 transition">Política de cookies</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} CafeBuy Technologies SL. Todos los derechos reservados.</p>
          <p>📍 Mallorca, España · <a href="mailto:vicepresidenteventas@kafelia.com" class="underline hover:text-gray-900 transition">vicepresidenteventas@kafelia.com</a></p>
        </div>
      </div>
    </footer>
  );
}
