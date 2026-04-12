<script lang="ts">

  import { state, backToHome } from "../states/components.svelte";
  import { generateToC } from "./toc";

  let
    tocContent: HTMLUListElement
  , tocWrapper: HTMLElement
  ;

  $effect((): void => {
    generateToC(tocContent, state.currentId);
    tocWrapper.classList.toggle("collapsed", !uiState.state["toc-toggle"]);
  });

  import { initiateBooleanStorageAPI } from "../states/storage.svelte";

  const uiState = initiateBooleanStorageAPI("pitchv3-uistate");

</script>

<main id="viewer">
  <header>
    <button
      id="page-prev"
      class="icon-onlyb"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>

    <h1 class="page-heading">{state.currentId}</h1>

    <button
      id="page-prev"
      class="icon-onlyb"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>

    <!-- <div class="flex-space"></div> -->

    <div class="hr-v"></div>

    <div class="flex-space"></div>

    <input
      type="checkbox"
      class="toggle"
      id="toc-toggle"
      aria-label="Table of Content"

      checked={uiState.state["toc-toggle"] ?? true}

      onchange={(ev) => {
        uiState.update("toc-toggle", ev.currentTarget.checked);
      }}
    >
    <label class="button button-check custom-tip" for="toc-toggle">
      <i class="fa-solid fa-table-list"></i>

      <span class="custom-tip-content custom-left">
        Table of content
      </span>
    </label>
  </header>

  <!-- <hr> -->

  <div class="split">

    <section id="wrapper">
      {#if state.currentPage}
        <state.currentPage/>
      {/if}
    </section>

    <nav id="toc" bind:this={tocWrapper}>
      <div class="toc-inner">
        <h1>Table of content</h1>

        <hr>

        <h2>{state.currentId}</h2>

        <ul id="toc-content" bind:this={tocContent}>

        </ul>
      </div>
    </nav>

  </div>
</main>
