// middleware/[lang]/languageRouter.ts
import { FreshContext } from "$fresh/server.ts";
import { State } from "@middleware/sessionHandler.ts";
import { oauth2Client } from "@utils/oauth_client.ts";
import { isAnApiRoute } from "@utils/routing/apiRoutes.ts";

export async function testHandler(
  req: Request,
  ctx: FreshContext<State>,
  next: () => Promise<Response>
): Promise<Response> {
    

    if (isAnApiRoute(req.url)) {
        return await next();
    }

    console.log("🟡 Testing Hahaha");

    const resp = await next();

    return new Response(resp.body, {
        status: resp.status,
        statusText: resp.statusText,
        headers: resp.headers,
    });
}
