import css from "./styles?css-component";

export default {
  css: css,

  name: "Collapsible",
  nameDisplay: "Collapsible User Tools",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: [
      "project",
      "profile",
    ],
  },

  sub: "User Tools"

} as ComponentData;
