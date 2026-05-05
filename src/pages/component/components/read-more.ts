import css from "./read-more?css-component";

export default {
  css: css,

  name: "Read More",

  page: async () => (await import("./read-more.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  tags: [
    "hacky",
  ],

  input: [
    {
      name: "Expanded text",
      var: "read-more-open",
      default: "Read more...",
      type: "string",
    },
    {
      name: "Collapsed text",
      var: "read-more-close",
      default: "Read less...",
      type: "string",
    },
    {
      name: "Color",
      var: "read-more-color",
      default: "",
      type: "color",
    },
  ],
  compatibleOnInputs: [
    "read-more-color",
  ],

} as ComponentData;
