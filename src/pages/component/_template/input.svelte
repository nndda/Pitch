<script lang="ts">
  import { onMount } from "svelte";

  import {
    inputs,
    type RecordString,
  } from "../../../states/storage.svelte";
  import {
    applyUserInput,
    removeUserInput,
    isInputVariablesCompatible,
  } from "./input";

  import { copyStr } from "../../../scripts/copy";
  import { state as stateGlobal } from "../../../states/components.svelte";

  const
    { data }: { data: ComponentData } = $props()
  , changedInputs: Record<string, true> = {}
  , valueFormats: RecordString = $state({})
  , formatRe = /(\d+)(\w+)/
  ;

  // svelte-ignore state_referenced_locally
  for (const input of data.input!) {
    if ("type" in input) {
      if (input.type === "size") {
        valueFormats[input.var] = input.var in inputs.state
          ? (getFormat(inputs.state[input.var]) ?? input.defaultFormat)! // TODO: dumb asf
          : input.defaultFormat!
        ;
      }
    }
  }

  let
    pinned = $state(false)
  // , resetAllButton: HTMLButtonElement
  ;

  // TODO:
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

  // TODO: this could be in a potential hot path
  function syncInputCompatibility() {
    if (data.compatibleOnInputs) {
      const
        isCompatible = isInputVariablesCompatible(data)

      , selectorBase = `.heading[data-comp-name="${data.nameDisplay ?? data.name}"] `
      , runtimeData = stateGlobal.attr as ComponentRuntimeItem
      ;

      runtimeData.li?.classList.toggle("compatible-all", isCompatible);

      document.querySelector(selectorBase + ".scopes:not(.compatible-all)")?.classList.toggle("hidden", isCompatible);
      document.querySelector(selectorBase + ".scopes.compatible-all")?.classList.toggle("hidden", !isCompatible);
    }
  }

  function CSSifyURL(url: string) {
    return "url(\"" + encodeURI(url) + "\")";
  }
  function UnCSSifyURL(urlVar: string) {
    return decodeURI(
      urlVar.replace(/^url\("|"\)$/g, ""),
    );
  }

  function getFormat(
    value: string,
  ): string | null {
      const
        reRes = formatRe.exec(value)
      ;

      if (reRes && reRes.length > 1) return reRes[2];

      return null;
  }

  function isValueEqualsDefault(
    value: string,
    input: ComponentUserInput,
  ): boolean {
    return value === (
        input.type === "string"
      ? '"' + input.default + '"'

      : input.type === "size"
      ? input.default + input.defaultFormat!

      : input.default
    )
  }

  function onVarInputChange(
    value: string,
    input: ComponentUserInput,
  ): void {
    const
      cssVar = input.var
    , val =
          input.type === "string"
        ? '"' + value + '"'

        : input.type === "url"
        ? CSSifyURL(value)

        : input.type === "size"
        ? value + (valueFormats[input.var] ?? input.defaultFormat)

        : value
    ;

    if (!input.hardcoded) {
      if (isValueEqualsDefault(val, input)) {
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

  function onVarFormatInputChange(
    format: string,
    input: ComponentUserInput,
  ): void {
    valueFormats[input.var] = format;

    // NOTE: kinda dumb, but whatever
    onVarInputChange(
      (document.getElementById(input.var) as HTMLInputElement)?.value,
      input,
    )
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
          }}
          -->
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

      {@const isInputNotStored = !(input.var in inputs.state)}

      {@const inputEv = (
          ev: Event & {
            currentTarget: EventTarget & HTMLInputElement
          }
        ) => {
          onVarInputChange(ev.currentTarget.value, input);
        }
      }

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
                (inputs.state[input.var] as string).replace(/^"|"$/g, "")
              }

              oninput={inputEv}
            >

          {:else if input.type === "url"}

            <input
              id={input.var}
              type="text"
              value={
                isInputNotStored ? input.default :
                UnCSSifyURL(inputs.state[input.var] as string)
              }

              oninput={ev => {onVarInputChange(ev.currentTarget.value, input)}}
            >

          {:else if input.type === "color"}

            <input
              id={input.var}

              type="color"
              alpha

              value={
                isInputNotStored ? input.default : inputs.state[input.var]
              }

              oninput={inputEv}
            >

          {:else if input.type === "size"}

            {@const currentValue = isInputNotStored ? input.default! : inputs.state[input.var]}

            {@const selectedFormat = getFormat(currentValue) ?? input.defaultFormat}

            <input
              id={input.var}

              type="number"
              min="0"
              max="999999"

              value={
                isInputNotStored
                  ? input.default
                  : formatRe.exec(inputs.state[input.var])![1]
              }

              oninput={inputEv}
            >
            <select
              id="{input.var}-format"

              value={valueFormats[input.var]}

              oninput={ev => {onVarFormatInputChange(ev.currentTarget.value, input)}}
            >
              {#each [
                "em", "rem", "px"
              ] as format}
                <option
                  selected={format === selectedFormat}
                  value={format}
                >
                  {format}
                </option>
              {/each}
            </select>

          {/if}

          <button
            class="icon-only custom-tip reset"
            aria-label="Reset"
            disabled={
              isInputNotStored || isValueEqualsDefault(inputs.state[input.var], input)
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
              } else if (input.type === "size") {
                valueFormats[input.var] = input.defaultFormat!;
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
