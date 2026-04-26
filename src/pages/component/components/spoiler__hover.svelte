<script lang="ts" module>
  import css from "./spoiler__hover?css-component";

  export const data: ComponentData = {
    css: css,

    name: "On Hover",
    nameDisplay: "Spoiler — On Hover",

    scopes: {
      compatible: [
        "project",
        "profile",
        "jam",
      ],
    },

    sub: "Spoiler",

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Hide any lines of text. Hover over it to show the content.
  </p>

  <CodeHTML html={`

    <p>
      The one who stole Nina's muffins was
      <span class="custom-hd">
        Mr. Snuffles.
      </span>
    </p>

  `}/>

  <CodeHTML html={`

    <p>
      The killer is
      <span class="custom-hd">
        pretty sus
      </span>.
      I'm shocked, shocked I say!
    </p>

  `}/>

</ComponentPage>
