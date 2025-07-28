import LangClientAppIslandButtonAutomatizedOrder from "@islands/routes/[lang]/client/app/[step_before]/ButtonAutomatizedOrder.tsx";
import LangClientAppIslandButtonManualOrder from "@islands/routes/[lang]/client/app/[step_before]/ButtonManualOrder.tsx";
import ClientApp_GlobalIslandLangButtonCSR from "@islands/routes/[lang]/client/app/[_global]/LangButtonCSR.tsx";
import { useLanguageStore } from "@islands/routes/[lang]/client/app/[_global]/zustand/storeLang.ts";
import LangClientAppIslandButtonMenu from "@islands/routes/[lang]/client/app/[step_before]/ButtonMenu.tsx";
import LangClientApp_globalIslandBackgroundConnectionVerify from "@islands/routes/[lang]/client/app/[_global]/BackgroundConnectionVerify.tsx";
import LangClientApp_globalHooksWebsocketIslandWebsocketConnect from "@islands/routes/[lang]/client/app/[_global]/websocket/WebsocketConnect.tsx";
import LangClientAppIslandButtonWifi from "@islands/routes/[lang]/client/app/[step_before]/ButtonWifi.tsx";
import useRPCWebsockets from "@islands/hooks/useRPCWebsockets.ts";
import { useWebSocketStore, useWebSocketStoreZustand } from "@islands/providers/stores/websocketStore.ts";
import { useEffect } from 'react';
import useRPCInitialRequests from "@islands/hooks/useRPCWebsocketsRequestsList.ts";
import useRPCWebsocketsRequestsList from '@islands/hooks/useRPCWebsocketsRequestsList.ts';
import { en } from "npm:@faker-js/faker@8.4.1";
import ClientAppViewMenuModal from '../../ViewMenuModal.tsx';
import ClientAppViewWifiModal from "../../ViewWifiModal.tsx";
import { IGET_langClient_step_beforePayload } from "@routes/[lang]/client/[step_before]/_routes/_payload.ts";
import { isNowBetween, isNowBetweenISOHours } from "@utils/routing/dateISO.ts";
import { useCommonStore, useCommonStoreZustand } from "../../zustand/storeCommon.ts";
import FooterAdminOptions from "@components/routes/client/app/FooterAdminOptions.tsx";
import AppListenerCap from "../AppListenerCap.tsx";


const translationsResult = (await import('@islands/routes/[lang]/client/app/[_global]/translations.json', { with: { type: "json" } })).default;

interface ITranslations {
    title: string,
    order_buttons: {
        automatize: string,
        manual: string
    },
    extrafunctionalities_buttons: {
        show_menu: string;
    }
};

export default function ClientAppStep_BeforeIslandViewStepBefore({ data }: { data: IGET_langClient_step_beforePayload }) {
    const { lang } = useLanguageStore();
    const translations = translationsResult[lang] as ITranslations;

    const {
        setWifiConfiguration,
        setScheduleMorning,
        setScheduleAfternoon,
        setFunctionsActivated,
        setDisplayUsername,
        isOpenWifiModal
    } = useCommonStore();

    useEffect(() => {

        console.log(JSON.stringify(data.businessConfiguration));

        const businessConfiguration = data.businessConfiguration?.business.configuration;

        const scheduleMorningOpen = String(businessConfiguration?.schedule?.morning?.open);
        const scheduleMorningClose = String(businessConfiguration?.schedule?.morning?.close);

        const scheduleAfternoonOpen = String(businessConfiguration?.schedule?.afternoon?.open);
        const scheduleAfternoonClose = String(businessConfiguration?.schedule?.afternoon?.close);

        setWifiConfiguration({ wifiEnabled: businessConfiguration?.wifi?.enabled || false, wifiPassword: businessConfiguration?.wifi?.password || ""});
        setScheduleMorning({
            open: scheduleMorningOpen,
            close: scheduleMorningClose
        });
        setScheduleAfternoon({
            open: scheduleAfternoonOpen,
            close: scheduleAfternoonClose
        });
        setFunctionsActivated({
            orders: {
                manual: Boolean(businessConfiguration?.functionsActivated?.orders?.manual),
                automatized: Boolean(businessConfiguration?.functionsActivated?.orders?.automatized)
            }
        });
        setDisplayUsername(businessConfiguration?.displayUsername || "");
    }, [
        setWifiConfiguration,
        setScheduleMorning,
        setScheduleAfternoon,
        setFunctionsActivated,
        setDisplayUsername
    ]);
    

    
    console.log("isOpenWifiModal: ", isOpenWifiModal);
    
    

    if (!translations) {
        return <div>Loading translations...</div>;
    }

    return (
        // Contenedor principal que ocupa al menos toda la altura de la pantalla y organiza los hijos en columna
        <div className="w-full h-full">
            <ClientAppViewMenuModal
                isOpen={false}
            />
            
            <ClientAppViewWifiModal/>
            {/*<pre className={"break-words"}>{businessConfiguration && JSON.stringify(businessConfiguration, null, 2 )}</pre>*/}
            <div className="flex min-h-screen flex-col">
                {/* Contenido Principal */}
                {/* flex-grow hace que este elemento ocupe el espacio vertical disponible */}
                <div className={"flex w-full flex-grow flex-col items-center justify-center gap-y-3 px-4 py-8"}> {/* py-8 para dar algo de espacio arriba/abajo */}
                    <h1 className={"text-5xl text-center mb-6 font-dancing"}>
                        {translations.title}
                    </h1>
                    {/*<button onClick={() => makeRequest({
                        "where": {
                            "country_of_incorporation": "Spain",
                            "legal_form": "SL"
                        },
                        "include": {
                            "compliance": true,
                            "commercial_relationship": true,
                            "supporting_documents": true,
                            "phones": true
                        },
                        "orderBy": {
                            "legal_name": "asc"
                        }
                    })} className={"w-full py-4 flex justify-center items-center gap-x-4 transition-colors duration-300 border-2 border-black bg-white text-black rounded-bl-lg rounded-tl-lg transition hover:scale-105"}>
                        Hello
                    </button>*/}

                    {/*a<
                        !stateRequestSignal.value.data ? (
                            <div class="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>

                        ) : (
                            <div className="animate-fadeIn">
                                {JSON.stringify(stateRequestSignal.value.data)}
                            </div>
                        )
                    */}
                    

                    <div className={"w-full max-w-[34rem] flex flex-col gap-y-3"}>
                        <LangClientAppIslandButtonAutomatizedOrder translationCSR={translations.order_buttons.automatize} />
                        <LangClientAppIslandButtonManualOrder translationCSR={translations.order_buttons.manual} />
                    </div>
                </div>

                {/* Barra de Información Inferior (Footer) */}
                {/* Este footer es parte del flujo normal, no está fijo. */}
                {/* flex-shrink-0 es opcional aquí, pero asegura que no se encoja si hay poco espacio. */}
                <div className="w-full gap-x-2 px-3 flex-shrink-0 flex flex-row items-center justify-around bg-gradient-to-r from-transparent via-transparent to-transparent pb-10 border-t-2 border-black p-3 shadow-md bg-green-200">
                    <LangClientAppIslandButtonMenu translationCSR={translations.extrafunctionalities_buttons.show_menu} />
                    <LangClientAppIslandButtonWifi />
                    <ClientApp_GlobalIslandLangButtonCSR />
                </div>
            </div>
            {/* Indicador de conexión, también parte del flujo normal, después del footer */}
            
        </div>
        
    );
}