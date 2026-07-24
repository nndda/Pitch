<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    👉👈
  </p>

  <CodeEditor html={`

    <p style="font-size: 2em;">
      rate plzzzzz?? 🥺 <span class="custom-plzzz"></span>
    </p>

  `}/>

</ComponentPage>
