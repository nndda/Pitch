<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Custom classes that hide or blur the content for users who haven't rate the project, and disables text selections and user interaction of the content.
  </p>

  <p>
    <code>custom-raters-only-hidden</code> class hide the content completely.
  </p>

  <p>
    <code>custom-raters-only-blurred</code> class blur the content.
  </p>

  <figure>
    <img src="./assets/components/exclusive-blurred.png" alt="" width="450"/>
    <figcaption>
      Blurred variant. (left) for those who haven't rate. (right) for those who have.
    </figcaption>
  </figure>

  <p>
    <code>custom-raters-only-text</code> class replace texts with placeholder.
  </p>

  <figure>
    <img src="./assets/components/exclusive-text.png" alt="" width="450"/>
    <figcaption>
      Text variant. (left) for those who haven't rate. (right) for those who have.
    </figcaption>
  </figure>

  <blockquote class="custom-callout">

    <h4>Important notes</h4>

    <p>
      This tweak just hides/blurs the content <strong><em>visually</em></strong>.
      <br>
      <br>
      Anyone that's able to view/modify the HTML directly (like via the browser's developer tool) can toggle back the content without rating the project.
    </p>

  </blockquote>

</ComponentPage>
