import {
  type Component,
} from "svelte";

import Home from "../pages/home.svelte";

interface States {
  currentId: "Pitch" | string,
  currentPage: Component | null
}

export const state = $state(<States>{
  currentId: "Home",
  currentPage: Home,
});

export function backToHome(): void {
  state.currentId = "Home";
  state.currentPage = Home;
}

export function switchPage(pageTitle: string, page: Component): () => void {
  return (): void => {
    state.currentId = pageTitle;
    state.currentPage = page;
  };
}
