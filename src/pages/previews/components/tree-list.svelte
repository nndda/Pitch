<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/components/list/tree-list/examples/basic-dashed-dotted-simple.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Tree List"
  html={HTMLStr}
/>
