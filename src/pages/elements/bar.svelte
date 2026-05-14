<script lang="ts">
  import { initiateStorageFlag } from "../../states/storage.svelte";

  const
    {
      name,
      type = "",
      icon = undefined,
      children,
    } = $props()
	// svelte-ignore state_referenced_locally
  , flag = initiateStorageFlag<boolean>("bar-" + name, false, true)
  ;

</script>

<style lang="scss">
  @use "../../styles/variables" as *;
  @use "sass:color";

  .cta-banner {
    display: flex;
    align-items: center;
    gap: 1em;
    padding: .35em 1em;
    /* color: $background-dark; */

    background: color.mix($background, $accent, 80%);
    border: 1px solid color.mix($background, $accent, 20%);

    &.warning {
      background: color.mix($background, #eca20e, 80%);
      border: 1px solid color.mix($background, #eca20e, 20%);
    }
    border-radius: 6px;

    & > p {
      margin: 0;
      flex-grow: 1;
    }
  }
</style>

{#if !flag.get()}
  <div class="cta-banner {type}">

    <b>
      {#if icon}
        <i class={icon}></i>
      {:else}
        {#if type === "warning"}
          <i class="fa-solid fa-warning"></i>
        {/if}
      {/if}

      {name}
    </b>

    <p>
      {@render children()}
    </p>

    <button
      class="icon-only custom-tip"
      aria-label="Dismiss"
      onclick={ev => {
        flag.set(true);
        ev.currentTarget.parentElement!.remove();
      }}
    >
      <i class="fa-solid fa-xmark"></i>
      <span class="custom-tip-content custom-left">
        Dismiss
      </span>
    </button>

  </div>
{/if}
