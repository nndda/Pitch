<script lang="ts">
  const {
      html,
      compRefs,
      classes = "",
    }: {
      html: string,
      compRefs: string[],
      classes?: string,
    }
    = $props()
  ;
  import { ComponentRef, ItchPreview } from "../component/_template/components";
</script>

<div class="comp-cont {classes || ""}">
  <div class="preview">
    {#each compRefs as ref}
      <ComponentRef comp={ref}/>
    {/each}
  </div>

  <ItchPreview html={html}/>
</div>
