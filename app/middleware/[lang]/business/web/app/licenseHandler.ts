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

export async function licenseHandler(
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

  const session = ctx.state.sessions?.["sessionId"];
  const existLicense = await session.store.get("license") ? true : false;
  const license = await session.store.get("license");
  const newPathFailed = `/${DEFAULT_LANG}/license`;
  const licenseFailedPage = new URL(newPathFailed, req.url);
  const newPathSuccess = `/${DEFAULT_LANG}/business/web/app/dashboard`;
  const licenseSuccessWebAppPage = new URL(newPathSuccess, req.url);
  console.log(`🟢 LICENSE Handler`);

  //console.log(req.url);
  //console.log(req.url.includes('/business/web/www'));
  if (!existLicense && pathname !== `/${DEFAULT_LANG}/license` && !req.url.includes('/business/web/www')) {
    console.log(`🟡 LICENSE NOT FOUND, REDIRECTING TO LICENSE PAGE`);
    //await session.store.set("error_license", "true");
    return Response.redirect(licenseFailedPage, 307);
  }

  if (existLicense) {

    console.log("Code_license form", license);
    
    const queryBusiness = encodeURIComponent(JSON.stringify({
        "where": {
            "id": license
        },
        "select": {
            "id": true,
            "businessId": true
        }
    }));
    
    const responseBusiness = await fetch(`${config.mainApiUrl}/api/v1/model/businessLicense/findUnique?q=${queryBusiness}`, {
      method: "GET"
    });

    console.log("Response Business:", responseBusiness.ok);

    if (!responseBusiness.ok) {
      console.error(`Error al hacer fetch: ${responseBusiness.statusText}`);
      await session.store.set("error_license", "true");
      
      return Response.redirect(licenseFailedPage, 307);
    }

    const businessLicense = await responseBusiness.json(); // Ej: { data: [...] }
    console.log(businessLicense);

    if (businessLicense.data === null) {
      await session.store.set("error_license", "true");
      return Response.redirect(licenseFailedPage, 307);
    }

    console.log("Business encontradas:", businessLicense);
    await session.store.set("business_id", businessLicense.data.businessId);
  }

  await session.store.delete("error_license");

  //return Response.redirect(licenseSuccessWebAppPage, 307);

  console.log("ACABO?");
  return await next();
}