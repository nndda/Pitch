// import css from "./binary-toggle?css-component";

export default {
  // css: css,

  name: "Binary Toggle",

  // page: async () => (await import("./binary-toggle.svelte")).default,

  scopes: {
    compatible: "project",
    partial: [
      "profile",
      "jam",
    ],
  },

  wip: true,

} as ComponentData;
