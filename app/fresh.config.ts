import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import manifest from './fresh.gen.ts';
import { init } from "@config/init.ts";

export default defineConfig({
  server: {
    //cert: await Deno.readTextFile("./certs/cert.pem"),
    //key: await Deno.readTextFile("./certs/key.pem"),
    port: 8000,
    hostname: "0.0.0.0",
  },
  plugins: [
    tailwind(),
  ],
  
});
