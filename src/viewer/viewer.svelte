<script lang=ts>
  import { state, backToHome } from "../states/components.svelte";
</script>

<main>
  <header>
    <button onclick={backToHome}>Home</button>
    <h1>{state.currentId}</h1>
  </header>

  <section>
    
  </section>

  <section id=wrapper>
    {#if state.currentPage}
      <svelte:component this={state.currentPage} />
    {/if}
  </section>
</main>