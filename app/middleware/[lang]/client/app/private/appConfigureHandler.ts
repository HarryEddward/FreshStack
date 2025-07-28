import { config } from '@config/index.ts';
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

export async function appConfigureHandler(
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

  //console.log(`🟢 LICENSE HANDLER: ${req.url}`);

  const session = ctx.state.sessions?.["appConfiguration"];
  const existUrlTypeApp = await session.store.get("url_type_app") ? true : false;
  const urlTypeApp = await session.store.get("url_type_app");
  const newPath = `/${DEFAULT_LANG}/app`;
  const urlTypeAppFailedPage = new URL(newPath, req.url);
  console.log(`🟢 appConfigure Handler`);

  //console.log(req.url);
  //console.log(req.url.includes('/business/web/www'));
  if (!existUrlTypeApp && pathname !== `/${DEFAULT_LANG}/app` && !req.url.includes('/business/web/www')) {
    console.log(`🟡 La app espeicficada no es encontrada para redirigirse`);
    console.log(urlTypeApp);
    //await session.store.set("error_license", "true");
    return Response.redirect(urlTypeAppFailedPage, 307);
  }



  return await next();
}