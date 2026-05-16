<script>
  const props = $props();
  import PreviewBlock from "./preview-block.svelte";
</script>

<PreviewBlock
  classes={props.class}
  compRefs={["Callout"]}
  html={`
    <blockquote class="custom-callout">

      <h3>⚠ Content Warning</h3>

      <p>
        This project contains the following:
        <br>
        Strong language, mild violence, blood, and flashing lights.
      </p>

    </blockquote>
  `}
/>
