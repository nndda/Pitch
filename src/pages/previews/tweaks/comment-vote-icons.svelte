<script lang="ts">
  import { PreviewBlock } from "@elements";

  const
    props: {
      class?: string,
    } = $props()
  ;
</script>

<PreviewBlock
  classes={props.class}
  compRef="Comment Vote Icons"
  img="./assets/tweaks/comment-votes-up.png"
/>
