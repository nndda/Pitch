import css from "./code-block?css-component";

export default {
  css: css,

  name: "Image Comparison",

  page: async () => (await import("./image-comparison.svelte")).default,

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
