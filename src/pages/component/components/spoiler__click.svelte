<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Hide any lines of text. Click it to show the content.
  </p>

  <CodeEditor html={`

    <div>
      The one who stole Nina's muffins was
      <div class="custom-hd-click"><details><summary>
        Mr. Snuffles.
      </summary></details></div>
    </div>

  `}/>

  <CodeEditor html={`

    <div>
      The killer is
      <div class="custom-hd-click"><details><summary>
        pretty sus
      </summary></details></div>.
      I'm shocked, shocked I say!
    </div>

  `}/>

</ComponentPage>
