// utils/i18n.ts
import i18next from "npm:i18next";
import { IAllowLangs } from "../types/index.d.ts";

const languages: IAllowLangs[] = ["ar", "ca-mall", "de", "en", "es", "fr", "it"];
const resources: Record<IAllowLangs, any> = {
  ar: {},
  "ca-mall": {},
  de: {},
  en: {},
  es: {},
  fr: {},
  it: {},
};


async function loadResources() {
  for (const lang of languages) {
    try {
      resources[lang] = {
        client: {
          app: {
            common: (await import(`@translations/${lang}/client/app/common.json`, { with: { type: "json" } })).default,
            index: (await import(`@translations/${lang}/client/app/index.json`, { with: { type: "json" } })).default,
            payment: (await import(`@translations/${lang}/client/app/payment.json`, { with: { type: "json" } })).default,
            products: (await import(`@translations/${lang}/client/app/products.json`, { with: { type: "json" } })).default,
            transaction: (await import(`@translations/${lang}/client/app/transaction.json`, { with: { type: "json" } })).default,
          },
        },
      };
      //console.log(`Loaded resources for ${lang}:`, resources[lang]);
    } catch (error) {
      console.error(`Failed to load resources for ${lang}:`, error);
      resources[lang] = { client: { app: {} } }; // Fallback to empty object
    }
  }
}

const i18nInstance = i18next.createInstance();

const initPromise = (async () => {
  await loadResources();
  
  await i18nInstance.init({
    lng: "ca-mall",
    fallbackLng: "es",
    ns: ["client"],
    defaultNS: "client",
    resources,
  });
  console.log("i18next initialized in i18n.ts");
})();

export default i18nInstance;
export { initPromise };