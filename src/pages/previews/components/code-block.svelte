<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/components/code-block/examples/theatre.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Code Block"
  html={`<div style="margin: 2em;">${HTMLStr}<div/>`}
/>
