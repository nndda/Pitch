<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Decorate links pointing to itch.io profile page.
  </p>

  <CodeEditor html={`

    <p>
      Check out my itch.io profile <a class="custom-link-itch" href="https://nnda.itch.io" target="_blank">nnda</a>.
    </p>

  `}/>

</ComponentPage>
