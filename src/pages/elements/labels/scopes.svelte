<script lang="ts">
  import { onMount, type Component } from "svelte";

  import { InfoAMP, InfoScopes } from "./info/";
  import { showModal } from "../../../scripts/modal";
  import { isInputVariablesCompatible } from "../input";
  import { event, eventCSSInputChanged } from "../../../states/runtime";
  import { project } from "../../../storage/db";

  const
    {
      componentData,
      previewOnly = false,
    }: {
      componentData: Partial<ComponentData>,
      previewOnly?: boolean,
    } = $props()

  , sidebarRightToggleEl = document.getElementById("sidebar-right-toggle") as HTMLInputElement

  , itchScopes = [
      "project",
      "profile",
      "jam",
    ]

  , scopesIcons: Record<ScopeStatus, string> = {
      compatible: "fa-solid fa-circle-check",
      partial: "fa-solid fa-triangle-exclamation",
      none: "fa-solid fa-square-xmark",
      only: "fa-solid fa-lock",
    }
  ;

  let
    isCompaible = $state(false)
  ;

  event.addEventListener(eventCSSInputChanged, async () => {
    isCompaible = await isInputVariablesCompatible(componentData as ComponentData);
  });

  onMount(() => {
    event.dispatchEvent(new Event(eventCSSInputChanged));
  })
</script>

<style lang="scss">
  @use "sass:color";
  @use "../../../styles/variables" as *;

  :global {
    .labels {
      display: flex;
      min-height: 4em;
      gap: .5em;

      & > * {
        display: inline-flex;
      }
    }

    .labels-list {
      padding: 0;
      gap: .5em;
      font-size: .9em;

      & ul, li, button {
        display: inline-flex;
        // align-items: center;
        gap: .5em;
        padding: 0;
      }

      & button {
        // margin: .2em .5em;
        border-radius: 6px;
        // background: red;

        & > svg {
          display: inline-flex;
          height: 1em;
          fill: $text-col;
        }
      }

      & .text {
        text-transform: capitalize;
      }
    }
  }

  @mixin style-scope-label($col) {
    & button {
      background: color.mix($background, $col, 70%);

      &:hover {
        background: color.mix($background, $col, 55%);
      }

      & .icon {
        color: lighten($col, 15%);
      }
    }
  }

  .compatible {
    @include style-scope-label(#21bd19);
  }
  .partial {
    @include style-scope-label(#ffbe0a);
  }
  .none {
    @include style-scope-label(#e6071d);
  }
  .only {
    @include style-scope-label($primary);
  }
  .amp {
    @include style-scope-label(#005AF0);
  }

  .label-icon-only {
    height: 100%;

    & > i {
      font-size: 1em;
    }
  }

  .show-compatible-scope {
    & .compatible, & + .compatible-all {
      display: none !important;
    }
  }

  :global #viewer:has(#sidebar-right-toggle:checked) {
    & .customization-shortcut {
      display: none;
    }
  }
</style>

 	<ul
    class="labels-list scopes"
    class:show-compatible-scope={!$project?.app.settings.app.componentPage.alwaysShowCompatibleScopeBadge}
    class:hidden={isCompaible}
  >
    {#each Object.entries(componentData.scopes!) as [scopeType, scopes]}

      {@const scopeStatus: ScopeStatus = scopeType as ScopeStatus}
      {@const scopeInfoComp = previewOnly ? null : () => {
        showModal(
          InfoScopes as Component,
          // TODO: lack typing :/
          {
            "scopeStatus": scopeStatus,
            "scopes": scopes,
            "componentData": componentData,
          },
        );
      }}

      {#if typeof scopes === "string"}

        <li class={scopeStatus}>
          <button
            onclick={scopeInfoComp}
          >
            <i class="icon {scopesIcons[scopeStatus]}"></i>
            <ul>
              <li class=text>
                {scopes} pages
                {#if scopeStatus === "only"}
                  only
                {/if}
              </li>
            </ul>
          </button>
        </li>

      {:else}

        <li class={scopeStatus}>
          <button
            onclick={scopeInfoComp}
          >
            <i class="icon {scopesIcons[scopeStatus]}"></i>
            <ul>
              {#each scopes as scope, n}
                <li class="text {scopeStatus}">
                  {scope} pages{#if n < scopes.length - 1},{/if}
                </li>
              {/each}
            </ul>
          </button>
        </li>

      {/if}

    {/each}
  </ul>

 	<ul class="labels-list scopes compatible-all" class:hidden={!isCompaible}>
    <li class="compatible">
      <button
        onclick={() => {
          showModal(
            InfoScopes as Component,
            // TODO: lack typing :/
            {
              "scopeStatus": "compatible",
              "scopes": itchScopes,
              "componentData": componentData,
            },
          );
        }}
      >
        <i class="icon {scopesIcons.compatible}"></i>
        <ul>
            {#each itchScopes as scope, n}
              <li class="text compatible">
                {scope} pages{#if n < itchScopes.length - 1},{/if}
              </li>
            {/each}
        </ul>
      </button>
    </li>
  </ul>

{#if componentData.scopeAMPincompatible}
  <ul class="labels-list">
    <li class="none">
      <button
        class=""
        onclick={previewOnly ? null : () => {
          showModal(
            InfoAMP as Component,
            {
              "componentData": componentData,
            },
          );
        }}
      >
        <ul>
          <li style="align-items: center;">
            <i class="icon fa-solid fa-xmark"></i>
            <!-- ain't bringing the whole Simple Icons library just yet -->
            <svg
              class="icon"
              role="img"
              fill="white"
              style="width:1em;height:1em;"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
                <title>AMP</title>
                <path d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12C5.373 24 0 18.627 0 12S5.373 0 12 0zm-.92 19.278l5.034-8.377a.444.444 0 00.097-.268.455.455 0 00-.455-.455l-2.851.004.924-5.468-.927-.003-5.018 8.367s-.1.183-.1.291c0 .251.204.455.455.455l2.831-.004-.901 5.458z"/>
              </svg>
            AMP incompatible
          </li>
        </ul>
      </button>
    </li>
  </ul>
{/if}


{#if componentData.input}
 	<ul class="labels-list">
    <li class="customization-shortcut">
      <button
        aria-label="Customization available!"
        class="custom-tip label-icon-only"
        onclick={() => {
          // TODO: bruh
          // cant target the sidebar-right-toggle, and then toggle its checked property for some reason ://
          //
          // maybe use global state in runtime.ts instead??
          if (!sidebarRightToggleEl.checked) sidebarRightToggleEl.click();
        }}
      >
        <i class="icon fa-solid fa-sliders"></i>
        <span class="custom-tip-content">Customization available</span>
      </button>
    </li>
  </ul>
{/if}
