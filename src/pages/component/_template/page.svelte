<script lang="ts">
  const { children, data } = $props();

  // svelte-ignore state_referenced_locally
  const compData: ComponentData = data;

  const scopesIcons: Record<ScopeStatus, string> = {
    compatible: "fa-solid fa-circle-check",
    partial: "fa-solid fa-triangle-exclamation",
    none: "fa-solid fa-square-xmark",
  };
  const tagsData: Record<ComponentTags, {icon: string, desc: string}> = {
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
  };

  import ComponentInput from "./input.svelte";
</script>

<style lang="scss">
  @use "./page.scss";
</style>

{#if compData.tags}
  <ul class="page-header-list">
    {#each compData.tags as tag}
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

{#if compData.notes}
  <ul class="page-header-list">
    {#each compData.notes as note}
      <li class="note">
        <b class="label note">
          <span>
            Note
          </span>
        </b>
        <p>
          <!-- {note} -->
          {@html note}
        </p>
      </li>
    {/each}
  </ul>
{/if}

{#if compData.input}
  <ComponentInput data={data}/>
{/if}

<div class="heading">

  <ul class=scopes>
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

</div>

{@render children()}
