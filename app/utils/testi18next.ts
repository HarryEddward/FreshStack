// utils/testi18next.ts
import i18nInstance, { initPromise } from "./i18n.ts";

async function testTranslation() {
  await initPromise;
  console.log("Test starting");

  const caTranslation = i18nInstance.t("app.index.full", { ns: 'client', lng: "ca-mall" });
  console.log("Traducción ca-mall:", caTranslation);

  const enTranslation = i18nInstance.t("app.index.full", { ns: 'client', lng: "en" });
  console.log("Traducción en:", enTranslation);
}

testTranslation().catch((err) => console.error("Test failed:", err));