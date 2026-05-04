<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeHTML } from "../_template/components";
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
