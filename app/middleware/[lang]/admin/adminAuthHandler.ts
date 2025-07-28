// @middleware/languageRouter.ts
import { FreshContext } from '$fresh/server.ts';
import { IAllowLangs } from "@type/index.d.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";
import { excludePathsMiddleware } from "@utils/path.ts";
import { isStaticRoute } from "@utils/routing/staticFiles.ts";
import { State } from "@middleware/sessionHandler.ts";
import { isAnApiRoute } from "@utils/routing/apiRoutes.ts";
import { sessionApiManager } from '@utils/api/cookieProcessor.ts';

const supportedLangs: IAllowLangs[] = ["ca-mall", "es", "de", "en", "fr", "ar", "it"];
const DEFAULT_LANG: IAllowLangs = supportedLangs[0];
const staticExtensions = [".css", ".svg", ".js", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".xml", ".js.map"];

export async function adminAuthHandler(
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


  return await next();
}