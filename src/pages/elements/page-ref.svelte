<script lang="ts">
  import { onMount } from "svelte";

  const {
    name,
    label = undefined,
  } = $props();

  let
    iconClass = $state("")
  ;

  onMount(() => {
    iconClass = document.querySelector(
      `#sidebar .comp-item i[data-page-icon="${name}"]`
    )?.getAttribute("class") ?? "";
  });
</script>

<button
  onclick={() => {
    (
      document.querySelector(
        `#sidebar .comp-item label[data-page-name="${name}"]`
      ) as HTMLLabelElement
    ).click();
  }}
>
  {#if label}
    {label}
  {:else}
    <i class="icon {iconClass}"></i>
    {name}
  {/if}
</button>
