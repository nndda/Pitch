<script lang=ts>
  const { children, data } = $props();
</script>

<ul class=scopes>
  {#each Object.entries((data as ComponentData).scopes) as [scopeType, scopes]}

    {#if typeof scopes === "string"}

      <li class={scopeType}>
        {scopeType}
        <ul>
          <li>{scopes} pages</li>
        </ul>

      </li>

    {:else}

      <li class={scopeType}>
        {scopeType}
        <ul>
          {#each scopes as scope}
            <li class={scopeType}>
              {scope} pages
            </li>
          {/each}
        </ul>
      </li>

    {/if}

  {/each}
</ul>

{@render children()}
