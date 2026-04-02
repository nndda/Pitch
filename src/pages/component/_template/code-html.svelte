<script lang="ts">

  import { onMount } from "svelte";

  import {
    instatiateEditor,
    initializeHTML,
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
  , HTMLCopyButton: HTMLButtonElement
  , HTMLCopyStatusLabel: HTMLElement
  ;

  onMount((): void => {
    // TODO: maybe use shadow DOM instead?
    HTMLView.innerHTML = htmlStr;

    instatiateEditor(
      htmlStr,
      HTMLView,
      HTMLEditor,
      HTMLEditorToggle,
      HTMLEditorResetButton,
      HTMLCopyButton,
      HTMLCopyStatusLabel,
    );
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
    <label class="button button-check" for="html-edit-{uid}" aria-label="Edit HTML">
      <i class="fa-solid fa-code"></i>
    </label>

    <button aria-label="Copy HTML" bind:this={HTMLCopyButton}>
      <i class="fa-solid fa-copy"></i>
    </button>

    <span class="copy-status" bind:this={HTMLCopyStatusLabel}>
      <!-- copied! -->
    </span>

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
