import css from "./styles?css-component";

export default {
  css: css,

  name: "Image Comparison",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },

  tags: [
    "hacky",
  ],

} as ComponentData;
