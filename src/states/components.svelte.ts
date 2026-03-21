import {
  type Component,
} from "svelte";

interface States {
  currentId: "Pitch" | string,
  currentPage: Component | null
}

export const state = $state(<States>{
  currentId: "Pitch",
  currentPage: null,
});

export function backToHome(): void {
  state.currentId = "Pitch";
  state.currentPage = null;
}

