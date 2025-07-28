import { Handlers } from "$fresh/server.ts";
import RedirectByScreenWidth from "@islands/redirect/index.tsx";
import { State } from "@middleware/sessionHandler.ts";
import { IAllowLangs } from "@type/index.d.ts";

// Handler en el servidor (usa User-Agent como fallback)
export const handler: Handlers<unknown, State> = {
  async GET(req, ctx) {

    const session = ctx.state.sessions?.["sessionId"];
    const sessionAppConfigure = ctx.state.sessions?.["appConfiguration"];
    const isApp = await sessionAppConfigure.store.get("url_type_app");
    const lang = await session.store.get("lang") || "ca-mall";
    const userAgent = req.headers.get("user-agent") || "";
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const assumedPath = isMobile ? "/ca-mall/client/app/private/services/payment" : "/ca-mall/business/web/www";
    console.log('MAIN PAGE');
    const assumedMobilePath = isApp ? isApp : "/ca-mall/client/app/private/step_before";
    // Renderizamos la página con una redirección inicial tentativa
    return ctx.render({ assumedMobilePath, lang });
  },
};

// Componente principal
export default function Home({ data }: { data: { assumedMobilePath: string, lang: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RedirectByScreenWidth lang={data.lang as IAllowLangs} assumedMobilePath={data.assumedMobilePath} />
    </div>
  );
}
