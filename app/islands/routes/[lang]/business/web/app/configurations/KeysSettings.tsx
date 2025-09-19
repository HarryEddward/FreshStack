import { useEffect, useState } from 'preact/hooks';
import { CreditCardIcon } from "npm:lucide-preact@^0.485.0";
import useRPCAPI from '@islands/hooks/useRPCAPI.ts';
import useRPCAPIRequestList from '@islands/hooks/useRPCAPIRequestList.ts';
import { useDebouncedEffect } from '@islands/hooks/useDebounceEffect.tsx';

// Enum que representa los proveedores de pago
export enum ProviderPaymentGateway {
  STRIPE = 'STRIPE',
  SUMUP = 'SUMUP',
}

// Interfaz que representa un BusinessPaymentGateway
export interface BusinessPaymentGateway {
  id: string;
  provider: ProviderPaymentGateway;
  public_key: string;
  secret_key: string;
  businessId: string;
}

export const LangBusinessWebAppConfigurationsViewPageIslandKeysSettings = () => {
    const [paymentGateways, setPaymentGateways] = useState<BusinessPaymentGateway | null>(null);
    const [pendingUpdate, setPendingUpdate] = useState<Partial<BusinessPaymentGateway>>({});

    const { 
        makeRequest: findBusinessPaymentGateway, 
        stateRequestSignal: businessPaymentGatewayState 
    } = useRPCAPI<{ data: BusinessPaymentGateway[] }>('/api/v1/model/BusinessPaymentGateway/findMany', { 
        method: "GET", 
        zenstackQuery: true 
    });

    const { makeRequest: updatePaymentGateway } = useRPCAPI('/api/v1/model/BusinessPaymentGateway/update', { method: "PUT" });

    useRPCAPIRequestList([
        () => findBusinessPaymentGateway()
    ]);

    useEffect(() => {
        const data: BusinessPaymentGateway[] = businessPaymentGatewayState.value.data?.data || [];
        if (data.length > 0) setPaymentGateways(data[0]);
    }, [businessPaymentGatewayState.value.data]);

    // Debounce effect: cada vez que cambie pendingUpdate, espera 500ms antes de enviar
    useDebouncedEffect(() => {
        if (!paymentGateways || Object.keys(pendingUpdate).length === 0) return;
        updatePaymentGateway({
            where: { id: paymentGateways.id },
            data: pendingUpdate
        });
    }, [pendingUpdate, paymentGateways]);


    const handleInputChange = (field: keyof BusinessPaymentGateway, value: string) => {
        setPaymentGateways(prev => prev ? { ...prev, [field]: value } : prev);
        setPendingUpdate(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="h-full flex flex-col animate-fade-in overflow-hidden">
            <div className="flex-shrink-0 p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCardIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Pasarela de Pagos</h2>
                        <p className="text-sm text-gray-600 mt-1">Configura tu integración de pagos con Stripe</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Claves de API</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Clave Secreta</label>
                                        <input
                                            type="password"
                                            placeholder="sk_test_..."
                                            value={paymentGateways ? paymentGateways.secret_key : ""}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                            onInput={(e: any) => handleInputChange('secret_key', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Clave Pública</label>
                                        <input
                                            type="text"
                                            placeholder="pk_test_..."
                                            value={paymentGateways ? paymentGateways.public_key : ""}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                            onInput={(e: any) => handleInputChange('public_key', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center">
                                <CreditCardIcon className="w-16 h-16 text-gray-300 mb-4" />
                                <h4 className="text-lg font-medium text-gray-700 mb-2">Estado de Conexión</h4>
                                <p className="text-gray-500 text-center">
                                    Una vez configuradas las claves, aquí verás el estado de tu conexión con Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
