<script lang=ts>

  import { onMount } from "svelte";

  import {
    instatiateEditor,
    updateEditor,
    // sanitizeHTML,
    initializeHTML,

    view,
  } from "./code-html";

  const
    { html } = $props()
  , uid: string = $props.id()

  // svelte-ignore state_referenced_locally
  , htmlInitStr: string = initializeHTML(html)
  ;

  let 
    htmlStr: string = htmlInitStr

  , HTMLView: HTMLElement
  , HTMLEditor: HTMLElement
  , HTMLEditorToggle: HTMLInputElement
  , HTMLEditorResetButton: HTMLButtonElement
  ;

  onMount((): void => {
    // TODO: maybe use shadow DOM instead?
    HTMLView.innerHTML = htmlStr;
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

      onchange={(): void => instatiateEditor(
        htmlStr,
        HTMLView,
        HTMLEditor,
        HTMLEditorToggle,
        HTMLEditorResetButton,
      )}

      bind:this={HTMLEditorToggle}
    >
    <label class="button button-check" for="html-edit-{uid}" aria-label="Edit HTML">
      <i class="fa-solid fa-code"></i>
    </label>

    <button aria-label="Copy HTML">
      <i class="fa-solid fa-copy"></i>
    </button>

    <div class="flex-space"></div>

    <button
      class="icon is-modified button-reset"
      aria-label="Reset HTML"

      onclick={(): void => {
        updateEditor(htmlInitStr, HTMLView);
        HTMLEditorResetButton.disabled = true;
      }}

      bind:this={HTMLEditorResetButton}
    >
      <i class="fa-solid fa-arrow-rotate-left"></i>
    </button>

  </div>

  <div class="html-editor" bind:this={HTMLEditor}></div>
</div>
