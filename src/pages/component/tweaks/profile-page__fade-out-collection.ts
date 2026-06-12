import css from "./profile-page__fade-out-collection?css-component";

export default {
  css: css,

  name: "Fade Out Collection",

  page: async () => (await import("./profile-page__fade-out-collection.svelte")).default,

  scopes: {
    only: "profile",
  },

  sub: "Profile Page"

} as ComponentData;
