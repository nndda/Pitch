
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
