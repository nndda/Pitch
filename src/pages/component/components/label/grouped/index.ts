import css from "./styles?css-component";

export default {
  css: css,

  name: "Grouped",
  nameDisplay: "Label — Grouped",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },

  sub: "Label",

} as ComponentData;
