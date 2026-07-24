// import css from "./styles?css-component";

export default {
  // css: css,

  name: "Steps List",

  // page: async () => (await import("./page.svelte")).default,

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
