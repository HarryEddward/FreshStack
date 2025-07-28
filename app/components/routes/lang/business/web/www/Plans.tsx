import { FolderCheck, Folder } from 'npm:lucide-preact@^0.485.0';
export default function LangBusinessWebWWWComponentPlans() {
    const reliableMessages = [
        "https://wa.me/34643567016?text=Hola%2C%20he%20visto%20el%20plan%20Reliable%20de%20CafeBuy%20y%20me%20gustaría%20recibir%20más%20detalles%20sobre%20sus%20funcionalidades%20y%20cómo%20puede%20adaptarse%20a%20mi%20negocio.%20%0A%0A%C2%BFPodr%C3%ADas%20orientarme%20un%20poco%20m%C3%A1s%3F%20Gracias.",
        "https://wa.me/34643567016?text=Hola%2C%20estoy%20interesado%20en%20el%20plan%20Reliable%20de%20CafeBuy%20por%2085%E2%82%AC%2Fmes.%20Me%20gustar%C3%ADa%20saber%20si%20existen%20opciones%20de%20personalizaci%C3%B3n%20o%20alg%C3%BAn%20per%C3%ADodo%20de%20prueba.%20%C2%A1Gracias!"
    ];

    const easyMessages = [
        "https://wa.me/34643567016?text=Hola%2C%20estoy%20interesado%20en%20el%20plan%20Easy%20de%20CafeBuy%20por%20100%E2%82%AC%2Fmes.%20%C2%BFPodr%C3%ADas%20darme%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20ventajas%20y%20cómo%20puede%20ayudar%20a%20automatizar%20mi%20cafeter%C3%ADa%3F%20Gracias.",
        "https://wa.me/34643567016?text=Hola%2C%20he%20visto%20el%20plan%20Easy%20y%20me%20interesa%20por%20las%20opciones%20avanzadas%20como%20los%20informes%20con%20IA%20y%20la%20afiliaci%C3%B3n%20con%20SumUp.%20%C2%BFPodr%C3%ADas%20contarme%20m%C3%A1s%20detalles%20sobre%20estas%20funcionalidades%3F"
    ];

    const urlNegotiateReliable = reliableMessages[Math.floor(Math.random() * reliableMessages.length)];
    const urlNegotiateEasy = easyMessages[Math.floor(Math.random() * easyMessages.length)];

    return (
        <div className={"w-full flex flex-col items-left justify-center  p-8 mt-16"}>
            {/*<h5 className={"text-4xl font-semibold text-left"}>Pricing</h5>*/}
            <div className={"w-full flex flex-col md:flex-row items-start justify-evenly md:space-x-5 space-x-0 md:space-y-0 space-y-5 mt-12"}>

                {/* Reliable Plan */}
                <div className="rounded-md w-full border-2 justify-center p-4">
                    <div className={"flex flex-row gap-x-4 text-4xl pb-8"}>
                        <Folder size={"2.5rem"}/>
                        <span>Realible</span>
                    </div>
                    <div className="w-full flex flex-col pt-4">
                        <span className={"text-4xl font-thin"}>120€/month - (IVA incluido)</span>
                        <div className="w-full flex justify-center border-2 p-4 mt-8 hover:scale-95 transition-all duration-300 ease-in-out">
                            <a href={urlNegotiateReliable} className="text-2xl">Contactar Ventas</a>
                        </div>

                        <div className={"w-full flex flex-col p-4 space-y-2 pt-16"}>
                            <span className={"text-4xl font-black"}>Para quienes són?</span>
                            <ul className="w-full flex flex-col pt-4 pl-6">
                                <li className={"text-xl list-disc"}>Automatización suficiente para un coste justo</li>
                                <li className={"text-xl list-disc"}>Comienzo de inicios de una caféteria</li>
                            </ul>
                        </div>

                        <ul className="w-full flex flex-col pt-4 pl-6">
                            <li className={"text-xl font-thin list-disc"}>Automatización de pedidos</li>
                            <li className={"text-xl font-thin list-disc"}>Gestión de mesas</li>
                            <li className={"text-xl font-thin list-disc"}>Analíticas de ventas</li>
                            <li className={"text-xl font-thin list-disc"}>Gestión avanzada de stock</li>
                            <li className={"text-xl font-thin list-disc"}>Gestión intuitivo de pedidos</li>
                        </ul>
                    </div>
                </div>

                {/* Easy Plan */}
                <div className="rounded-md w-full border-2 justify-center p-4">
                    <div className={"flex flex-row gap-x-4 text-4xl pb-8"}>
                        <FolderCheck size={"2.5rem"}/>
                        <span>Easy</span>
                    </div>
                    <div className="w-full flex flex-col pt-4">
                        <span className={"text-4xl font-thin"}>150€/month - (IVA incluido)</span>
                        <div className="w-full flex justify-center border-2 p-4 mt-8 hover:scale-95 transition-all duration-300 ease-in-out">
                            <a href={urlNegotiateEasy} className="text-2xl">Contactar Ventas</a>
                        </div>

                        <div className={"w-full flex flex-col p-4 space-y-2 pt-16"}>
                            <span className={"text-4xl font-black"}>Para quienes són?</span>
                            <ul className="w-full flex flex-col pt-4 pl-6">
                                <li className={"text-xl list-disc"}>Necesitan mas tiempo con sus familiares</li>
                                <li className={"text-xl list-disc"}>Más facilidad del manejo del negocio</li>
                                <li className={"text-xl list-disc"}>Mayor flujo con los empleados y físcalidad</li>
                            </ul>
                        </div>

                        <ul className="w-full flex flex-col pt-4 pl-6">
                            <li className={"text-xl font-thin list-disc"}>Automatización de pedidos</li>
                            <li className={"text-xl font-thin list-disc"}>Gestión de mesas</li>
                            <li className={"text-xl font-thin list-disc"}>Analíticas de ventas</li>
                            <li className={"text-xl font-thin list-disc"}>Gestión avanzada de stock</li>
                            <li className={"text-xl font-thin list-disc"}>Gestión intuitivo de pedidos</li>
                            <li className={"text-xl font-thin list-disc"}>Analíticas avanzadas</li>
                            <li className={"text-xl font-thin list-disc"}>Generación informes de PDF's con IA (reabastecimiento, ventas, analíticas, almacén entre otros)</li>
                            <li className={"text-xl font-thin list-disc"}>Afiliación con SumUp (comisiónes mas bajas en transacciónes y entre otras ventajas a negociar)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
