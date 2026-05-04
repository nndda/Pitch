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

} as ComponentData;
