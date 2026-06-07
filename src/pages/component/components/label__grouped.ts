import css from "./label__grouped?css-component";

export default {
  css: css,

  name: "Grouped",
  nameDisplay: "Label — Grouped",

  page: async () => (await import("./label__grouped.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },

  sub: "Label",

} as ComponentData;
