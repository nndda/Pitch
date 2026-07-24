import css from "./styles?css-component";

export default {
  css: css,

  name: "On Hover",
  nameDisplay: "Spoiler — On Hover",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

  sub: "Spoiler",

} as ComponentData;
