import css from "./exclusives__raters-only?css-component";

export default {
  css: css,

  name: "Raters-Only",
  nameDisplay: "Exclusives — Raters-Only",

  page: async () => (await import("./exclusives__raters-only.svelte")).default,

  scopes: {
    only: "project",
  },
  scopeAMPincompatible: true,

  tags: [
    "experimental",
  ],

  sub: "Exclusives",

} as ComponentData;
