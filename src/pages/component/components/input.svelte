<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeHTML, ComponentRef } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Represent the keyboard inputs, controls, or any buttons.
  </p>

  <p>
    Unlike most components, Input doesn’t make use of custom classes, instead it styles the <code>&lt;kbd&gt;</code> HTML tags directly.
  </p>

  <CodeHTML html={`

    Press <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text.

    <br>
    <br>

    Then press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy them.

  `}/>

  <h2>Examples</h2>

  <CodeHTML html={`

    Use <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> to move around.

    <br>
    <br>

    Hold down <kbd>Shift</kbd> to sprint, and <kbd>C</kbd> to crouch.

    <br>
    <br>

    Press <kbd>Tab</kbd> to open your inventory.

  `}/>

  <CodeHTML html={`

    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>

    <br>
    <br>

    <kbd>Shift</kbd> + <kbd>Tab</kbd>

    <br>
    <br>

    <kbd>Ctrl</kbd> + <kbd>C</kbd>

  `}/>

  <p>
    Input map display with left-aligned <ComponentRef comp="Info List"/> component:
  </p>

  <CodeHTML html={`

    <h2>Input & Controls</h2>

    <dl class="custom-info custom-left">

      <dt>Move</dt>
      <dd>
        <kbd>W</kbd>,
        <kbd>A</kbd>,
        <kbd>S</kbd>,
        <kbd>D</kbd>
      </dd>

      <dt>Jump</dt>
      <dd>
        <kbd>Space</kbd>
      </dd>

      <dt>Interract</dt>
      <dd>
        <kbd>F</kbd>,
        <kbd>E</kbd>
      </dd>

      <dt>Inventory</dt>
      <dd>
        <kbd>Tab</kbd>
      </dd>

    </dl>

  `}/>

</ComponentPage>
