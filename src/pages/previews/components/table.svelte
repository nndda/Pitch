<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/components/table/examples/features.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Table"
  html={`<div style="margin: 2em; display: flex;">${HTMLStr}<div/>`}
/>
