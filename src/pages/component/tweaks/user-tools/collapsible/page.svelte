<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage } from "../../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Make user tools collapsible, which will expand on hover.
  </p>

  <figure>
    <img src="./assets/tweaks/user-tools-collapsible.png" alt="" width="680"/>
    <figcaption>
      Unmodified user tools (right), and collapsed user tools (left)
    </figcaption>
  </figure>

</ComponentPage>
