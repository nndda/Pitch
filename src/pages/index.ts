
export const Home: PageData = {
  title: "Home",
  icon: "fa-solid fa-house",
  content: async () => (await import("./home.svelte")).default,
};

export const Support: PageData = {
  title: "Support Me?",
  icon: "fa-solid fa-heart",
  content: async () => (await import("./support.svelte")).default,
};

export const Settings: PageData = {
  title: "Settings",
  icon: "fa-solid fa-gear",
  content: async () => (await import("./settings.svelte")).default,
};

// TODO:

export const AdvancedSearch: PageData = {
  title: "Advanced Search",
  icon: "fa-solid fa-magnifying-glass",
};
