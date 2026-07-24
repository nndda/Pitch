// import css from "./styles?css-component";

export default {
  // css: css,

  name: "Heading Flair",

  // page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

  wip: true,
} as ComponentData;
