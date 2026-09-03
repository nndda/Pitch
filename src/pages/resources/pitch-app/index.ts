export default {

  title: "Pitch App",
  icon: "fa-solid fa-paint-roller",

  content: async () => (await import("./page.svelte")).default,

} as PageData;
