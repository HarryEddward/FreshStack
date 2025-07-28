import { program } from "commander";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { _controller } from "./boilerplate/api/_controller.ts";
import { _payload } from "./boilerplate/api/_payload.ts";
import { _response } from "./boilerplate/api/_response.ts";
import { _service } from "./boilerplate/api/_service.ts";
import { _utils } from "./boilerplate/api/_utils.ts";
import { _validation } from "./boilerplate/api/_validation.ts";
import { _types } from "./boilerplate/api/_types.ts";

import ejs from "npm:ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Options {
  componente: string;
  nombre: string;
  router_path?: string;
}

const availableFiles = {
  "_controller.ejs": _controller,
  "_payload.ejs": _payload,
  "_response.ejs": _response,
  "_service.ejs": _service,
  "_utils.ejs": _utils,
  "_validation.ejs": _validation,
  "_types.ejs": _types,
};

function generateFile(
  templateFile: string,
  data: { componentName: string; componentPathRouter: string },
  outputPath: string
): void {
  try {
    const renderedContent = ejs.render(templateFile, data);
    writeFileSync(outputPath, renderedContent, { encoding: "utf-8" });
  } catch (error) {
    console.error(`Error al generar ${outputPath}: ${(error as Error).message}`);
    process.exit(1);
  }
}

program
  .name("cafebuy_bp_fresh")
  .version("1.0.0")
  .description("Crear archivos boilerplate automáticamente en el directorio actual.")
  .requiredOption("-c, --componente <componente>", "Nombre del componente (obligatorio)")
  .requiredOption("-n, --nombre <nombre>", "Nombre del directorio base (obligatorio)")
  .option("-p, --router_path <path>", "Ruta relativa o absoluta del router (opcional)")
  .action((options: Options) => {
    const baseDir = join(process.cwd(), options.nombre);

    if (existsSync(baseDir)) {
      console.error(`Error: El directorio '${options.nombre}' ya existe.`);
      process.exit(1);
    }

    mkdirSync(baseDir, { recursive: true });
    console.log(options.router_path);

    const data = {
      componentName: options.componente,
      componentPathRouter: options.router_path || "./",
    };


    for (const [nameFile, templateFile] of Object.entries(availableFiles)) {
      const resultTemplateFile = templateFile;
      const outputPath = join(baseDir, nameFile.replace(".ejs", ".ts"));
      generateFile(resultTemplateFile, data, outputPath);
    }

    console.log(
      `🎉 Componente '${options.componente}' creado en '${baseDir}'`
    );
  });

program.parse(process.argv);