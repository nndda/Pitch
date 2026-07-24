import css from "./styles?css-component";

export default {
  css: css,

  name: "Tooltip",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

} as ComponentData;
