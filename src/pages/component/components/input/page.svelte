<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor, ComponentRef } from "../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Represent the keyboard inputs, controls, or any buttons.
  </p>

  <p>
    Unlike most components, Input doesn’t make use of custom classes, instead it styles the <code>&lt;kbd&gt;</code> HTML tags directly.
  </p>

  <CodeEditor html={`

    <p>
      Press <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text.
    </p>

    <p>
      Then press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy them.
    </p>

  `}/>

  <h2>Examples</h2>

  <CodeEditor html={`

    <p>
      Use <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> to move around.
    </p>

    <p>
      Hold down <kbd>Shift</kbd> to sprint, and <kbd>C</kbd> to crouch.
    </p>

    <p>
      Press <kbd>Tab</kbd> to open your inventory.
    </p>

  `}/>

  <CodeEditor html={`

    <p>
      <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>
    </p>

    <p>
      <kbd>Shift</kbd> + <kbd>Tab</kbd>
    </p>

    <p>
      <kbd>Ctrl</kbd> + <kbd>C</kbd>
    </p>

  `}/>

  <p>
    Input map display with left-aligned <ComponentRef comp="Info List"/> component:
  </p>

  <CodeEditor html={`

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
