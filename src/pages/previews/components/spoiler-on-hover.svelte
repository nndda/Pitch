<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/components/spoiler/hover/examples/basic.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Spoiler — On Hover"
  html={`<div style="font-size: 1.075em;">${HTMLStr}</div>`}
/>
