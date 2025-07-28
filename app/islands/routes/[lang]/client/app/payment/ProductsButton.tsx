import { ArrowLeftIcon } from "npm:lucide-preact";


interface Props {
    actualLang?: string;
};

export default function ClientAppPaymentProductsButton({ actualLang = "es" }: Props) {

    const handleRedirect = (actualLang: string) => {
        // Redirige al usuario a la página deseada
        console.log("Redirigiendo a la página de pago");
        globalThis.window.location.href = `/${actualLang}/client/app/products`;
    };

    return (
        <div className={"w-full flex justify-end p-2"}>
            <button onClick={() => handleRedirect(actualLang)} className={"w-1/2 flex justify-center items-center bg-green-300 hover:bg-green-400 transition-colors duration-400 rounded-lg p-2 border-2 border-black drop-shadow-2xl shadow-white"}>
                <ArrowLeftIcon color="black" size={30}/>
                
            </button>
        </div>
    );
}
