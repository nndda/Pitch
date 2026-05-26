import css from "./label__tag?css-component";

export default {
  css: css,

  name: "Tag",
  nameDisplay: "Label — Tag",

  page: async () => (await import("./label__tag.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  sub: "Label",
  flavour: true,

} as ComponentData;
