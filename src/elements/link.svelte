<script lang="ts">
  const
    {
      h,
      i,
      children,
    }: {
      h: string,
      i?: string,
      children: any,
    } = $props()

  // svelte-ignore state_referenced_locally
  , isLocal = !h.startsWith("http")
  ;
</script>

<style lang="scss">
  a {
    display: inline-block;
  }
</style>

<a
  href={h}

  target={isLocal ? null : "_blank"}
  referrerpolicy={isLocal ? null : "origin"}
  rel={isLocal ? null : "nofollow noopener"}
>
  {#if isLocal}
    {#if i}
      <i class="{i}"></i>
    {/if}
  {:else}
    <i class="fa-solid fa-up-right-from-square"></i>
  {/if}
  {@render children()}
</a>
