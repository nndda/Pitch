import css from "./code-block?css-component";

export default {
  css: css,

  name: "Code Block",

  page: async () => (await import("./code-block.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: [
      "profile",
    ],
  },
  scopeAMPincompatible: true,

  tags: [
    "experimental",
  ],

} as ComponentData;
