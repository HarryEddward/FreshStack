// @middleware/languageRouter.ts
import { FreshContext } from '$fresh/server.ts';
import { IAllowLangs } from "@type/index.d.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";
import { excludePathsMiddleware } from "@utils/path.ts";
import { isStaticRoute } from "../utils/routing/staticFiles.ts";
import { State } from "@middleware/sessionHandler.ts";
import { isAnApiRoute } from "@utils/routing/apiRoutes.ts";

const supportedLangs: IAllowLangs[] = ["ca-mall", "es", "de", "en", "fr", "ar", "it"];
const DEFAULT_LANG: IAllowLangs = supportedLangs[0];
const staticExtensions = [".css", ".svg", ".js", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".xml", ".js.map"];

export async function languageRouter(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  

  const url = new URL(req.url);
  const pathname = url.pathname;

  if (isAnApiRoute(req.url)) {
    return await next();
  }

  // Saltar rutas estáticas y extensiones
  if (isStaticRoute(req.url) || staticExtensions.some((ext) => pathname.endsWith(ext))) {
    //console.log(`🟡 SKIPPING LANGUAGE ROUTER for static route: ${req.url}`);
    return await next();
  }

  // Saltar rutas excluidas
  if (excludePathsMiddleware(pathname)) {
    //console.log(`🟡 SKIPPING LANGUAGE ROUTER for excluded path: ${pathname}`);
    return await next();
  }

  console.log(`🟢  LANGUAGE ROUTER CALLED FOR URL: ${req.url}`);

  const session = ctx.state.sessions?.["sessionId"];
  const cookies = getCookies(req.headers);
  let lang: IAllowLangs;

  const pathSegments = pathname.split("/").filter(Boolean);
  const hasLangInPath = pathSegments.length > 0 && supportedLangs.includes(pathSegments[0] as IAllowLangs);

  if (!hasLangInPath && pathname !== "/") {
    lang = supportedLangs.includes(cookies.cookieLang as IAllowLangs)
      ? (cookies.cookieLang as IAllowLangs)
      : DEFAULT_LANG;
    ctx.state.lang = lang;
    const newPath = `/${lang}${pathname}`;
    console.log(`🟡 REDIRECT (NO LANG): ${newPath}`);
    return Response.redirect(new URL(newPath, req.url), 307);
  }

  if (pathname === "/") {
    lang = supportedLangs.includes(cookies.cookieLang as IAllowLangs)
      ? (cookies.cookieLang as IAllowLangs)
      : DEFAULT_LANG;
    ctx.state.lang = lang;
    const newPath = `/${lang}`;
    console.log(`🟡 REDIRECT (ROOT): ${newPath}`);
    return Response.redirect(new URL(newPath, req.url), 307);
  }

  const routeLang = pathSegments[0] as IAllowLangs;
  if (supportedLangs.includes(routeLang)) {
    lang = routeLang;
    ctx.state.lang = lang;
    console.log(`🟡 LANG FROM PATH: ${lang}`);
  } else {
    lang = supportedLangs.includes(cookies.cookieLang as IAllowLangs)
      ? (cookies.cookieLang as IAllowLangs)
      : DEFAULT_LANG;
    ctx.state.lang = lang;
    const newPath = `/${lang}${pathname.slice(routeLang.length + 1)}`;
    console.log(`🟡 REDIRECT (INVALID LANG): ${newPath}`);
    return Response.redirect(new URL(newPath, req.url), 307);
  }

  if (cookies.cookieLang && cookies.cookieLang !== lang) {
    console.log(`🟡 COOKIE OUT OF SYNC: cookie=${cookies.cookieLang}, path=${lang}`);
  }

  ctx.state.lang = lang;
  console.log(`🟡 LANG SET: ${lang}`);

  // Guardar el idioma en la sesión
  try {
    await session.store.set("lang", lang); // Guardar lang, no cookies.cookieLang
    console.log(`🟡 SESSION LANG SET: ${lang}`);
    console.log(`🟡 SESSION LANG GET: ${await session.store.get("lang")}`);
  } catch (error) {
    console.error(`🟡 ERROR SETTING SESSION LANG: ${error}`);

  }
  console.log(`🟡 SESSION LANG SET: ${lang}`);

  console.log("🟡 LANGUAGE ROUTER COMPLETED");
  await session.store.set("lang", lang); 
  
  return await next();
  // Guardar lang en la sesión

}