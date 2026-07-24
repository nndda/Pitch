import css from "./styles?css-component";

export default {
  css: css,

  name: "Vote Icons",
  nameDisplay: "Comment Vote Icons",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: "project",
  },

  sub: "Comment Section",

  input: [
    {
      name: "Upvote icon URL",
      var: "upvote-icon-url",
      type: "url",
      default: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/solid/heart.svg",
    },
    {
      name: "Downvote icon URL",
      var: "downvote-icon-url",
      type: "url",
      default: "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs/solid/thumbs-down.svg",
    },
  ],

} as ComponentData;
