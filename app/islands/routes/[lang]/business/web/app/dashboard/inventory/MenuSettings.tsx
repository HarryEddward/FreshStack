import { AlbumIcon } from "npm:lucide-preact@^0.485.0";




export default function LangBusinessWebAppDashboardInventoryIslandMenuSettings() {
    return (
        <div className="h-full flex flex-col animate-fade-in overflow-hidden">
            {/* Header Fijo */}
            <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlbumIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                <h2 className="text-2xl font-bold text-gray-800">Menús</h2>
                <p className="text-sm text-gray-600 mt-1">Gestiona tus menús y grupos de menús.</p>
                </div>
            </div>
            </div>
            
            {/* Contenido Scrolleable */}
            <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <AlbumIcon size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Configuración de Menús</h3>
                <p className="text-gray-500 max-w-md">
                Esta sección estará disponible próximamente para gestionar tus menús.
                </p>
            </div>
            </div>
        </div>
    );
}