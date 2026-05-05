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
      var: "accordion-open",
      default: "▼",
      type: "string",
    },
    {
      name: "Closed icon",
      var: "accordion-close",
      default: "►",
      type: "string",
    },
    {
      collapse: true,
    },
    // {
    //   heading: "Color",
    // },
    {
      name: "Text color",
      var: "accordion-text-col",
      default: "",
      type: "color",
    },
    {
      name: "Border color",
      var: "accordion-border-col",
      default: "",
      type: "color",
    },
  ],

  compatibleOnInputs: [
    "accordion-text-col",
    "accordion-border-col",
  ],

} as ComponentData;
