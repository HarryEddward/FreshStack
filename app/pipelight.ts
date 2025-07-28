// pipelight.ts
import {
  Config,
  Pipeline,
  pipeline,
  step,
} from "https://deno.land/x/pipelight/mod.ts"; // <-- Can not import from deno.land

// define a pipeline
const myPipe = pipeline("deploy", () => [
  // define steps and add your bash commands
  step("build", () => ["ls"]),
]);

const config: Config = {
  pipelines: [myPipe],
};

export default config;
