import css from "./styles?css-component";

export default {
  css: css,

  name: "Fade Out Collection",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: "profile",
  },

  sub: "Profile Page"

} as ComponentData;
