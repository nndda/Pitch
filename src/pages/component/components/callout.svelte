<script lang="ts" module>
  import css from "./callout?css-component";

  export const data: ComponentData = {
    css: css,

    name: "Callout",

    scopes: {
      compatible: "project",
      partial: [
        "profile",
        "jam",
      ],
    },

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Inform and highlight content warnings, additional informations, or technical issues.
  </p>

  <CodeHTML html={`

    <blockquote class="custom-callout">

      <h3>&#9888; Content Warning</h3>
      Strong language, mild violence, blood, and flashing lights.

    </blockquote>

  `}/>

  <h2>Sizing</h2>

  <p>
    Callout takes the full width of the page by default. You can adjust the width manually by adjusting its <code>max-width</code> property:
  </p>

  <CodeHTML html={`

    <blockquote style="max-width: 500px;" class="custom-callout">

      <h3>500px</h3>
      This Callout element has a maximum width of 500 pixels.

    </blockquote>

    <blockquote style="max-width: 400px;" class="custom-callout">

      <h3>400px</h3>
      This Callout element has a maximum width of 400 pixels.

    </blockquote>

    <blockquote style="max-width: 300px;" class="custom-callout">

      <h3>300px</h3>
      This Callout element has a maximum width of 300 pixels.

    </blockquote>

  `}/>

  <p>
    For Callout with custom width, center it by adding <code>margin: auto;</code>.
  </p>

  <CodeHTML html={`

    <blockquote style="max-width: 300px; margin: auto;" class="custom-callout">

      <h3>Note</h3>
      This Callout element has a maximum width of 300 pixels, and also is centered.

    </blockquote>

  `}/>

  <h2>Examples</h2>

  <p>
    Callout with <button class="button-primary">Label</button> inside it:
  </p>

  <CodeHTML html={`

    <blockquote class="custom-callout">

      <h3>Note!</h3>
      This [PROJECT NAME] is still in its alpha stage. And is subject to frequent changes, and bugs.

      <br>
      <br>

      <a target="_blank" href="#" class="custom-lb">Report bugs here</a>

      And feel free to share your feedback in the comments!

    </blockquote>

  `}/>

  <p>
    Nested Callout.
  </p>

  <CodeHTML html={`

    <blockquote class="custom-callout">

      <h2>A Callout</h2>
      This is a Callout component

      <blockquote class="custom-callout">

        <h3>Another Callout</h3>
        This is another Callout component

        <blockquote class="custom-callout">

          <h4>Yet Another Callout</h4>
          This is yet another Callout component
          
        </blockquote>
        
      </blockquote>

    </blockquote>

  `}/>

</ComponentPage>
