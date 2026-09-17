const

  Home: PageData = {
    title: "Home",
    icon: "fa-solid fa-house",
    content: async () => (await import("./home.svelte")).default,
  }

, Support: PageData = {
    title: "Support Me?",
    icon: "fa-solid fa-heart",
    content: async () => (await import("./support.svelte")).default,
  }

, Settings: PageData = {
    title: "Settings",
    icon: "fa-solid fa-gear",
    content: async () => (await import("./settings.svelte")).default,
  }

;

// Categorized pages
// Resources
export { default as pagesResources } from "./resources";
// Spellbooks
export { default as pagesSpellbooks } from "./spellbooks";

// TODO:

export const AdvancedSearch: PageData = {
  title: "Advanced Search",
  icon: "fa-solid fa-magnifying-glass",
};

export default [
  Home,
  Support,
  Settings,
] as PageData[];
