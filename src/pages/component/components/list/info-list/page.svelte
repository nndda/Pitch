<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor, CodeViewerCSS, ComponentRef } from "../../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Custom class that style description list element to two-column layout.
  </p>

  <CodeEditor html={`

    <dl class="custom-info">

      <dt>Arts</dt>
      <dd>
        <a href="#">Amazing artist</a>
      </dd>

      <dt>Story</dt>
      <dd>
        <a href="#">Witty writer</a>
      </dd>

      <dt>Codes</dt>
      <dd>
        <a href="#">Creative coder</a>
      </dd>

    </dl>

  `}/>

  <h2>Line Breaks</h2>

  <p>
    Break new line manually using <code>&lt;br&gt;</code>:
  </p>

  <CodeEditor html={`

    <dl class="custom-info">

      <dt>Director</dt>
      <dd>
        <a href="#">Dedicated developer</a>
      </dd>

      <dt>Story</dt>
      <dd>
        <a href="#">Witty writer</a>
      </dd>

      <dt>Arts</dt>
      <dd>
        <a href="#">Illustrious illustrator</a>
          <br>
        <a href="#">Devoted designer</a>
          <br>
        <a href="#">Amazing animator</a>
      </dd>

      <dt>Programming</dt>
      <dd>
        <a href="#">Creative coder</a>
          <br>
        <a href="#">Proficient programmer</a>
      </dd>

      <dt>Sounds</dt>
      <dd>
        <a href="#">Classic composer</a>
          <br>
        <a href="#">Stunning sound designer</a>
      </dd>

    </dl>

  `}/>

  <blockquote class="custom-callout">
    <h3>
      <i class="fa-solid fa-info-circle"></i>
      Title/Info Column
    </h3>

    <p>
      Text on the left column (the key/name/title field) will not wrap.
    </p>
  </blockquote>

  {@const HTMLWrapSample = `
    <dl class="custom-info">

      <dt>Arts</dt>
      <dd>
        <a href="#">Amazing artist</a>
      </dd>

      <dt>Story</dt>
      <dd>
        <a href="#">Witty writer</a>
      </dd>

      <dt>Some Very Very Very Absudrly, Hyper-Specific, And Comically Long Role Name</dt>
      <dd>
        <a href="#">Also Very Very Very Absudrly, Hyper-Specific, And Comically Long Name</a>
      </dd>

    </dl>
  `}

  <CodeEditor html={HTMLWrapSample}/>

  <p>
    If you'd like to have the left-column text wrapped, add the following CSS:
  </p>

  {@const CSSWrapEnable = `
    dl.custom-info {
      & > dt {
        white-space: wrap;
      }
    }
  `}

  <CodeViewerCSS css={CSSWrapEnable}/>

  <CodeEditor
    html={HTMLWrapSample}
    css={CSSWrapEnable}
  />

  <h2>Aligning</h2>

  <p>
    Info List are center-aligned by default. Add class <code>custom-left</code> to align it to the left.
  </p>

  <CodeEditor html={`

    <dl class="custom-info custom-left">

      <dt>Arts</dt>
      <dd>
        <a href="#">Amazing artist</a>
      </dd>

      <dt>Story</dt>
      <dd>
        <a href="#">Witty writer</a>
      </dd>

      <dt>Codes</dt>
      <dd>
        <a href="#">Creative coder</a>
      </dd>

    </dl>

  `}/>

  <h2>Examples</h2>

  <p>
    Input map information with <ComponentRef comp="Input"/> components:
  </p>

  <CodeEditor html={`

    <h2>Input & Controls</h2>

    <dl class="custom-info custom-left">

      <!-- Combined with 'Input' component -->
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
