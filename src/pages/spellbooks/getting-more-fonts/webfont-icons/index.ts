export default {

  title: "Webfont Icons",
  icon: "fa-solid fa-icons",

  content: async () => (await import("./page.svelte")).default,

} as PageData;
