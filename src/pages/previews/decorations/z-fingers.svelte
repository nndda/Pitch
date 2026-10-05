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
  compRef="👉👈"
  html={`
    <p style="font-size: 1.5em;" class="text-center">
      <span class="custom-plzzz"></span>
    </p>
  `}
/>
