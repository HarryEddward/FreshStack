// routes/sitemap.xml.ts
import { Handlers } from "$fresh/server.ts";
import { create } from "npm:xmlbuilder2";

export const handler: Handlers = {
  GET() {
    const pages = [
      { url: "https://mi-sitio.com/", priority: "1.0", lastmod: new Date() },
    ];

    const sitemap = create({ version: "1.0", encoding: "UTF-8" })
      .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" })
      .ele("url")
      .ele("loc").txt(pages[0].url).up()
      .ele("lastmod").txt(pages[0].lastmod.toISOString().split("T")[0]).up()
      .ele("priority").txt(pages[0].priority).up()
      .up()
      .end({ prettyPrint: true });

    return new Response(sitemap, { headers: { "Content-Type": "application/xml" } });
  },
};