// import css from "./styles?css-component";

export default {
  // css: css,

  name: "Link Moderation",
  nameDisplay: "Comment Link Moderation",

  // page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: "project",
  },

  sub: "Comment Section",

  wip: true,

} as ComponentData;
