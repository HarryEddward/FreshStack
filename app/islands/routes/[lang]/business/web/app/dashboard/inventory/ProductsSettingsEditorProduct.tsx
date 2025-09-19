
import Global_FilePreviewInput from '@islands/routes/[global]/FilePreviewInput.tsx';
import { XIcon, ShoppingCartIcon } from "npm:lucide-preact@^0.485.0";
import { useProductSettingsStore } from '@islands/routes/[lang]/business/web/app/dashboard/inventory/[stores]/storeProductSettings.ts';



interface Props {
};



export default function LangBusinessWebAppDashboardInventoryIslandProductsSettingEditorProduct({

}: Props) {

    const {
        setOpenModalSettingsEditorProduct
    } = useProductSettingsStore();

    

    return (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-40 z-[99999999999999999999999999999999999999999999999999999999]">
            <div className={"flex w-full h-full justify-center items-center"}>
                <div className="flex flex-col gap-y-4 w-[80%] h-[80%} bg-white rounded-xl p-4">

                    {/* Header Fijo */}
                    <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-lg">
                        <div className="flex items-center gap-4">
                            <div className={"w-full flex flex-row justify-between"}>
                                <div>
                                <h2 className="text-2xl font-bold text-gray-800">Actualizar Producto</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Actualiza tu producto ante errores.
                                </p>
                                </div>
                                <button
                                onClick={setOpenModalSettingsEditorProduct}
                                className={"p-4 rounded-full bg-bg-transparent hover:bg-gray-100 transition-colors"}>
                                    <XIcon/>
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
