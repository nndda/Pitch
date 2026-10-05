<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/components/input/examples/basic-2.preview.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Input"
  html={`<div style="font-size: 1.15em;">${HTMLStr}</div>`}
/>
