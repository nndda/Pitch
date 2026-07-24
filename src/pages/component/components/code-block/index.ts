import css from "./styles?css-component";

export default {
  css: css,

  name: "Code Block",

  page: async () => (await import("./page.svelte")).default,

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
