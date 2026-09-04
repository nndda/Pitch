export default {

  title: "Redirect AMP Devlogs",
  icon: "fa-solid fa-diamond-turn-right",

  content: async () => (await import("./page.svelte")).default,

} as PageData;
