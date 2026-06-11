function getCompsManifest(
  imports: ComponentManifestImports,
): ComponentData[] {
  return Object.entries(imports).map((
    [
      _,
      mod,
    ]
  ) => mod.default);
}

export default {
  Components:
    getCompsManifest( import.meta.glob("./components/*.ts", { eager: true, }) as ComponentManifestImports ),
  Decorations:
    getCompsManifest( import.meta.glob("./decorations/*.ts", { eager: true, }) as ComponentManifestImports ),
  Tweaks:
    getCompsManifest( import.meta.glob("./tweaks/*.ts", { eager: true, }) as ComponentManifestImports ),
} as PageEntry;
