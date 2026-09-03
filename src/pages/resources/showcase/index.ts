export default {

  title: "Showcase",
  icon: "fa-solid fa-star",

  content: async () => (await import("./page.svelte")).default,

} as PageData;
