<script lang="ts">
  const { inputs }: { inputs: string[] } = $props();
</script>

<p>
  You can make this component fully compatible on all pages, by setting the following customization manually:
</p>

<ul>
  {#each inputs as input}
    <li>
      <q>{input}</q>
    </li>
  {/each}
</ul>
