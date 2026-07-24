<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    In development sign for your in development project, to tell that your project is in development.
  </p>

  <CodeEditor html={`

    <div class="custom-indev">
      <div>🚧 IN DEVELOPMENT</div>
    </div>

    <br>

    <div class="custom-indev">
      <div>WORK IN PROGRESS</div>
    </div>

  `}/>

</ComponentPage>
