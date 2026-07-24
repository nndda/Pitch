// import css from "./styles?css-component";

export default {
  // css: css,

  name: "Binary Toggle",

  // page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  wip: true,

} as ComponentData;
