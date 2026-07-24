<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import dedent from "dedent";

  const
    {
      css,
      compiledViewer = false, // why...
    }: {
      css: string,
      compiledViewer?: boolean, // why...
    } = $props()
  ;

  let
  // svelte-ignore non_reactive_update
    CSSEditor: HTMLElement
  // svelte-ignore non_reactive_update
  , CSSCopyButton: HTMLButtonElement
  ;

  import {
    event,
    eventCSSCompiled
  } from "../../states/runtime";

  import {
    compile,
  } from "../../scripts/compiler";

  const destroyCb = {
    cb: null as null | any, // i am losing brain cells
  };

  onMount(async () => {
    import("./code-editor").then(async ({ instatiateCSSViewer }) => {
      const cssEditorAPI = instatiateCSSViewer(
        compiledViewer ? (await compile()) : "\n" + dedent(css) + "\n",

        CSSEditor,
        CSSCopyButton,
        false,
      );

      async function updateCompiledCSS() {
        cssEditorAPI.CSSUpdateCb((await compile()));
      }
      destroyCb.cb = updateCompiledCSS;

      if (compiledViewer) {
        event.addEventListener(eventCSSCompiled, updateCompiledCSS);
      }
    });
  });

  onDestroy(() => {
    if (destroyCb.cb) {
      event.removeEventListener(eventCSSCompiled, destroyCb.cb);
    }
  });
</script>

<!-- svelte-ignore css_unused_selector -->
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
