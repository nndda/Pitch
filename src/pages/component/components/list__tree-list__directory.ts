import css from "./list__tree-list__directory?css-component";

export default {
  css: css,

  name: "Directory",
  nameDisplay: "Tree List — Directory",

  page: async () => (await import("./list__tree-list__directory.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },
  compatibleOnInputs: [
    "tree-list-dir-col",
  ],

  sub: "Tree List",

  input: [
    {
      name: "Directory color",
      var: "tree-list-dir-col",
      default: "",
      type: "color",
    },
  ],

} as ComponentData;
