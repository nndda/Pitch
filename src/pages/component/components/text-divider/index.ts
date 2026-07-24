import css from "./styles?css-component";

export default {
  css: css,

  name: "Text Divider",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

} as ComponentData;
