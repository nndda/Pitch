<script lang=ts>
  const { children, data } = $props();

  const scopesIcons: Record<ScopeStatus, string> = {
    compatible: "fa-solid fa-circle-check",
    partial: "fa-solid fa-triangle-exclamation",
    none: "fa-solid fa-square-xmark",
  };
</script>

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
          {#each scopes as scope}
            <li class="text {scopeType}">
              {scope} pages
            </li>
          {/each}
        </ul>
      </li>

    {/if}

  {/each}
</ul>

{@render children()}
