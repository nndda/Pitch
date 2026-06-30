<script lang="ts">
  import type { Component } from "svelte";

  const
    {
      componentData,
      previewOnly = false,
    }: {
      componentData: Partial<ComponentData>,
      previewOnly?: boolean,
    } = $props()

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

  import {
    InfoAMP,
    InfoScopes,
  } from "./info/";
  import { showModal } from "../../../../scripts/modal";
</script>

{#if componentData.scopes}
  <ul class="labels-list scopes">
    {#each Object.entries(componentData.scopes) as [scopeType, scopes]}

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
{/if}

{#if componentData.compatibleOnInputs}
  <ul class="labels-list scopes compatible-all">
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
{/if}

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
          <li>
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
