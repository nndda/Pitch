<script lang="ts">
  const { comp }: { comp: string } = $props();
</script>

<button
  onclick={() => {
    (
      document.querySelector(
        `#sidebar [id^="comp-list-"] .comp-item label[data-comp-name="${comp}"]`
      ) as HTMLLabelElement
    ).click();
  }}
>
  {comp}
</button>
