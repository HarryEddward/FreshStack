

interface Props {
    actualLang?: string;
    name?: string;
}

export default function ClientOrderButton({ name = "Demanar", actualLang = "es" }: Props) {

    const handleRedirect = (actualLang: string) => {
        // Redirige al usuario a la página deseada
        globalThis.window.location.href = `/${actualLang}/client/app/private/services/products`;
    };

    return (
        <button type="submit" onClick={() => handleRedirect(actualLang)} className={"text-3xl font-semibold w-full py-3 bg-green-300 hover:bg-green-400 transition-all duration-300 font-dancing rounded-lg drop-shadow-2xl shadow-white transition-shadow border-2 hover:shadow-sm border-black"}>{name}</button>
    );
}
