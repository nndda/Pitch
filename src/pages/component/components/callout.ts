import css from "./callout?css-component";

export default {
  css: css,

  name: "Callout",

  page: async () => (await import("./callout.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

} as ComponentData;
