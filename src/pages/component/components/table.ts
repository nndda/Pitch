import css from "./table?css-component";

export default {
  css: css,

  name: "Table",

  page: async () => (await import("./table.svelte")).default,

  scopes: {
    compatible: "project",
    none: [
      "profile",
      "jam",
    ],
  },

} as ComponentData;
