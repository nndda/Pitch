<script lang=ts>
  import { state, backToHome } from "../states/components.svelte";
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

  <section id="wrapper">
    {#if state.currentPage}
      <svelte:component this={state.currentPage} />
    {/if}
  </section>
</main>