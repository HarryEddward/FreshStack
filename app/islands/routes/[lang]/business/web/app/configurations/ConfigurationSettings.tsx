import { CogIcon, ImageIcon, LayoutDashboardIcon, UploadIcon } from "npm:lucide-preact@^0.485.0";
import Global_GenericSelect from '@islands/routes/[global]/GenericSelect.tsx';
import { CESTTimeZone, cestTimeZoneOptions } from "./ViewPage.tsx";
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCAPIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';
import { useState, useEffect } from 'preact/hooks';
import { useDebouncedEffect } from '@islands/hooks/useDebounceEffect.tsx';

export interface BusinessConfiguration {
    id: string;
    wifi?: Record<string, any> | null;
    schedule?: Record<string, any> | null;
    timeZone: CESTTimeZone;
    functionsActivated?: Record<string, any> | null;
    apiKey?: Record<string, any> | null;
    affiliate?: boolean;
    maxPhonesDevices?: number;
    displayUsername?: string;
    createdAt: string;
    updatedAt: string;
}

export type BusinessConfigurationPartial = Partial<BusinessConfiguration>;

export const LangBusinessWebAppConfigurationsViewPageIslandConfigurationSettings = () => {
    
    const [pendingUpdate, setPendingUpdate] = useState<Partial<BusinessConfigurationPartial>>({});
    const [businessConfiguration, setBusinessConfiguration] = useState<BusinessConfigurationPartial>();

    const { 
        makeRequest: findBusinessConfiguration, 
        stateRequestSignal: businessConfigurationState 
    } = useRPCAPI<{ data: BusinessConfigurationPartial[] }>(
        '/api/v1/model/BusinessConfiguration/findMany',
        { method: "GET", zenstackQuery: true }
    );

    const { makeRequest: updateBusinessConfiguration } = useRPCAPI('/api/v1/model/BusinessConfiguration/update', { method: "PUT" });


    useRPCAPIRequestList([
        () => findBusinessConfiguration({
            select: {
                id: true,
                timeZone: true,
                displayUsername: true
            }
        })
    ]);

    useEffect(() => {
        const arr = businessConfigurationState.value?.data?.data || [];
        if (arr.length > 0) setBusinessConfiguration(arr[0]);
    }, [businessConfigurationState.value?.data]);

    // Debounce effect: cada vez que cambie pendingUpdate, espera 500ms antes de enviar
    useDebouncedEffect(() => {
        if (!businessConfiguration || Object.keys(pendingUpdate).length === 0) return;
        updateBusinessConfiguration({
            where: { id: businessConfiguration.id },
            data: pendingUpdate
        });
    }, [pendingUpdate, businessConfiguration]);


    const handleInputChange = (field: keyof BusinessConfiguration, value: string) => {
        setBusinessConfiguration(prev => prev ? { ...prev, [field]: value } : prev);
        setPendingUpdate(prev => ({ ...prev, [field]: value }));
    };

    

    return (
        <div className="h-full flex flex-col animate-fade-in overflow-hidden">
            {/* Header Fijo */}
            <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CogIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Ajustes Generales</h2>
                        <p className="text-sm text-gray-600 mt-1">Personaliza tu negocio y dashboard</p>
                    </div>
                </div>
            </div>

            {/* Contenido Scrolleable */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    
                    {/* Configuración General */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <CogIcon className="w-5 h-5 text-blue-600" />
                            Información General
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre del Negocio
                                </label>
                                <input
                                    type="text"
                                    onInput={(e: any) => handleInputChange('displayUsername', e.target.value)}
                                    value={businessConfiguration?.displayUsername || ""}
                                    placeholder="Mi Restaurante"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <div className="flex items-end">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Horario internacional
                                    </label>
                                    <Global_GenericSelect
                                        className="!w-auto"
                                        onChange={(value) => handleInputChange('timeZone', value)}
                                        options={cestTimeZoneOptions}
                                        defaultValue={businessConfiguration?.timeZone || CESTTimeZone.EUROPE_MADRID}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personalización del Dashboard */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <LayoutDashboardIcon className="w-5 h-5 text-blue-600" />
                            Personalización del Dashboard
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Galería de Imágenes */}
                            <div className="space-y-4">
                                <p className="text-gray-600">Sube las imágenes para tu establecimiento</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-square border-2 bg-gray-50 rounded-xl flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer border-dashed border-gray-300 transition-all duration-200 group">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                                            <UploadIcon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-gray-600 text-center text-sm font-medium">Logo</span>
                                        <span className="text-gray-400 text-xs mt-1">Arrastra o haz clic</span>
                                    </div>
                                    
                                    <div className="aspect-square border-2 bg-gray-50 rounded-xl flex flex-col items-center justify-center hover:bg-gray-100 cursor-pointer border-dashed border-gray-300 transition-all duration-200 group">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                                            <ImageIcon className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <span className="text-gray-600 text-center text-sm font-medium">Imagen Principal</span>
                                        <span className="text-gray-400 text-xs mt-1">Arrastra o haz clic</span>
                                    </div>
                                </div>
                                
                                <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold">
                                    Guardar Galería
                                </button>
                            </div>

                            {/* Vista Previa */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center">
                                <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Vista Previa</h4>
                                <p className="text-gray-500 text-center">
                                    Aquí verás cómo se mostrará tu galería una vez subidas las imágenes
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
