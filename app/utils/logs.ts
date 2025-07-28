const IS_PRODUCTION = Deno.env.get("ENV") === "production";

export function log(...args: unknown[]) {
  if (!IS_PRODUCTION) {
    console.log("[DEBUG]", ...args);
  }
}
