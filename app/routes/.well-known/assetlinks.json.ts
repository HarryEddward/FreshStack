// routes/.well-known/assetlinks.json.ts
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET() {
    const json = [{
      "relation": ["delegate_permission/common.handle_all_urls"],
      "target" : {
        "namespace": "android_app", "package_name": "com.app.cafebuyclientapp",
        "sha256_cert_fingerprints": [
          "AC:6E:83:1B:B6:24:17:C4:48:DF:78:37:39:75:8E:24:2F:A4:96:80:E2:9D:FB:22:AB:DE:9A:47:4E:E9:2F:9C"
        ]
      }
    }];

    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
