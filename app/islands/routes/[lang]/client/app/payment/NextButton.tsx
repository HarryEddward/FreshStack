
import { ArrowRightIcon } from "npm:lucide-preact";

interface Props {
    actualLang?: string;
};

export default function ClientAppPaymentNextButton({ actualLang = "es" }: Props) {

    const handleRedirect = (actualLang: string) => {
        // Redirige al usuario a la página deseada
        console.log("Redirigiendo a la página de pago");
        globalThis.window.location.href = `/${actualLang}/client/app/private/services/transaction`;
    };

    return (
        <button type={"submit"} onClick={() => handleRedirect(actualLang)} className={"w-full bg-green-300 hover:bg-green-400 transition-colors duration-300 text-black rounded-lg py-4 font-dancing text-4xl font-bold border-2 border-black drop-shadow-2xl shadow-white"}>Comprar</button>
    );
}
