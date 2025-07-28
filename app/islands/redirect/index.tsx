import { IAllowLangs } from "@type/index.d.ts";


// Isla interactiva para el cliente
export default function RedirectByScreenWidth(
  { assumedMobilePath, lang, assumedWebPath }: { assumedMobilePath: string, lang: IAllowLangs, assumedWebPath: string },
) {
  if (typeof globalThis.window !== "undefined") {
    const width = globalThis.window.innerWidth;
    const isMobile = width < 768; // Umbral: 768px
    const correctPath = isMobile ? assumedMobilePath : (assumedWebPath ? assumedWebPath : `/${lang}/business/web/www`);

    // Si la suposición del servidor no coincide, redirigimos
    globalThis.window.location.href = correctPath;
  }

  return (
    <div className="">
      <h1 className="text-4xl">CafePay</h1>
      <p className="text-2xl">
        Redirigiendo hacia tu servidor...
      </p>
      
    </div>
  );
}
