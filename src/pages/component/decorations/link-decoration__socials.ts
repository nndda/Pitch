// import css from "./link-decoration__socials?css-component";

export default {
  // css: css,

  name: "Socials",
  nameDisplay: "Link Decoration — Socials",

  // page: async () => (await import("./link-decoration__socials.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  sub: "Link Decoration",

  wip: true,

} as ComponentData;
