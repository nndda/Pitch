import css from "./styles?css-component";

export default {
  css: css,

  name: "On Click",
  nameDisplay: "Spoiler — On Click",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },
  scopeAMPincompatible: true,

  tags: [
    "hacky",
  ],

  sub: "Spoiler",

} as ComponentData;
