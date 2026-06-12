<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeViewerCSS } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Subtle, adjustable fade out effect for your collection carousels in your profile page.
  </p>

  <figure>
    <img src="./assets/tweaks/fade-out-collection.png" alt="" width="680"/>
    <figcaption>
      Collection carousel with the tweak on a profile page
    </figcaption>
  </figure>

  <h2>Customizations</h2>

  <p>
    Adjust the <code>--collection-fade-length</code> CSS property to adjust the fade out length.
  </p>

  <CodeViewerCSS css={`

    :root {
      --collection-fade-length: 30%; /* default */
    }

  `}/>

</ComponentPage>
