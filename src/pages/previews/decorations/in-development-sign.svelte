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
  compRef="In Development Sign"
  html={`
    <div class="custom-indev" style="margin: 1em;">
      <div>🚧 IN DEVELOPMENT</div>
    </div>
  `}
/>
