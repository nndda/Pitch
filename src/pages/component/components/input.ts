import css from "./input?css-component";

export default {
  css: css,

  name: "Input",

  page: async () => (await import("./input.svelte")).default,

  scopes: {
    compatible: "project",
    none: [
      "profile",
      "jam",
    ],
  },

} as ComponentData;
