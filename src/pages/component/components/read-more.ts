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
      name: "Collapsed text",
      var: "read-more-cls",
      default: "Read more...",
      type: "string",
    },
    {
      name: "Expanded text",
      var: "read-more-opn",
      default: "Read less...",
      type: "string",
    },
  ],

} as ComponentData;
