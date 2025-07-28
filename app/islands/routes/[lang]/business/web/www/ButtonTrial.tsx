import { ClipboardCheckIcon } from "npm:lucide-preact@^0.485.0";

export default function LangBusinessWebWWWIslandButtonTrial({
  actualLang
}: { actualLang: string }) {

    const handleRedirect = (actualLang: string) => {
        globalThis.window.location.href = `/${actualLang}/business/web/www/login`;
    };

  return (
    <button
      className={`group w-full rounded-full border-2 border-black bg-green-200 p-4 flex flex-col items-start justify-center mt-8 
        transition-all duration-300 ease-in-out 
        hover:bg-green-300 hover:shadow-xl hover:scale-[1.025] hover:border-green-600
        active:scale-[0.98]
        focus:outline-none focus:ring-4 focus:ring-green-400/50`}
      onClick={() => handleRedirect(actualLang)}
    >
      <div
        className="flex flex-row gap-x-3 items-center transform transition-transform duration-300 ease-in-out group-hover:translate-x-2"
      >
        <ClipboardCheckIcon className="transition-transform duration-300 group-hover:rotate-[-6deg]" />
        <h2 className="text-xl font-light text-black">
          Pruebalo ya.
        </h2>
      </div>
    </button>
  );
}
