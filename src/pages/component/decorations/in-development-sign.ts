import css from "./in-development-sign?css-component";

export default {
  css: css,

  name: "In Development Sign",

  page: async () => (await import("./in-development-sign.svelte")).default,

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
