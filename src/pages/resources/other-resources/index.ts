export default {

  title: "Other Resources",
  icon: "fa-solid fa-box-open",

  content: async () => (await import("./page.svelte")).default,

} as PageData;
