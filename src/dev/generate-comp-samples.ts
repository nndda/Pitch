import { basename, dirname, join, resolve } from "path";
import { writeFileSync, readdirSync, existsSync, statSync } from "fs";
import fg from "fast-glob";

fg.globSync(resolve(resolve(import.meta.dirname, "../../"), "./src/pages/component/**/*/page.docs.svelte")).forEach(generateSampleBarrelExport);

export function generateSampleBarrelExport(pagePath: string) {
  const examplesPath = join(dirname(pagePath), "examples");

  if (!existsSync(examplesPath)) {
    return;
  }
  if (!statSync(examplesPath).isDirectory()) {
    return;
  }

  console.log("Generating samples for: ", examplesPath);

  const
    importsStr: string[] = []
  , exportStr: string[] = []
  ;

  for (const file of readdirSync(examplesPath)) {
    if (file.endsWith(".svelte")) {
      const
        sample = basename(file)
      , sampleSlug = sample.replaceAll(/(-|\.|\+)/g, "_")
      ;

      importsStr.push(`import ${sampleSlug} from "./${sample}?css-sample";`);
      exportStr.push(`"${basename(file, ".svelte").replaceAll(/(-|\.|\+)/g, "_")}": ${sampleSlug},`);
    }
  }

  writeFileSync(
    join(examplesPath, "index.ts"),
    `
      ${importsStr.join("")}
      export default {${exportStr.join("")}};
    `,
    "utf8",
  );
}
