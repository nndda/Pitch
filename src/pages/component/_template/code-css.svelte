<script lang="ts">
  import { onMount } from "svelte";

  const
    {
      css
    }: {
      css: string,
    } = $props()
  , uid: string = $props.id()
  ;

  let
  // svelte-ignore non_reactive_update
    CSSEditor: HTMLElement
  // svelte-ignore non_reactive_update
  , CSSCopyButton: HTMLButtonElement
  ;

  onMount(() => {
    import("./code-editor").then(({ instatiateCSSViewer }) => {
      instatiateCSSViewer(
        css,

        CSSEditor,
        CSSCopyButton,
      );
    });
  });
</script>

<style lang="scss">
  @use "./code-editor.scss";
</style>

<div class="codes-container">

  <div class="codes-toolbar css">
    <span class="label">
      <i class="fa-brands fa-css"></i>
      CSS
    </span>

    <button
      class="custom-tip"
      aria-label="Copy CSS"
      bind:this={CSSCopyButton}
    >
      <i class="fa-solid fa-copy"></i>
      <span class="custom-tip-content custom-right">
        Copy CSS
      </span>
    </button>

    <div class="flex-space"></div>
  </div>

  <div class="code-editor" bind:this={CSSEditor}></div>
</div>
