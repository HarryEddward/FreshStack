import {create} from 'zustand';
import { useClientStore } from "@islands/hooks/useClientStore.ts";

interface LanguageStore {
    lang: string;
    setLang: (newLang: string) => void;
}

const useLanguageStoreZustand = create<LanguageStore>((set) => ({
    lang: 'ca-mall', // Default language value
    setLang: (newLang: string) => set({ lang: newLang }),
}));

export function useLanguageStore() {
    return useClientStore(useLanguageStoreZustand);
};