import css from "./label?css-component";

export default {
  css: css,

  name: "Label",

  page: async () => (await import("./label.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },

} as ComponentData;
