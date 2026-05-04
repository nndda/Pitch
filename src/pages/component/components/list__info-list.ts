import css from "./list__info-list?css-component";

export default {
  css: css,

  name: "Info List",

  page: async () => (await import("./list__info-list.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  sub: "List",

} as ComponentData;
