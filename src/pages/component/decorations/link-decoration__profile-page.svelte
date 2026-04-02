<script lang="ts" module>
  export const data: ComponentData = {

    name: "Profile Page",
    nameDisplay: "Link Decoration — Profile Page",

    scopes: {
      compatible: [
        "project",
        "profile",
        "jam",
      ],
    },

    notes: [
      `Icon provided by <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>. Licensed under CC BY 4.0`,
    ],

    sub: "Link Decoration",

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Decorate links pointing to itch.io profile page.
  </p>

  <CodeHTML html={`

    <p>
      Check out my itch.io profile <a class="custom-link-itch" href="https://nnda.itch.io" target="_blank">nnda</a>.
    </p>

  `}/>

</ComponentPage>
