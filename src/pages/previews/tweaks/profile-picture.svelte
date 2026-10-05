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
  compRef="Profile Picture"
  img="./assets/tweaks/profile-picture-with-banner.png"
/>
