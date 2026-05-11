<script lang="ts">
  import { onMount } from "svelte";

  const
    { html }: { html: string } = $props()
  , uid: string = $props.id()
  ;

  let
    HTMLView: HTMLElement
  , HTMLEditor: HTMLElement
  , HTMLEditorToggle: HTMLInputElement
  , HTMLEditorResetButton: HTMLButtonElement
  , HTMLCopyButton: HTMLButtonElement
  ;

  onMount(() => {
    import("./code-html").then(({ instatiateEditor }) => {
      instatiateEditor(
        html,
        HTMLView,
        HTMLEditor,
        HTMLEditorToggle,
        HTMLEditorResetButton,
        HTMLCopyButton,
      );
    });
  });
</script>

<style lang="scss">
  @use "./code-html.scss";
</style>

<div class="codes-container">
  <div class="html-view" bind:this={HTMLView}></div>

  <div class="codes-toolbar">

    <input
      type="checkbox"
      id="html-edit-{uid}"

      bind:this={HTMLEditorToggle}
    >

    <label
      class="button button-check custom-tip"
      for="html-edit-{uid}"
      aria-label="Edit HTML"
    >
      <i class="fa-solid fa-code"></i>

      <span class="custom-tip-content">
        Edit HTML
      </span>
    </label>

    <button
      class="custom-tip"
      aria-label="Copy HTML"
      bind:this={HTMLCopyButton}
    >
      <i class="fa-solid fa-copy"></i>
      <span class="custom-tip-content custom-right">
        Copy HTML
      </span>
    </button>

    <div class="flex-space"></div>

    <button
      class="icon is-modified button-reset"
      aria-label="Reset HTML"
      disabled

      bind:this={HTMLEditorResetButton}
    >
      <i class="fa-solid fa-arrow-rotate-left"></i>
    </button>

  </div>

  <div class="html-editor" bind:this={HTMLEditor}></div>
</div>
