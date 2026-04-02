<script lang="ts" module>
  export const data: ComponentData = {

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
