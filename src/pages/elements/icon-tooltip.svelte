<script lang="ts">
  const {
    icon,
    tooltip,

    forId,

    elClass,
  }: {
    icon: string,
    tooltip: string,

    forId?: string,

    elClass?: string,
  } = $props();
</script>

{#if forId}
  <label class="custom-tip {elClass}" for={forId}>
    <i class="{icon}"></i>
    <span class="custom-tip-content">
      {tooltip}
    </span>
  </label>
{:else}
  <span class="custom-tip {elClass}">
    <i class="{icon}"></i>
    <span class="custom-tip-content">
      {tooltip}
    </span>
  </span>
{/if}
