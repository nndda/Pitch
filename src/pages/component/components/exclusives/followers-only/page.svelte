<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage } from "../../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Custom classes that hide or blur the content for non-followers, and disables text selections and user interaction of the content.
  </p>

  <p>
    <code>custom-followers-only-hidden</code> class hide the content completely.
  </p>

  <p>
    <code>custom-followers-only-blurred</code> class blur the content.
  </p>

  <figure>
    <img src="./assets/components/exclusive-blurred.png" alt="" width="450"/>
    <figcaption>
      Blurred variant. (left) for non-followers. (right) for followers.
    </figcaption>
  </figure>

  <p>
    <code>custom-followers-only-text</code> class replace texts with placeholder.
  </p>

  <figure>
    <img src="./assets/components/exclusive-text.png" alt="" width="450"/>
    <figcaption>
      Text variant. (left) for non-followers. (right) for followers.
    </figcaption>
  </figure>

  <blockquote class="custom-callout">

    <h4>Important notes</h4>

    <p>
      This tweak just hides/blurs the content <strong><em>visually</em></strong>.
      <br>
      <br>
      Anyone that's able to view/modify the HTML directly (like via the browser's developer tool) can toggle back the content without following the creator.
    </p>

  </blockquote>

  <blockquote class="custom-callout">

    <h4>Notes</h4>

    <p>
      For project that has multiple authors, the content will be revealed for <strong>followers of the one that host the project page</strong>.
    </p>

  </blockquote>

</ComponentPage>
