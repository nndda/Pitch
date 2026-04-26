<script lang="ts" module>
  import css from "./spoiler__click?css-component";

  export const data: ComponentData = {
    css: css,

    name: "On Click",
    nameDisplay: "Spoiler — On Click",

    scopes: {
      compatible: "project",
      partial: [
        "profile",
        "jam",
      ],
    },

    tags: [
      "hacky",
    ],

    sub: "Spoiler",

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Hide any lines of text. Click it to show the content.
  </p>

  <CodeHTML html={`

    <div>
      The one who stole Nina's muffins was
      <div class="custom-hd-click"><details><summary>
        Mr. Snuffles.
      </summary></details></div>
    </div>

  `}/>

  <CodeHTML html={`

    <div>
      The killer is 
      <div class="custom-hd-click"><details><summary>
        pretty sus
      </summary></details></div>.
      I'm shocked, shocked I say!
    </div>

  `}/>

</ComponentPage>
