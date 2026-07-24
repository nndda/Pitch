// import css from "./styles?css-component";

export default {
  // css: css,

  name: "Responsive",
  nameDisplay: "Responsive User Tools",

  // page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: [
      "project",
      "profile",
    ],
  },

  sub: "User Tools",
  wip: true,

} as ComponentData;
