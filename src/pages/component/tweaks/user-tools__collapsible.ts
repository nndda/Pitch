import css from "./user-tools__collapsible?css-component";

export default {
  css: css,

  name: "Collapsible",
  nameDisplay: "Collapsible User Tools",

  page: async () => (await import("./user-tools__collapsible.svelte")).default,

  scopes: {
    only: [
      "project",
      "profile",
    ],
  },

  sub: "User Tools"

} as ComponentData;
