<script lang=ts>
  import { state, backToHome } from "../states/components.svelte";
</script>

<main id=viewer>
  <header>
    <button
      id=btn-home
      class=icon-only
      onclick={backToHome}
      aria-label=Home
    >
      <i class="fa-solid fa-house"></i>
    </button>
    <h1 class=page-heading>{state.currentId}</h1>
  </header>

  <section id=toolbar>
    <input type=radio>
    <input type=radio>
    <input type=radio>
    <input type=radio>
  </section>

  <hr>

  <section id=wrapper>
    {#if state.currentPage}
      <svelte:component this={state.currentPage} />
    {/if}
  </section>
</main>