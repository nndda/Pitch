// import css from "./list__steps-list?css-component";

export default {
  // css: css,

  name: "Steps List",

  // page: async () => (await import("./list__steps-list.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  sub: "List",

  wip: true,

} as ComponentData;
