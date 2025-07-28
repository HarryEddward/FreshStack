// middleware/[lang]/languageRouter.ts
import { FreshContext } from "$fresh/server.ts";
import { exists } from "https://deno.land/std/fs/mod.ts"; // Usar para comprobar existencia de archivos
import { State } from "@middleware/sessionHandler.ts";

export async function translationLoader(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  console.log("🟡 MIDDLEWARE Translator JSON");

  const url = new URL(req.url);
  const session = ctx.state.sessions?.["sessionId"];
  const pathname = url.pathname;
  console.log(pathname);
  const translationPath = `../../translations${pathname}/index.json`;
  console.log(translationPath);
  const absPath = new URL(translationPath, import.meta.url).href;

  try {

    const fileExists = await exists(translationPath);
    console.log(fileExists);

    if (fileExists) {
      console.warn(`[WARN] No se encontró el archivo de traducción para ${pathname}`);
      session.store.set("translation", {});
      ctx.state.translation = {}; // fallback vacío para evitar errores posteriores
    } else {
      const translationModule = await import(translationPath, { with: { type: "json" } });
      session.store.set("translation", translationModule.default);
      ctx.state.translation = translationModule.default;
    }
  } catch (err) {
    console.warn(`[WARN] Error al intentar cargar la traducción para ${pathname}:`, err);
    session.store.set("translation", {});
    ctx.state.translation = {}; // fallback vacío para evitar errores posteriores
  }

  const resp = await next();

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers,
  });
}
