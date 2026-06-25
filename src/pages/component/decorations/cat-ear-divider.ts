import css from "./cat-ear-divider?css-component";

export default {
  css: css,

  name: "Cat Ear Divider",

  page: async () => (await import("./cat-ear-divider.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  input: [
    {
      name: "Color",
      var: "cat-ear-color",
      type: "color",
    },
    {
      name: "Size",
      var: "cat-ear-size",
      default: "4",
      defaultFormat: "em",
      type: "size",
    },
    {
      collapse: true,
    },
    {
      name: "Thickness",
      var: "cat-ear-thickness",
      default: "3",
      defaultFormat: "px",
      type: "size",
    },
    {
      name: "Spacing",
      var: "cat-ear-spacing",
      default: "3",
      defaultFormat: "em",
      type: "size",
    },
  ],

} as ComponentData;
