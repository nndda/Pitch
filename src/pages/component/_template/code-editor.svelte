<script lang="ts">
  import { onMount } from "svelte";

  const
    {
      html,
      css = "",
      cssOverrides = "",
    }: {
      html: string,
      css?: string,
      cssOverrides?: string,
    } = $props()
  , uid: string = $props.id()
  ;

  let
    HTMLView: HTMLElement
  , HTMLEditor: HTMLElement
  , HTMLEditorToggle: HTMLInputElement
  , HTMLEditorResetButton: HTMLButtonElement
  , HTMLCopyButton: HTMLButtonElement

  // svelte-ignore non_reactive_update
  , CSSEditor: HTMLElement
  // svelte-ignore non_reactive_update
  , CSSEditorResetButton: HTMLButtonElement
  // svelte-ignore non_reactive_update
  , CSSCopyButton: HTMLButtonElement
  ;

  onMount(() => {
    import("./code-editor").then(({ instatiateEditor }) => {
      instatiateEditor(
        html,
        HTMLView,
        HTMLEditor,
        HTMLEditorToggle,
        HTMLEditorResetButton,
        HTMLCopyButton,

        css,
        cssOverrides,

        CSSEditor,
        CSSEditorResetButton,
        CSSCopyButton,
      );
    });
  });
</script>

<style lang="scss">
  @use "./code-editor.scss";
</style>

<div class="codes-container">
  <div class="html-view" bind:this={HTMLView}></div>

  <div class="codes-toolbar main">

    <input
      type="checkbox"
      class="code-edit-toggle"
      id="code-edit-{uid}"

      bind:this={HTMLEditorToggle}
    >

    <label
      class="button button-check custom-tip"
      for="code-edit-{uid}"
      aria-label="Edit HTML & CSS"
    >
      <i class="fa-solid fa-code"></i>

      <span class="custom-tip-content">
        Edit HTML & CSS
      </span>
    </label>

  </div>

  <div class="codes-toolbar html">
    <span class="label">
      <i class="fa-brands fa-html5"></i>
      HTML
    </span>

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
      class="icon is-modified button-reset custom-tip"
      aria-label="Reset HTML"
      disabled

      bind:this={HTMLEditorResetButton}
    >
      <i class="fa-solid fa-arrow-rotate-left"></i>
      <span class="custom-tip-content custom-left">
        Reset HTML
      </span>
    </button>

  </div>
  <div class="code-editor" bind:this={HTMLEditor}></div>

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

    <button
      class="icon is-modified button-reset"
      aria-label="Reset CSS"
      disabled

      bind:this={CSSEditorResetButton}
    >
      <i class="fa-solid fa-arrow-rotate-left"></i>
    </button>
  </div>
  <div class="code-editor" bind:this={CSSEditor}></div>
</div>
