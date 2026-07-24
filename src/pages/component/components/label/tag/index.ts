import css from "./styles?css-component";

export default {
  css: css,

  name: "Tag",
  nameDisplay: "Label — Tag",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },

  sub: "Label",
  flavour: true,

} as ComponentData;
