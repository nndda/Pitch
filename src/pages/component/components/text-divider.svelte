<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Divider line with text.
  </p>

  <CodeEditor html={`

    <h1 class="custom-heading-divider">Heading 1</h1>

    <h2 class="custom-heading-divider">Heading 2</h2>

    <h3 class="custom-heading-divider">Heading 3</h3>

    <h4 class="custom-heading-divider">Heading 4</h4>

    <h5 class="custom-heading-divider">Heading 5</h5>

    <h6 class="custom-heading-divider">Heading 6</h6>

  `}/>

  <h2>Aligning</h2>

  <p>
    Text Divider are center-aligned by default.
    Align the text to the left or right, by adding <code>custom-left</code> or <code>custom-right</code> class.
  </p>

  <CodeEditor html={`

    <h1 class="custom-heading-divider custom-left">Heading</h1>

    <h1 class="custom-heading-divider custom-right">Heading</h1>

  `}/>

  <h2>Divider Style</h2>

  <p>
    Add <code>custom-dashed</code> or <code>custom-dotted</code> class to change the divider line's style.
  </p>

  <CodeEditor html={`

    <h1 class="custom-heading-divider">Heading</h1>

    <h1 class="custom-heading-divider custom-dashed">Heading</h1>

    <h1 class="custom-heading-divider custom-dotted">Heading</h1>

  `}/>

</ComponentPage>
