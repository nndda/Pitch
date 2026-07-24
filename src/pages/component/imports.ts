import { sortBy } from "lodash";
const rePathSlash = /[^/]+$/;

function getCompsManifest(
  imports: ComponentManifestImports,
): ComponentData[] {
  return sortBy(
    Object.entries(imports).map(([ src, mod ]) => {
        return {
          ...mod.default,
          src: src,
        };
      }),
      compData => compData.src.replace(rePathSlash, ""),
    )
    .map(
      ({ src, ...compData }) => compData,
    );
}

export default {
  Components:
    getCompsManifest( import.meta.glob("./components/**/*/index.ts", { eager: true, }) as ComponentManifestImports ),
  Decorations:
    getCompsManifest( import.meta.glob("./decorations/**/*/index.ts", { eager: true, }) as ComponentManifestImports ),
  Tweaks:
    getCompsManifest( import.meta.glob("./tweaks/**/*/index.ts", { eager: true, }) as ComponentManifestImports ),
} as PageEntry;
