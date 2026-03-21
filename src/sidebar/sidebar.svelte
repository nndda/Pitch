<script lang=ts>
  import {
    type Component,
  } from "svelte";

  import {
    getPages,
  } from "./sidebar";

  import {
    state,
  } from "../states/components.svelte";

  const pages: [
    string,
    {
      src: string,
      comp: Component
    }[],
  ][] = Object.entries(
    {
      Components: getPages( import.meta.glob("/pages/component/components/*.svelte", { eager: true, }) as Record<string, Component> ),
    },
  );
</script>

<nav>
  {#each pages as [cat, compsData]}
    <h2>{cat}</h2>
    <ul>
      {#each compsData as {src, comp}}
        <li>
          <input type=checkbox id={comp.data.name}>

          <label for={comp.data.name}>
          </label>

          <button onclick={() => {
            state.currentId = comp.data.name;
            state.currentPage = comp.default;
          }}>
            {comp.data.name}
          </button>
        </li>

        <!-- debug/test -->
        <!-- <svelte:component this={comp.default} /> -->
      {/each}
    </ul>
  {/each}
</nav>