import { BanknoteIcon } from "npm:lucide-preact@^0.485.0";


export default function LangBusinessWebAppDashboardInventoryIslandAjustmentPricesSettings() {
    return (
        <div className="h-full flex flex-col animate-fade-in overflow-hidden">
            {/* Header Fijo */}
            <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BanknoteIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                <h2 className="text-2xl font-bold text-gray-800">Ajustamiento de Precios</h2>
                <p className="text-sm text-gray-600 mt-1">Gestiona por grupos de prodcutos o menus la subida/bajada de precios generalizados.</p>
                </div>
            </div>
            </div>
            
            {/* Contenido Scrolleable */}
            <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <BanknoteIcon size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Configuración de Ajustamiento de Precios</h3>
                <p className="text-gray-500 max-w-md">
                Esta sección estará disponible próximamente para gestionar tus menús.
                </p>
            </div>
            </div>
        </div>
        );
}
