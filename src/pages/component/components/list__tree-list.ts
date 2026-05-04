import css from "./list__tree-list?css-component";

export default {
  css: css,

  name: "Tree List",

  page: async () => (await import("./list__tree-list.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  sub: "List",

} as ComponentData;
