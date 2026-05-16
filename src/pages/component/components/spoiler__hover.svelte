<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Hide any lines of text. Hover over it to show the content.
  </p>

  <CodeEditor html={`

    <p>
      The one who stole Nina's muffins was
      <span class="custom-hd">
        Mr. Snuffles.
      </span>
    </p>

  `}/>

  <CodeEditor html={`

    <p>
      The killer is
      <span class="custom-hd">
        pretty sus
      </span>.
      I'm shocked, shocked I say!
    </p>

  `}/>

</ComponentPage>
