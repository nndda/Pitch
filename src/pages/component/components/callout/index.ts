import css from "./styles?css-component";

export default {
  css: css,

  name: "Callout",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  input: [
    {
      name: "Color",
      var: "callout-col",
      default: "",
      type: "color",
    },
    {
      collapse: true,
    },
    {
      name: "Border",
      var: "callout-border-col",
      default: "",
      type: "color",
    },
    {
      name: "Background",
      var: "callout-bg-col",
      default: "",
      type: "color",
    },
  ],

  compatibleOnInputs: [
    "callout-col",
    "callout-border-col",
    "callout-bg-col",
  ]

} as ComponentData;
