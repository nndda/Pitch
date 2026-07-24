import css from "./styles?css-component";

export default {
  css: css,

  name: "Toggle",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

  tags: [
    "experimental",
    "singular",
  ],

} as ComponentData;
