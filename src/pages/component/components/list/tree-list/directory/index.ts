import css from "./styles?css-component";

export default {
  css: css,

  name: "Directory",
  nameDisplay: "Tree List — Directory",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },
  compatibleOnInputs: [
    "tree-list-dir-col",
  ],

  sub: "Tree List",
  flavour: true,

  input: [
    {
      name: "Directory color",
      var: "tree-list-dir-col",
      default: "",
      type: "color",
    },
  ],

} as ComponentData;
