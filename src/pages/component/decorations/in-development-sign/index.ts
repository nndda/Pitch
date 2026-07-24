import css from "./styles?css-component";

export default {
  css: css,

  name: "In Development Sign",

  page: async () => (await import("./page.svelte")).default,

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
      var: "indev-col",
      default: "",
      type: "color",
    },
    {
      name: "Background",
      var: "indev-bg",
      default: "",
      type: "color",
    },
  ],

} as ComponentData;
