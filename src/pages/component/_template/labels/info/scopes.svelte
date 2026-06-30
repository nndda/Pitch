<script lang="ts">
import { LabelScopes } from "../";

  const
    {
      scopeStatus,
      scopes,
      componentData,
    }: {
      scopeStatus: ScopeStatus,
      scopes: Scopes,
      componentData: ComponentData,
    } = $props()

  , compName = componentData.nameDisplay ?? componentData.name
  ;
</script>

<style lang="scss">
  .scope-status {
    text-transform: capitalize;
  }

  .scopes-list {
    padding-left: 1em;
    margin: 0;
    /* display: inline-block; */
  }

</style>

<h2>
  <q class="scope-status">
    {scopeStatus}
  </q>
  compatibility label
</h2>

<!-- TODO: -->
<!-- dumb asf -->
<LabelScopes previewOnly={true} componentData={(() => {
  const
    compData: Partial<ComponentData> = { "scopes": {} }
  ;
  // holy fuccc
  (
    compData.scopes as Record<ScopeStatus | string, Scopes>
  )[scopeStatus] = scopes;

  return compData;
})()}/>

<p>
  <b>{compName}</b> is
  {#if scopeStatus === "compatible"}
    <b>fully compatible</b>
  {:else if scopeStatus === "partial"}
    <b>partially compatible</b>
  {:else if scopeStatus === "none"}
    <b>not compatible</b>
  {:else if scopeStatus === "only"}
    <b>only compatible</b>
  {/if}
  with the page(s) listed above.
</p>

<p>
  {#if scopeStatus === "compatible"}
  {:else if scopeStatus === "partial"}
    The component will appears, or even behave differently on those pages.
  {:else if scopeStatus === "none"}
  {:else if scopeStatus === "only"}
  {/if}
</p>

{#if componentData.compatibleOnInputs && scopeStatus !== "compatible"}
  <hr>

  <p>
    Set these CSS variables manually, to make {compName} <b>compatible on all pages</b>:
  </p>
  <ul>
    {#each componentData.compatibleOnInputs as input}
      <li><code>--{input}</code></li>
    {/each}
  </ul>
{/if}
