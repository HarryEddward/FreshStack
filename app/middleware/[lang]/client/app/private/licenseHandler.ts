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

  const existLicensePhone = await session.store.get("phone_license") ? true : false;
  const licensePhone = await session.store.get("phone_license");

  const redirectUrl = "/client/app/private/step_before";
  const newPath = `/${DEFAULT_LANG}/client/app/public/services/license?redirectUrl=${redirectUrl}`;

  const licenseFailedPage = new URL(newPath, req.url);
  console.log(`🟢 LICENSE Handler`);

  //console.log(req.url);
  //console.log(req.url.includes('/business/web/www'));
  console.log("License: " + existLicense);

  if (!existLicense && !existLicensePhone && pathname !== `/${DEFAULT_LANG}/client/app/public/services/license` && !req.url.includes('/business/web/www')) {
    console.log(`🟡 LICENSE NOT FOUND, REDIRECTING TO LICENSE PAGE`);
    //await session.store.set("error_license", "true");
    return Response.redirect(licenseFailedPage, 307);
  }

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
  console.log(`${config.mainApiUrl}/api/v1/model/businessLicense/findUnique?q=${queryBusiness}`);
  const responseBusiness = await fetch(`${config.mainApiUrl}/api/v1/model/businessLicense/findUnique?q=${queryBusiness}`, {
      method: "GET"
  });


  if (!responseBusiness.ok) {
    console.error(`Error al hacer fetch: ${responseBusiness.statusText}`);
    await session.store.set("error_license", "true");
    
    return Response.redirect(licenseFailedPage, 307);
  }

  const businessLicense = await responseBusiness.json(); // Ej: { data: [...] }
  console.log("License es verdad: " + JSON.stringify(businessLicense));

  if (businessLicense.data === null) {
    await session.store.set("error_license", "true");
    return Response.redirect(licenseFailedPage, 307);
  }

  console.log("Business encontradas:", businessLicense);
  await session.store.set("business_id", businessLicense.data.businessId);
  

  /**
   * Se deberá de crear una seccion especifica para aplicar en sesión el id del
   * phone del business para aplicarse en lógica de negocio en el futuro.
   * 
   * Con a validación directa del Phone ID de la empresa que emite el teléfono.
   */

  console.log("Phone License: " + licensePhone);

  const queryBusinessPhone = encodeURIComponent(JSON.stringify({
      where: {
          id: licensePhone
      },
      select: {
          id: true,
      }
  }));

  console.log(`${config.mainApiUrl}/api/v1/model/businessPhone/findUnique?q=${queryBusinessPhone}`);
  const cookies = req.headers.get("cookie");
  console.log("Cookies: " + cookies);
  const responseBusinessPhone = await fetch(`${config.mainApiUrl}/api/v1/model/businessPhone/findUnique?q=${queryBusinessPhone}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Cookie": cookies ?? ""
      },
  });


  if (!responseBusinessPhone.ok) {
    console.error(`Error al hacer fetch: ${JSON.stringify(await responseBusinessPhone.json())}`);
    await session.store.set("error_license", "true");
    
    return Response.redirect(licenseFailedPage, 307);
  }

  const businessLicensePhone = await responseBusinessPhone.json();
  console.log("License es verdad: " + JSON.stringify(businessLicensePhone));

  if (businessLicensePhone.data === null) {
    await session.store.set("error_license", "true");
    return Response.redirect(licenseFailedPage, 307);
  }

  console.log("Business encontradas:", businessLicensePhone);
  await session.store.set("business_phone_id", businessLicensePhone.data.id);
  console.log("Business Phone ID: " + await session.store.get("business_phone_id"));

  await session.store.delete("error_license");
  

  console.log("ACABO?");

  return await next();
}