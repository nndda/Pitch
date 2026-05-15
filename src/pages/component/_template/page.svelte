<script lang="ts">
  import { onMount } from "svelte";
  // import { CompatibilityNote } from "../_template/components";
  import ComponentInput from "./input.svelte";

  const
    { children,
      data,
    }: {
      children: any,
      data: ComponentData,
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
      only: "fa-solid fa-square-xmark",
    }

  , tagsData: Record<ComponentTags, {icon: string, desc: string}> = {
      experimental: {
        icon: "fa-solid fa-vial",
        desc: "Use with caution, and test thoroughly.",
      },
      hacky: {
        icon: "fa-solid fa-flask",
        desc: "Contains unconventional CSS/HTML codes and/or implementation.",
      },
      singular: {
        icon: "fa-solid fa-hand-point-up",
        desc: "Only one instance of the component per page.",
      }
    }
  ;

  onMount(() => {
    document.getElementById("wrapper")!.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
</script>

<style lang="scss">
  @use "./page.scss";
</style>

{#if data.tags}
  <ul class="page-header-list">
    {#each data.tags as tag}
      <li class="note">
        <b class="label {tag}">
          <i class="{tagsData[tag].icon}"></i>
          <span>
            {tag}
          </span>
        </b>
        <p>{tagsData[tag].desc}</p>
      </li>
    {/each}
  </ul>
{/if}

{#if data.notes}
  <ul class="page-header-list">
    {#each data.notes as note}
      <li class="note">
        <b class="label note">
          <span>
            Note
          </span>
        </b>
        <p>
          {@html note}
        </p>
      </li>
    {/each}
  </ul>
{/if}

{#if data.input}
  <ComponentInput data={data}/>
{/if}

<div
  class="heading"
  data-comp-name={data.nameDisplay ?? data.name}
>
  <div class="labels">

    <ul class="labels-list scopes">
      {#each Object.entries((data as ComponentData).scopes) as [scopeType, scopes]}

        {@const scopeStatus: ScopeStatus = scopeType as ScopeStatus}

        {#if typeof scopes === "string"}

          <li class={scopeType}>
            <i class="icon {scopesIcons[scopeStatus]}"></i>
            <ul>
              <li class=text>{scopes} pages</li>
            </ul>

          </li>

        {:else}

          <li class={scopeType}>
            <i class="icon {scopesIcons[scopeStatus]}"></i>
            <ul>
              {#each scopes as scope, n}
                <li class="text {scopeType}">
                  {scope} pages{#if n < scopes.length - 1},{/if}
                </li>
              {/each}
            </ul>
          </li>

        {/if}

      {/each}
    </ul>

    {#if data.compatibleOnInputs}

      <ul class="labels-list scopes compatible-all">
        <li class="compatible">
          <i class="icon {scopesIcons.compatible}"></i>
          <ul>
            {#each itchScopes as scope, n}
              <li class="text compatible">
                {scope} pages{#if n < itchScopes.length - 1},{/if}
              </li>
            {/each}
          </ul>
        </li>
      </ul>

    {/if}

    {#if data.scopeAMPincompatible}
      <ul class="labels-list">
        <li class="none">
          <i class="icon fa-solid fa-xmark"></i>
          <!-- ain't bringing the whole Simple Icons library just yet -->
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>AMP</title><path d="M12 0c6.628 0 12 5.373 12 12s-5.372 12-12 12C5.373 24 0 18.627 0 12S5.373 0 12 0zm-.92 19.278l5.034-8.377a.444.444 0 00.097-.268.455.455 0 00-.455-.455l-2.851.004.924-5.468-.927-.003-5.018 8.367s-.1.183-.1.291c0 .251.204.455.455.455l2.831-.004-.901 5.458z"/></svg>
          AMP incompatible
        </li>
      </ul>
    {/if}

  </div>
</div>

{@render children()}

<!--
{#if data.compatibleOnInputs}
  <h2>
    Compatibility Notes
  </h2>

  <CompatibilityNote inputs={data.compatibleOnInputs}/>
{/if}
-->
