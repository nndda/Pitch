import css from "./styles?css-component";

export default {
  css: css,

  name: "Timeline List",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  sub: "List",

  input: [
    {
      name: "Marker color",
      var: "tl-list-marker-col",
      default: "",
      type: "color",
    }
  ],

} as ComponentData;
