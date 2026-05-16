<script>
  const props = $props();
  import PreviewBlock from "./preview-block.svelte";
</script>

<PreviewBlock
  classes={props.class}
  compRefs={["Timeline List"]}
  html={`
    <dl class="custom-tl-list">
      <dt>
        v2.5.1
        <small>5 March 2021</small>
      </dt>

      <dd>Dependency updates</dd>
      <dd>Various bug fixes</dd>

      <dt>
        v2.5
        <small>20 February 2021</small>
      </dt>

      <dd>Improve core feature</dd>
      <dd>Performance improvements</dd>
      <dd>Minor refactor</dd>
    </dl>
  `}
/>
