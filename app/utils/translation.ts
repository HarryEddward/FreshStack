// utils/translation.ts

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];


export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];


export async function importTranslation<T>(lang: string, pathFileTranslation: string = "index.json"): Promise<T> {

    const translationPath = `@translations/${lang}/${pathFileTranslation}`;
    //console.log(translationPath);
    const translationResult = (await import(translationPath, { with: { type: "json" } })).default;
    return translationResult;
};