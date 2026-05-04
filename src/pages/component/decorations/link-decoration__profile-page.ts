import css from "./link-decoration__profile-page?css-component";

export default {
  css: css,

  name: "Profile Page",
  nameDisplay: "Link Decoration — Profile Page",

  page: async () => (await import("./link-decoration__profile-page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  notes: [
    `Icon provided by <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>. Licensed under CC BY 4.0`,
  ],

  sub: "Link Decoration",

} as ComponentData;
