import css from "./dot-leader?css-component";

export default {
  css: css,

  name: "Dot Leader",

  page: async () => (await import("./dot-leader.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

} as ComponentData;
