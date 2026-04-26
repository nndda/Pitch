<script lang="ts">
  // import {
  //   onMount,
  // } from "svelte";

  import {
    compsUserInputStorage,
  } from "../../../states/storage.svelte";
  import {
    applyUserInput,
    removeUserInput,
  } from "./input";

  import {
    copyStr,
  } from "../../../scripts/copy";

  const
    { data } = $props()
    // svelte-ignore state_referenced_locally
  , compData: ComponentData = data
  ;

  let
    pinned = $state(false)
  // , resetAllButton: HTMLButtonElement
  , resetButtons: HTMLButtonElement[] = []
  ;

  // function isAnyModified(): boolean {
  //   // for (const btn of resetButtons) {
  //   //   if (!btn.disabled) {
  //   //     return true;
  //   //   }
  //   // }
  //   // return false;
  //   return resetButtons.some(val => !val.disabled);
  // }

  // onMount(() => {
  //   resetAllButton.disabled = !isAnyModified();
  // });
</script>

<style lang="scss">
  @use "./input.scss";
</style>

<ul
  class="page-header-list page-header-input"
  class:pinned={pinned}
  data-comp-name={compData.name}
>

    <li>
      <h3>
        <i class="fa-solid fa-sliders"></i>
        Configurations
      </h3>

      <div class="flex-space"></div>

      <div>
        <button
          class="icon-only custom-tip"
          aria-label="Reset all fields"

          onclick={() => {
            for (const btn of resetButtons) {
              if (!btn.disabled) {
                btn.click();
              }
            }
          }}
        >
<!--
          bind:this={resetAllButton}

          onclick={() => {
            resetAllButton.disabled = true;
            for (const btn of resetButtons) {
              if (!btn.disabled) {
                btn.click();
              }
            }
          }} -->
          <!-- <i class="fa-solid fa-arrow-rotate-left"></i> -->
          <i class="fa-solid fa-trash"></i>
          <span class="custom-tip-content custom-left">
            Reset all fields
          </span>
        </button>

        <input
          type="checkbox"
          id="pin-toggle"

          checked={pinned}

          onchange={ev => {
            pinned = ev.currentTarget.checked;
          }}
        >
        <label
          class="custom-tip button icon-only"
          for="pin-toggle"
        >
          <i class="fa-solid fa-thumbtack"></i>
          <span class="custom-tip-content custom-left">
            Pin input field
          </span>
        </label>
      </div>
    </li>

  {#each compData.input as input, i}

    {@const isInputNotStored = !(input.var in compsUserInputStorage.state)}

    <li>
      <label
        for={input.var}
      >
        {input.name}

        {#if !input.hardcoded}
          <button
            class="custom-tip input-var-name"
            onclick={() => {
              copyStr("--" + input.var);
            }}
          >
            <code>
              --{input.var}
            </code>

            <span class="custom-tip-content custom-right">
              <i class="fa-solid fa-copy"></i>
            </span>

            <span class="custom-tip-content">
              CSS variable name
            </span>
          </button>
        {/if}
      </label>

      <div class="input">
        {#if input.type === "string"}
          <input
            id={input.var}
            type="text"
            value={
              isInputNotStored ? input.default :
              (compsUserInputStorage.state[input.var] as string).replace(/^"|"$/g, "")
            }

            oninput={ev => {
              const
                cssVar = input.var
              , val = '"' + ev.currentTarget.value + '"'
              ;

              if (ev.currentTarget.value === input.default) {
                removeUserInput(cssVar);
              } else {
                if (!input.hardcoded) {
                  applyUserInput(cssVar, val);
                }
              }

              // resetAllButton.disabled = !isAnyModified();
            }}
          >
        {/if}

        <button
          class="icon-only custom-tip reset"
          aria-label="Reset"
          disabled={
            // bruh...
            isInputNotStored ||
            compsUserInputStorage.state[input.var] === (
              (input.type === "string") ? '"' + input.default + '"' : input.default
            )
          }

          onclick={() => {
            const
              cssVar = input.var
            ;
            let
              val = input.default ?? ""
            ;

            if (input.type === "string") {
              val = '"' + (val as string) + '"';
            }

            if (!input.hardcoded) {
              removeUserInput(cssVar);
            }

            // resetAllButton.disabled = !isAnyModified();
          }}

          bind:this={resetButtons[i]}
        >
          <i class="fa-solid fa-arrow-rotate-left"></i>
          <span class="custom-tip-content custom-left">
            Reset
          </span>
        </button>

      </div>
    </li>
  {/each}
</ul>
