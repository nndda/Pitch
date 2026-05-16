<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Compare 2 images together. Slide the handle on the bottom of the images.
  </p>

  <CodeEditor html={`

    <div class="custom-img-compare">
      <div>
        <img alt="" src="https://img.itch.zone/aW1nLzIxMDc4NDIzLnBuZw==/original/l07Whc.png">
      </div>

      <img alt="" src="https://img.itch.zone/aW1nLzIxMDc4NDMxLnBuZw==/original/3W4DMV.png">
    </div>

  `}/>

</ComponentPage>
