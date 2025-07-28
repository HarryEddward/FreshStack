#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";
import { load } from "$std/dotenv/mod.ts";
import { init } from "@config/init.ts";

import "$std/dotenv/load.ts";

await init();

if (import.meta.main) {
  await load({ export: true });
  await dev(import.meta.url, "./main.ts", config);
}