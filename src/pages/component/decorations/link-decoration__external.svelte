<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Decorate links pointing to external page/site.
  </p>

  <CodeEditor html={`

    <p>
      The source code for this project is available on the <a class="custom-link-ext" href="https://github.com/nndda/Pitch" target="_blank">GitHub repository</a>! Licensed under GNU AGPLv3 and CC0!
    </p>

  `}/>

</ComponentPage>
