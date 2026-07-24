import css from "./styles?css-component";

export default {
  css: css,

  name: "Author Badge",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    only: "profile",
  },

  input: [
    {
      name: "itch.io username",
      var: "AUTHOR_BADGE_USER",
      type: "string",
      default: "",
      hardcoded: true,
    },
    {
      name: "Badge title",
      var: "AUTHOR_BADGE_TITLE",
      type: "string",
      default: "",
      hardcoded: true,
    },
  ],

  // inputDynamic: {
  //   items: [
  //     {
  //       name: "itch.io username",
  //       var: "AUTHOR_BADGE_USER",
  //       type: "string",
  //       default: "",
  //       hardcoded: true,
  //     },
  //     {
  //       name: "Badge title",
  //       var: "AUTHOR_BADGE_TITLE",
  //       type: "string",
  //       default: "",
  //       hardcoded: true,
  //     },
  //     {
  //       name: "Badge title #2 (optional)",
  //       var: "AUTHOR_BADGE_TITLE_2",
  //       type: "string",
  //       default: "",
  //       hardcoded: true,
  //     },
  //   ],

  //   cssInjectPre: (inputs) => {
  //   },
  // },

  sub: "Comment Section",

  wip: true,

} as ComponentData;
