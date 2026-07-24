import css from "./styles?css-component";

export default {
  css: css,

  name: "Socials",
  nameDisplay: "Link Decoration — Socials",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  sub: "Link Decoration",

} as ComponentData;
