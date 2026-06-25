import css from "./comment-section__vote-icon?css-component";

export default {
  css: css,

  name: "Vote Icons",
  nameDisplay: "Comment Vote Icons",

  page: async () => (await import("./comment-section__vote-icon.svelte")).default,

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
