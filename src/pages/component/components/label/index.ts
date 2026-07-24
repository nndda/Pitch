import css from "./styles?css-component";

export default {
  css: css,

  name: "Label",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },

} as ComponentData;
