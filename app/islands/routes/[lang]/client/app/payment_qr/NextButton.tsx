import { ArrowRightIcon, ArrowLeftIcon } from 'npm:lucide-preact';

interface Props {
    actualLang?: string;
}

export default function ClientAppPaymentQrNextButton({ actualLang = "es" }: Props) {

    const handleRedirect = (actualLang: string) => {
        console.log("Redirigiendo a la página de pago");
        globalThis.window.location.href = `/${actualLang}/client/app/private/services/products`;
    };

    return (
        <div className="w-full p-2">
            <button 
                onClick={() => handleRedirect(actualLang)}
                className={`w-full rounded-lg py-4 flex justify-center items-center gap-x-2 transition-colors duration-300 border-2 border-black drop-shadow-2xl shadow-white
                    ${'bg-green-300 hover:bg-green-400'}
                `}
            >
                <ArrowLeftIcon color="black" size={40} />
            </button>
        </div>
    );
}