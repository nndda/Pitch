<script lang="ts">

  import { state, backToHome } from "../states/components.svelte";
  import { generateToC } from "./toc";

  let tocContent: HTMLUListElement;

  $effect((): void => {
    generateToC(tocContent, state.currentId);
  });

</script>

<main id="viewer">
  <header>
<!--     <button
      id=btn-home
      class=icon-only
      onclick={backToHome}
      aria-label=Home
    >
      <i class="fa-solid fa-house"></i>
    </button> -->
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

    <button
      id="fave-toggle"
      class="icon-onlyb"
      aria-label="Favourite"
    >
      <i class="fa-solid fa-star"></i>
    </button>

    <div class="flex-space"></div>

    <button
      id="toc-toggle"
      class="icon-onlyb"
      aria-label="Table of Content"
    >
      <i class="fa-solid fa-table-list"></i>
    </button>
  </header>
<!-- 
  <section id=toolbar>
    <input type=radio>
    <input type=radio>
    <input type=radio>
    <input type=radio>
  </section>
 -->
  <!-- <hr> -->

  <div class="split">

    <section id="wrapper">
      {#if state.currentPage}
        <svelte:component this={state.currentPage} />
      {/if}
    </section>

    <nav id="toc">

      <!--
      <button aria-label="Collapes table of content" id="toc-collapse">
        <i class="fa-solid fa-caret-right"></i>
      </button>
      -->

      <h1>Table of content</h1>

      <hr>

      <h2>{state.currentId}</h2>

      <ul id="toc-content" bind:this={tocContent}>

      </ul>

    </nav>

  </div>
</main>