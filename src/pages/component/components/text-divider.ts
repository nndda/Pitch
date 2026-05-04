import css from "./text-divider?css-component";

export default {
  css: css,

  name: "Text Divider",

  page: async () => (await import("./text-divider.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

} as ComponentData;
