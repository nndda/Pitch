<script lang="ts">
  import { compDataFlatLookup } from "@runtime";
  import { project } from "@db";

  const
    {
      comp,
      withCheckbox,
      asLink,
    }: {
      comp: string,
      withCheckbox?: true,
      asLink?: true,
    } = $props()

  , uid = $props.id()
  ;

  function lookup() {
    (
      compDataFlatLookup[comp].li.querySelector(`label input[name="page-view"]`
    ) as HTMLElement).click();
  }
</script>

<style lang="scss">
  @use "../styles/variables" as *;
  @use "sass:color";

  .group {
    display: inline-flex;
    align-items: center;
    gap: .15em;
    padding-bottom: .5em;
    margin-inline: .25em;;

    &:not(:hover) {
      opacity: .9;
    }

    & .fa-regular, & .fa-solid {
      font-size: 1.25em;
    }

    & > button {
      &:hover {
        text-decoration: underline 1px solid color.mix($text-col, transparent, 60%);
      }
    }
  }
</style>

<div class="group">
  {#if withCheckbox}
    {@const compData = compDataFlatLookup[comp]}

    {#if compData}
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
        <i class="fa-regular fa-plus-square checked-not"></i>
        <i class="fa-solid fa-square-check"></i>
        <span class="custom-tip-content">
          add component
        </span>
      </label>
    {/if}
  {/if}

  <button
    class:no-style={asLink}
    onclick={lookup}
  >
    {comp}
  </button>

</div>
