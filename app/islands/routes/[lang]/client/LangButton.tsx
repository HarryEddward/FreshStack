// LangButton.tsx
import { useState } from "preact/hooks";
import { IAllowLangs } from "@type/index.d.ts";

interface ILangsList {
  code: IAllowLangs;
  display: string;
}

interface Props {
  actualLang: string;
  nameChangeButton?: string;
}

export default function ClientLangButton({ actualLang, nameChangeButton }: Props) {
  const langsList: ILangsList[] = [
    { code: "ca-mall", display: "🇪🇸 - Mallorquí" },
    { code: "es", display: "🇪🇸 - Español" },
    { code: "de", display: "🇩🇪 - Deutsch" },
    { code: "en", display: "🇬🇧 - English" },
    { code: "fr", display: "🇫🇷 - Français" },
    { code: "ar", display: "🇲🇦 - العربية" },
    { code: "it", display: "🇮🇹 - Italiano" },
  ];

  const initialIndex = langsList.findIndex((lang) => lang.code === actualLang) || 0;
  const [index, setIndex] = useState(initialIndex);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % langsList.length);
  };

  const redirect = (lang: string) => {
    console.log("Redirect...");
    const supportedLangs: IAllowLangs[] = ["ca-mall", "es", "de", "en", "fr", "ar", "it"];
    if (supportedLangs.includes(lang as IAllowLangs)) {
      const currentPath = globalThis.window.location.pathname;
      const pathSegments = currentPath.split("/").filter(Boolean);
      // Reemplazar el idioma actual (primer segmento) con el nuevo idioma
      const newPath = pathSegments.length > 0 && supportedLangs.includes(pathSegments[0] as IAllowLangs)
        ? `/${lang}/${pathSegments.slice(1).join("/")}`
        : `/${lang}${currentPath}`;

      console.log(newPath);
      setTimeout(() => {
        console.log("WAIT...");
      }, 5000);
      globalThis.window.location.href = newPath;
    }
  };

  return (
    <div className="flex flex-col w-full rounded-lg bg-white bg-green-200 ">
      

      <div className="w-full flex justify-end pb-3 p-2">
        <button
          type="button"
          onClick={handleClick}
          className="text-xl font-semibold w-[70%] py-3 border-2 rounded-lg bg-white"
        >
          {langsList[index].display}
        </button>
      </div>
      
      <button
        type="button"
        onClick={() => redirect(langsList[index].code)}
        className="w-full flex font-dancing text-black py-2 text-2xl px-2"
      >
        <span className="w-[60%] bg-white rounded-lg py-1 px-3 border-2 border-black h-[200%] flex items-center justify-center shadow-2xl shadow-black-400">{nameChangeButton || "Canviar"}</span>
      </button>
    </div>
  );
}