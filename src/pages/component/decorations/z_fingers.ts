import css from "./z_fingers?css-component";

export default {
  css: css,

  name: "👉👈",

  page: async () => (await import("./z_fingers.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

} as ComponentData;
