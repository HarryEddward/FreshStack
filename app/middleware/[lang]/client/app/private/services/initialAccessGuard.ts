// middleware/[lang]/languageRouter.ts
import { FreshContext } from "$fresh/server.ts";
import { exists } from "https://deno.land/std/fs/mod.ts"; // Usar para comprobar existencia de archivos
import { State } from "@middleware/sessionHandler.ts";
import { isAnApiRoute } from "@utils/routing/apiRoutes.ts";
import { isStaticRoute } from "@utils/routing/staticFiles.ts";
import { excludePathsMiddleware } from '@utils/path.ts';

export async function initialAccessGuard(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
  console.log("🟡 MIDDLEWARE initialAccessGuard.ts");

  const url = new URL(req.url);
  const pathname = url.pathname;

  if (isAnApiRoute(req.url)) {
      return await next();
    }
  
    // Saltar rutas estáticas y extensiones
    if (isStaticRoute(req.url)) {
      return await next();
    }
  
    // Saltar rutas excluidas
    if (excludePathsMiddleware(pathname)) {
      return await next();
    }

    const session = ctx.state.sessions?.["sessionId"];
    


    const termsAccepted = await session.store.get("terms_accepted");
    const wantsTicket = await session.store.get("wants_ticket");
    const ticketEmail = await session.store.get("ticket_email");

    const actualLang = await session.store.get("lang") || "ca-mall";

    const params = new URLSearchParams({
      not_accepted_terms_and_conditions: "true",
    });

    const responseMainClientApp = new Response(null, {
      status: 302,
      headers: {
        "Location": `/${actualLang}/client?${params}`,
        "Content-Type": "application/json",
      },
    });

    console.log("termsAccepted", termsAccepted);
    if (termsAccepted === null || wantsTicket === null) {
        return responseMainClientApp;
    }


    console.log("wantsTicket", wantsTicket);
    if (termsAccepted === "not_accepted") {
        return responseMainClientApp;
    }

    console.log("ticketEmail", ticketEmail);
    if (wantsTicket === "requested" && ticketEmail === null) {
        return responseMainClientApp;
    }


  const resp = await next();
  return resp;

  /*
  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers,
  });*/
}
