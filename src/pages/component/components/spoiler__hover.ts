import css from "./spoiler__hover?css-component";

export default {
  css: css,

  name: "On Hover",
  nameDisplay: "Spoiler — On Hover",

  page: async () => (await import("./spoiler__hover.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  sub: "Spoiler",

} as ComponentData;
