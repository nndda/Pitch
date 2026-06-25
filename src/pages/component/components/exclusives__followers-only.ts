import css from "./exclusives__followers-only?css-component";

export default {
  css: css,

  name: "Followers-Only",
  nameDisplay: "Exclusives — Followers-Only",

  page: async () => (await import("./exclusives__followers-only.svelte")).default,

  scopes: {
    only: "project",
  },
  scopeAMPincompatible: true,

  tags: [
    "experimental",
  ],

  sub: "Exclusives",

} as ComponentData;
