import css from "./label__tag?css-component";

export default {
  css: css,

  name: "Tag",
  nameDisplay: "Label — Tag",

  page: async () => (await import("./label__tag.svelte")).default,

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
