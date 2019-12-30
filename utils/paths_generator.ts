import SwaggerParser from "swagger-parser";
import { OpenAPIV2 } from "openapi-types";
import * as prettier from "prettier";

// read package.json to get the api url endpoint
const fs = require("fs");
const packageJson = JSON.parse(fs.readFileSync("./package.json"));
const tsSpecFilePaths = "./generated/definitions/server_paths.ts";
export const saveApiPaths = async () => {
  const document = await SwaggerParser.bundle(packageJson.api_beckend_specs);

  const basePath = (document as OpenAPIV2.Document).basePath;
  console.log(`retrieving API paths from ${packageJson.api_beckend_specs}:\n`);
  const paths = Object.keys(document.paths).map(p => {
    console.log(p);
    return p.replace("{", ":").replace("}", "");
  });

  const specCode = `
    /* tslint:disable:object-literal-sort-keys */
    // DO NOT EDIT
    // this file is autogenerated;
    // this file represents all availables API paths exposed by IO backend
  
    export const basePath = "${basePath}";
    export type SupportedMethod = "get" | "post" | "put" | "delete" | "update";
    export type IOApiPath = ${paths.map(p => `"${p}"`).join(" | ")};
    `;

  const fs = require("fs");
  if (tsSpecFilePaths) {
    await fs.writeFile(
      tsSpecFilePaths,
      prettier.format(specCode, {
        parser: "typescript"
      }),
      (_: any, __: any) => {
        console.log();
      }
    );
  }
};

saveApiPaths().then(() => console.log("\nAPI Paths saved!"));
