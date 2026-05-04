import css from "./tooltip?css-component";

export default {
  css: css,

  name: "Tooltip",

  page: async () => (await import("./tooltip.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

} as ComponentData;
