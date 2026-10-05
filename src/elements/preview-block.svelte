<script lang="ts">
  import { ComponentRef, ItchPreview } from "@elements";
  import { compDataFlatLookup } from "@runtime";
  import { tagsData } from "@pitch/meta";

  const {
      html,
      compRef,
      classes,
    }: {
      html: string,
      compRef: string,
      classes?: string,
    }
    = $props()

  // svelte-ignore state_referenced_locally
  , compData = compDataFlatLookup[compRef]
  ;

  function getSearchables(manifest: ComponentData): SearchKeys {
    return {
      name: manifest.nameDisplay ?? manifest.name,
      keywords: [
        manifest.tags?.join(" "),
      ].join(" "),
    }
  }
</script>

<!-- svelte-ignore css_unused_selector -->
<style lang="scss">
  @use "../styles/variables" as *;
  @use "sass:color";

  .comp-cont {
    position: relative;
    margin: .35em;
    // padding: 1em;
    // padding-top: 3em;
    border-radius: 7px;
    background: var(--b);
    // border:1px solid $border-col;

    & a {
      color: var(--l) !important;

      &.custom-lb {
        color: var(--fg) !important;
      }
    }
//
    // &:has(> .ref-cont input:checked) {
      // box-shadow: 0 0 .5em color.mix($background-dark, $accent, 85%);
      // outline:1px solid color.mix($background-dark, $accent, 55%);
    // }
  }

  .html-cont {
    padding: .5em 1em;
  }

  :global .ref-cont {
    display: flex;
    align-items: center;
    padding: .75em 1em .15em;
    background: color.mix($background-dark, $background-light, 78%);
    border-bottom:1px solid $border-col;

    &:has(input:checked) {
      background: color.mix($background-dark, $accent, 95%);
      border-bottom:1px solid color.mix($background-dark, $accent, 55%);

      & label {
        color: $accent !important;
      }
    }

    & > .icon {
      padding-bottom: .5em;

      & .custom-tip-content {
        text-transform: capitalize;
      }
    }
  }
</style>

<div
  class="comp-cont {classes || ""}"
  class:is-hacky={compData.manifest.tags?.includes("hacky")}
  class:is-experimental={compData.manifest.tags?.includes("experimental")}
>
  <div class="ref-cont">
    <ComponentRef comp={compRef} withCheckbox={true} asLink={true}/>

    <span class="flex-space"></span>

    {#each compData.manifest.tags as tag}
      {#if tag !== "singular"}

        <span class="icon custom-tip">
          <i
            class={tagsData[tag].icon}
            style="color: {tagsData[tag].color};"
          >
          </i>

          <span class="custom-tip-content">
            {tag}
          </span>
        </span>

      {/if}
    {/each}

  </div>

  <div
    class="html-cont"
    style={compRef === "Speed Dial" ? `min-height: 200px;` : null}
  >
    <ItchPreview html={html}/>
  </div>

  <div
    class="comp-cat-searchable-data hidden"
    data-search-key={JSON.stringify(getSearchables(compData.manifest))}
  ></div>
</div>
