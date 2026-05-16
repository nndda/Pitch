<script>
  const props = $props();
  import PreviewBlock from "./preview-block.svelte";
</script>

<PreviewBlock
  classes={props.class}
  compRefs={["Dot Leader"]}
  html={`
    <h3 class="custom-dot-leader-item custom-no-dot">
      <span>Item</span>
      <span>Price</span>
    </h3>

    <ul class="custom-dot-leader">
      <li>
        <span>Base game</span>
        <span>$5</span>
      </li>
      <li>
        <span>Base game + bonus content</span>
        <span>$12.5</span>
      </li>
      <li>
        <span>Supporter Pack</span>
        <span>$16</span>
      </li>
    </ul>
  `}
/>
