export default {

  title: "Getting Started",
  icon: "fa-solid fa-book-bookmark",

  content: async () => (await import("./page.svelte")).default,

} as PageData;
