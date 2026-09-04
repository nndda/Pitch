import WebfontIcons from "./webfont-icons";

export default {

  title: "Getting More Fonts",
  icon: "fa-solid fa-font",

  content: async () => (await import("./page.svelte")).default,

  subPages: [
    WebfontIcons,
  ],

} as PageData;
