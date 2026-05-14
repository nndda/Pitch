<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeHTML, ComponentRef } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Inform and highlight content warnings, additional informations, or technical issues.
  </p>

  <CodeHTML html={`

    <blockquote class="custom-callout">

      <h3>&#9888; Content Warning</h3>

      <p>
        Strong language, mild violence, blood, and flashing lights.
      </p>

    </blockquote>

  `}/>

  <h2>Sizing</h2>

  <p>
    Callout takes the full width of the page by default. You can adjust the width manually by adjusting its <code>max-width</code> property:
  </p>

  <CodeHTML html={`

    <blockquote style="max-width: 500px;" class="custom-callout">

      <h3>500px</h3>

      <p>
        This Callout element has a maximum width of 500 pixels.
      </p>

    </blockquote>

    <blockquote style="max-width: 400px;" class="custom-callout">

      <h3>400px</h3>

      <p>
        This Callout element has a maximum width of 400 pixels.
      </p>

    </blockquote>

    <blockquote style="max-width: 300px;" class="custom-callout">

      <h3>300px</h3>

      <p>
        This Callout element has a maximum width of 300 pixels.
      </p>

    </blockquote>

  `}/>

  <p>
    For Callout with custom width, center it by adding <code>margin: auto;</code>.
  </p>

  <CodeHTML html={`

    <blockquote style="max-width: 300px; margin: auto;" class="custom-callout">

      <h3>Note</h3>

      <p>
        This Callout element has a maximum width of 300 pixels, and also is centered.
      </p>

    </blockquote>

  `}/>

  <h2>Examples</h2>

  <p>
    Callout with <ComponentRef comp="Label"/> inside it:
  </p>

  <CodeHTML html={`

    <blockquote class="custom-callout">

      <h3>Note!</h3>

      <p>
        This [PROJECT NAME] is still in its alpha stage. And is subject to frequent changes, and bugs.
      </p>

      <p>
        <a target="_blank" href="#" class="custom-lb">Report bugs here</a>, and feel free to share your feedback in the comments!
      </p>

    </blockquote>

  `}/>

  <p>
    Nested Callout.
  </p>

  <CodeHTML html={`

    <blockquote class="custom-callout">

      <h2>A Callout</h2>

      <p>
        This is a Callout component
      </p>

      <blockquote class="custom-callout">

        <h3>Another Callout</h3>

        <p>
          This is another Callout component
        </p>

        <blockquote class="custom-callout">

          <h4>Yet Another Callout</h4>

          <p>
            This is yet another Callout component
          </p>

        </blockquote>

      </blockquote>

    </blockquote>

  `}/>

</ComponentPage>
