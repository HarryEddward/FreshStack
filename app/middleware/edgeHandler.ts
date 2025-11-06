// @middleware/languageRouter.ts
import { FreshContext } from '$fresh/server.ts';
import { IAllowLangs } from "@type/index.d.ts";
import { getCookies, setCookie } from "https://deno.land/std/http/cookie.ts";
import { excludePathsMiddleware } from "@utils/path.ts";
import { isStaticRoute } from "../utils/routing/staticFiles.ts";
import { State } from "@middleware/sessionHandler.ts";
import { isAnApiRoute } from "@utils/routing/apiRoutes.ts";

export async function languageRouter(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  
    const response = await next();

    // Middleware para detectar si estamos detrás de un proxy
    const headers = new Headers(req.headers);

    // Detectar protocolo real
    const forwardedProto = headers.get("x-forwarded-proto") || "http";
    const forwardedHost = headers.get("x-forwarded-host") || 
                        headers.get("host") || 
                        "localhost:8000";

    // Añadir headers personalizados para que la app sepa que está en edge
    headers.set("x-real-proto", forwardedProto);
    headers.set("x-real-host", forwardedHost);

    // Crear una nueva URL con el host real
    const url = new URL(req.url);
    url.protocol = forwardedProto + ":";
    url.host = forwardedHost;


    const newReq = new Request(url, {
        method: req.method,
        headers: headers,
        body: req.body,
        // Mantener otros campos importantes
        redirect: req.redirect,
        integrity: req.integrity,
        keepalive: req.keepalive,
        signal: req.signal,
    });

    

    // Asegurar que las cookies tengan atributos adecuados para edge
    const setCookieHeaders = response.headers.get("Set-Cookie");
    if (setCookieHeaders) {
    // Puedes procesar cookies aquí si es necesario
    }

    return response;

  return await next();
  // Guardar lang en la sesión

}