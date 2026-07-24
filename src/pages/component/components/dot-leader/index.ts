import css from "./styles?css-component";

export default {
  css: css,

  name: "Dot Leader",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

} as ComponentData;
