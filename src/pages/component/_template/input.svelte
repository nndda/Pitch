<script lang="ts">
  import {
    onMount,
  } from "svelte";

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
    { data }: { data: ComponentData } = $props()
  // bruh
  , changedInputs: Record<string, true> = {}
  ;

  let
    pinned = $state(false)
  // , resetAllButton: HTMLButtonElement
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

  // TODO: this could be a potential hot path
  function syncInputCompatibility() {
    if (data.compatibleOnInputs) {
      const
        inputCurrent = Object.keys(compsUserInputStorage.state)
      ;

      let
        isCompatible = true
      ;

      for (const inputReq of data.compatibleOnInputs) {
        if (!inputCurrent.includes(inputReq)) {
          isCompatible = false;
          break;
        }
      }

      const
        selectorBase = `.heading[data-comp-name="${data.nameDisplay ?? data.name}"] `
      ;

      document.querySelector(selectorBase + ".scopes:not(.compatible-all)")?.classList.toggle("hidden", isCompatible);
      document.querySelector(selectorBase + ".scopes.compatible-all")?.classList.toggle("hidden", !isCompatible);
    }
  }

  function onVarInputChange(
    ev: Event & {
      currentTarget: EventTarget & HTMLInputElement
    },
    input: ComponentUserInput,
  ): void {
    const
      cssVar = input.var
    , val = input.type === "string"
      ? '"' + ev.currentTarget.value + '"'
      : ev.currentTarget.value
    ;

    if (!input.hardcoded) {
      if (ev.currentTarget.value === input.default) {
        removeUserInput(cssVar);

        if (input.name in changedInputs) {
          delete changedInputs[input.name];
        }
      } else {
        applyUserInput(cssVar, val);

        changedInputs[input.name] = true;
      }
    }

    syncInputCompatibility();

    // resetAllButton.disabled = !isAnyModified();
  }

  onMount(() => {
    syncInputCompatibility();
  });
</script>

<style lang="scss">
  @use "./input.scss";
</style>

<ul
  class="page-header-list page-header-input"
  class:pinned={pinned}
  data-comp-name={data.name}
>

    <li>
      <h3>
        <i class="fa-solid fa-sliders"></i>
        Customizations
      </h3>

      <div class="flex-space"></div>

      <div>
        <button
          class="icon-only custom-tip"
          aria-label="Reset all fields"

          onclick={() => {
            for (const resetBtn of document.querySelectorAll(
              `.page-header-input button.reset`
            ) as NodeListOf<HTMLButtonElement>) {
              if (!resetBtn.disabled) {
                resetBtn.click();
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

  {#each data.input as input, i}

    {#if "name" in input}

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

              oninput={ev => onVarInputChange(ev, input)}
            >

          {:else if input.type === "color"}

            <input
              id={input.var}

              type="color"
              alpha

              value={
                isInputNotStored ? input.default : compsUserInputStorage.state[input.var]
              }

              oninput={ev => onVarInputChange(ev, input)}
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

              syncInputCompatibility();
            }}
          >
            <i class="fa-solid fa-arrow-rotate-left"></i>
            <span class="custom-tip-content custom-left">
              Reset
            </span>
          </button>

        </div>
      </li>

    <!--
    {:else if "heading" in input}

      <li class="sub-heading">
        <h4>
          {#if input.heading === "Color"}
            <i class="fa-solid fa-palette"></i>
          {:else if input.heading === "Layout"}
            <i class="fa-solid fa-ruler-combined"></i>
          {:else}
            <i class="{input.icon}"></i>
          {/if}
          {input.heading}
        </h4>
      </li>
    -->

    {:else if "collapse" in input}

      {@const toggleId = `collapse-${i}`}

      <li class="collapse-mark">
        <label class="button">
          Show more...
          <input
            type="checkbox"
            class="toggle"
            id={toggleId}
          >
          <label class="caret-toggle custom-tip" for={toggleId}>
            <i class="fa-solid fa-caret-right"></i>
          </label>
        </label>
      </li>

    {/if}
  {/each}
</ul>
