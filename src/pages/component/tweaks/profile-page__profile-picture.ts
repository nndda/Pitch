import css from "./profile-page__profile-picture?css-component";

export default {
  css: css,

  name: "Profile Picture",

  page: async () => (await import("./profile-page__profile-picture.svelte")).default,

  scopes: {
    only: "profile",
  },

  input: [
    {
      name: "Profile Picture URL",
      var: "pfp-url",
      default: "https://cdn.jsdelivr.net/gh/nndda/itchio-profile/assets/profile.webp",
      type: "url",
    },
  ],

  sub: "Profile Page"

} as ComponentData;
