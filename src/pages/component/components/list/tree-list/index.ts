import css from "./styles?css-component";

export default {
  css: css,

  name: "Tree List",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  sub: "List",

} as ComponentData;
