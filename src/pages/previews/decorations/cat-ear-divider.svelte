<script lang="ts">
  import { PreviewBlock } from "@elements";
  import HTMLStr from "@pitch/decorations/cat-ear-divider/examples/neko-face.svelte?raw";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Cat Ear Divider"
  html={HTMLStr}
/>
