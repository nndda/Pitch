import css from "./styles?css-component";

export default {
  css: css,

  name: "Input",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    none: [
      "profile",
      "jam",
    ],
  },

} as ComponentData;
