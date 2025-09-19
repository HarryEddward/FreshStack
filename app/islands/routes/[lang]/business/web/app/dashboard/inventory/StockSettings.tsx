import { AlbumIcon, WarehouseIcon } from "npm:lucide-preact@^0.485.0";




export default function LangBusinessWebAppDashboardInventoryIslandStockSettings() {
    return (
        <div className="h-full flex flex-col animate-fade-in overflow-hidden">
            {/* Header Fijo */}
            <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <WarehouseIcon className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Movimientos Stock</h2>
                    <p className="text-sm text-gray-600 mt-1">Investiga tus movimientos de tu stock de forma detallada y predecible.</p>
                </div>
            </div>
            </div>
            
            {/* Contenido Scrolleable */}
            <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <WarehouseIcon size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Movimientos de Stock</h3>
                <p className="text-gray-500 max-w-md">
                Esta sección estará disponible próximamente para consultar todo tu stock.
                </p>
            </div>
            </div>
        </div>
    );
}