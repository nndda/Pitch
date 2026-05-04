import css from "./accordion?css-component";

export default {
  css: css,

  name: "Accordion",

  page: async () => (await import("./accordion.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  input: [
    {
      name: "Opened icon",
      var: "accrd-opn",
      default: "▼",
      type: "string",
    },
    {
      name: "Closed icon",
      var: "accrd-cls",
      default: "►",
      type: "string",
    },
  ],

} as ComponentData;
