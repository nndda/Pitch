<script lang="ts">
  import { catMetadata } from "@pitch/meta";

  const
    {
      cat,
      children,
    }: {
      cat: ComponentCategory,
      children: any,
    } = $props()
  ;
</script>

<style lang="scss">
  @use "../styles/variables" as *;

  .preview-grid {
    padding-block: 1em;
    display: grid;
    grid-template-columns: repeat(4, 25%);
  }

  .cat-heading {
    display: flex;
    align-items: center;
    gap: .5em;

    & > span, > i {
      color: $accent;
    }

    & > small {
      font-weight: 300;
      opacity: .6;
    }
  }
</style>

<h2 class="cat-heading">
  <i class={catMetadata[cat].icon}></i>
  <span>{cat}</span>
  <small>{catMetadata[cat].desc}</small>
</h2>

<div class="preview-grid-wrapper">
  <div class="preview-grid">

    {@render children()}

  </div>
</div>
