<script lang="ts">
  import {
    onMount,
  } from "svelte";

  import {
    state,
  } from "../states/components.svelte";
  import {
    initiateStorageAPI,
  } from "../states/storage.svelte";
  import {
    generateToC,
  } from "./toc";

  let
    tocContent: HTMLUListElement
  , tocWrapper: HTMLElement
  ;

  const
    uiState = initiateStorageAPI<boolean>("uistate")
  ;

  $effect(() => {
    generateToC(tocContent, state.currentId);
  });

  onMount(() => {
    const
      initialToCState = uiState.state["toc-collapsed"] ?? true
    ;

    (document.getElementById("toc-toggle") as HTMLInputElement).checked = !initialToCState;
    tocWrapper.classList.toggle(
      "collapsed",
      initialToCState,
    );
  });
</script>

<main id="viewer">
  <header>
    <!-- <button
      id="page-prev"
      class="icon-onlyb"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button> -->

    <h1 class="page-heading">{state.currentId}</h1>

    <!-- <button
      id="page-prev"
      class="icon-onlyb"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button> -->

    <!-- <div class="flex-space"></div> -->

    <!-- <div class="hr-v"></div> -->

    <div class="flex-space"></div>

    <input
      type="checkbox"
      class="toggle"
      id="toc-toggle"
      aria-label="Table of Content"


      onchange={ev => {
        uiState.update("toc-collapsed", !ev.currentTarget.checked);
        tocWrapper.classList.toggle("collapsed", uiState.state["toc-collapsed"]);
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
        {#if state.currentData}
          <state.currentPage data={state.currentData}/>
        {:else}
          <state.currentPage/>
        {/if}
      {/if}
    </section>

    <nav
      id="toc"
      bind:this={tocWrapper}
    >
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
