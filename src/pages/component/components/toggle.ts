import css from "./toggle?css-component";

export default {
  css: css,

  name: "Toggle",

  page: async () => (await import("./toggle.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  tags: [
    "experimental",
    "singular",
  ],

  notes: [
    "Only one instance of the component per page.",
  ],

} as ComponentData;
