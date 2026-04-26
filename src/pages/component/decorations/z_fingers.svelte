<script lang="ts" module>
  import css from "./z_fingers?css-component";

  export const data: ComponentData = {
    css: css,

    name: "👉👈",

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
    👉👈
  </p>

  <CodeHTML html={`

    <p style="font-size: 2em;">
      rate plzzzzz?? 🥺 <span class="custom-plzzz"></span>
    </p>

  `}/>

</ComponentPage>
