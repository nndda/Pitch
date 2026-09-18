<script lang="ts">
  import { compDataFlatLookup } from "@runtime";
  import { project } from "@db";

  const
    {
      comp,
      withCheckbox,
    }: {
      comp: string,
      withCheckbox?: true,
    } = $props()

  , uid = $props.id()
  ;
</script>

<style lang="scss">
  .group {
    display: inline-flex;
    align-items: center;
    gap: .25em;
    padding-bottom: .5em;;

    &:not(:hover) {
      opacity: .9;
    }

    & .fa-regular, & .fa-solid {
      font-size: 1.25em;
    }
  }
</style>

<div class="group">
  {#if withCheckbox}
    {@const compData = compDataFlatLookup[comp]}

    <label
      class="checkbox custom-tip"
      for="comp-ref-{uid}"
    >
      <input
        type="checkbox"
        id="comp-ref-{uid}"

        onchange={async ev => {
          await compData.api?.toggleInclude(ev.currentTarget.checked);
        }}

        checked={
          $project?.components[compData.id.cat][compData.id.comp]
        }
      >
      <i class="fa-regular fa-plus checked-not"></i>
      <i class="fa-solid fa-square-check"></i>
      <span class="custom-tip-content">
        add component
      </span>
    </label>
  {/if}

  <button
    onclick={() => {
      (
        compDataFlatLookup[comp].li.querySelector(`label input[name="page-view"]`
      ) as HTMLElement).click();
    }}
  >
    { comp }
  </button>
</div>
