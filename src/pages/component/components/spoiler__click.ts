import css from "./spoiler__click?css-component";

export default {
  css: css,

  name: "On Click",
  nameDisplay: "Spoiler — On Click",

  page: async () => (await import("./spoiler__click.svelte")).default,

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
