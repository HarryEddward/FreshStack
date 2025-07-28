import { useState } from 'preact/hooks';
import { IAllowLangs } from '@type/index.d.ts';
import {useLanguageStore} from "@islands/routes/[lang]/client/app/[_global]/zustand/storeLang.ts";

export default function ClientApp_GlobalIslandLangButtonCSR() {
  const { setLang } = useLanguageStore();

  const langs: Partial<Record<IAllowLangs, string>>[] = [
    { "ca-mall": '🇪🇸' },
    { "es": '🇪🇸' },
    { "de": '🇩🇪' },
    { "en": '🇬🇧' },
    { "fr": '🇫🇷' },
    { "ar": '🇸🇦' },
    { "it": '🇮🇹' }
  ];

  const langKeys = langs.map(lang => Object.keys(lang)[0]);
  const [index, setIndex] = useState(0);
  const [currentLang, setCurrentLang] = useState(langKeys[index] || 'es');

  const handleClick = () => {
    const nextIndex = (index + 1) % langs.length;
    console.log(nextIndex);
    setIndex(nextIndex);

    const selectedLang = langKeys[nextIndex];
    setCurrentLang(selectedLang);
    setLang(selectedLang);
  };

  const currentEmoji = Object.values(langs[index])[0];

  return (
    <button
      onClick={handleClick}
      class="border-2 border-black  bg-green-300 px-5 py-3 text-3xl transition hover:scale-105 rounded-br-lg rounded-tr-lg"
    >
      {currentEmoji}
    </button>
  );
}
