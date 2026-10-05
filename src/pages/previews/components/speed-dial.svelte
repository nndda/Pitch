<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/components/speed-dial/examples/basic-open.+tooltip.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Speed Dial"
  html={HTMLStr}
/>
