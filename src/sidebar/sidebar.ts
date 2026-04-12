
import type { Component } from "svelte";

export function getPages(
  imports: Record<string, Component>,
): {
  src: string,
  comp: Component
}[] {
  return Object.entries(imports).map((
    [
      src,
      mod,
    ]
  ) => ({
    src,
    comp: mod,
  }));
}

// TODO: find a way to not hardcode the version
// sometimes it unables to import package.json :/
// also this method below brings/import the whole content of package.json too
// import pkg from "../../package.json";
// export const pitchVer: string = pkg.version;
export const pitchVer: string = "3.0.0";
