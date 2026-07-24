import css from "./styles?css-component";

export default {
  css: css,

  name: "Raters-Only",
  nameDisplay: "Exclusives — Raters-Only",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: "project",
  },
  scopeAMPincompatible: true,

  tags: [
    "experimental",
  ],

  sub: "Exclusives",

} as ComponentData;
