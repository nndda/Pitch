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
  .comp-cont {
    position: relative;
    margin: .35em;
    padding: 1em;
    // padding-top: 3em;
    border-radius: 7px;
    background: var(--b);

    & a {
      color: var(--l) !important;

      &.custom-lb {
        color: var(--fg) !important;
      }
    }
  }
</style>

<div class="comp-cont {classes || ""}">
  {#each compRefs as ref}
    <ComponentRef comp={ref} withCheckbox={true}/>
  {/each}

  <ItchPreview html={html}/>
</div>
