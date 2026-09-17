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
  import { ComponentRef, ItchPreview } from "@elements";
</script>

<style lang="scss">
  :global .comp-cont {
    position: relative;
    margin: .35em;
    padding: 1em;
    padding-top: 3em;
    border-radius: 7px;
    background: var(--b);

    & > .preview {
      & > button {
        position: absolute;
        top: 1em;
        left: 1em;
        // opacity: .5;
      }
    }

    & a {
      color: var(--l) !important;

      &.custom-lb {
        color: var(--fg) !important;
      }
    }
  }
</style>

<div class="comp-cont {classes || ""}">
  <div class="preview">
    {#each compRefs as ref}
      <ComponentRef comp={ref}/>
    {/each}
  </div>

  <ItchPreview html={html}/>
</div>
