import css from "./code-block?css-component";

export default {
  css: css,

  name: "Code Block",

  page: async () => (await import("./code-block.svelte")).default,

  scopes: {
    compatible: "project",
    none: [
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

  tags: [
    "experimental",
  ],

} as ComponentData;
