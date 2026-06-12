<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeViewerCSS } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Add profile picture on your profile page.
  </p>

  <figure>
    <img src="./assets/tweaks/profile-picture-with-banner.png" alt="" width="450"/>
    <figcaption>
      Profile Picture on a profile page
    </figcaption>
  </figure>

  <p>
    On profile pages without banner, it shows your display name besides the profile picture.
  </p>

  <figure>
    <img src="./assets/tweaks/profile-picture-without-banner.png" alt="" width="450"/>
    <figcaption>
      Profile Picture on a profile page without the banner image
    </figcaption>
  </figure>

  <h2>Customizations</h2>

  <p>
    Add the following CSS properties to adjust the tweaks.
  </p>

  <CodeViewerCSS css={`

    :root {
      /* Default: 6em or ~96px */
      --pfp-size: 96px;

      /* Default: 'B. Radius' theme setting */
      --pfp-border-radius: 9px;
    }

  `}/>

</ComponentPage>
