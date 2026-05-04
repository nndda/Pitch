import css from "./drop-cap?css-component";

export default {
  css: css,

  name: "Drop Cap",

  page: async () => (await import("./drop-cap.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "profile",
      "jam",
    ],
  },

} as ComponentData;
