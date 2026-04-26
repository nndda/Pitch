<script lang="ts" module>
  import css from "./link-decoration__external?css-component";

  export const data: ComponentData = {
    css: css,

    name: "External",
    nameDisplay: "Link Decoration — External",

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
    Decorate links pointing to external page/site.
  </p>

  <CodeHTML html={`

    <p>
      The source code for this project is available on the <a class="custom-link-ext" href="https://github.com/nndda/Pitch" target="_blank">GitHub repository</a>! Licensed under GNU AGPLv3 and CC0!
    </p>

  `}/>

</ComponentPage>
