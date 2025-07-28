import { Handlers, PageProps } from "$fresh/server.ts";
import RedirectByScreenWidth from "@islands/redirect/index.tsx";
import { State } from '@middleware/sessionHandler.ts';
import { IAllowLangs } from "@type/index.d.ts";

// Handler en el servidor (usa User-Agent como fallback)
export const handler: Handlers<unknown, State> = {
  async GET(req, ctx) {

    console.log("here?");
    const session = ctx.state.sessions?.["sessionId"];
    const sessionAppConfigure = ctx.state.sessions?.["appConfiguration"];
    const sessionWebConfiguration = ctx.state.sessions?.["webConfiguration"];
    console.log("here?");
    //await sessionAppConfigure.store.set("path_type_app", "/ca-mall/business/app");


    const lang = await session.store.get("lang") || "ca-mall";
    const assumedWebPath = await sessionWebConfiguration.store.get("url_type_web");
    const isApp = await sessionAppConfigure.store.get("url_type_app");
    const userAgent = req.headers.get("user-agent") || "";

    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    
    //const assumedPath = isMobile ? (isApp ? isApp : "/ca-mall/client/app/payment") : "/ca-mall/business/web/www";
    //console.log('MAIN PAGE');

    const assumedMobilePath = isApp ? isApp : `/${lang}/app`;

    console.log("here?");

    // Renderizamos la página con una redirección inicial tentativa
    return ctx.render({
      assumedWebPath,
      assumedMobilePath,
      lang
    });
  },
};

// Componente principal
export default function Home({ data }: PageProps<{ assumedMobilePath: string, lang: IAllowLangs, assumedWebPath: string }> ) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RedirectByScreenWidth assumedMobilePath={data.assumedMobilePath} lang={data.lang} assumedWebPath={data.assumedWebPath} />
    </div>
  );
}
