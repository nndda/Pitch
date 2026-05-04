import css from "./link-decoration__external?css-component";

export default {
  css: css,

  name: "External",
  nameDisplay: "Link Decoration — External",

  page: async () => (await import("./link-decoration__external.svelte")).default,

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
