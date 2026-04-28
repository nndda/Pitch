<script lang="ts" module>
  import css from "./code-block?css-component";

  export const data: ComponentData = {
    css: css,

    name: "Image Comparison",

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

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Compare 2 images together. Slide the handle on the bottom of the images.
  </p>

  <CodeHTML html={`

    <div class="custom-img-compare">
      <div>
        <img alt="" src="https://img.itch.zone/aW1nLzIxMDc4NDIzLnBuZw==/original/l07Whc.png">
      </div>

      <img alt="" src="https://img.itch.zone/aW1nLzIxMDc4NDMxLnBuZw==/original/3W4DMV.png">
    </div>

  `}/>

</ComponentPage>
