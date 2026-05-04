import css from "./list__timeline-list?css-component";

export default {
  css: css,

  name: "Timeline List",

  page: async () => (await import("./list__timeline-list.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  sub: "List",

} as ComponentData;
