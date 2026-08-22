<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Custom class that modifies ordered list element to stands out more.
  </p>

  <p>
    Consists (and <i>require</i>) one heading element, as the first child of the <code>&lt;li&gt;</code> elements.
  </p>

  <CodeEditor html={`

    <ol class="custom-steps">
      <li>
        <h3>Download</h3>

        <p>
          Download the game/tool/cool stuff from the download page.
        </p>
      </li>

      <li>
        <h3>Install</h3>

        <p>
          Extract the content of the downloaded file.
        </p>
      </li>

      <li>
        <h3>Have fun :)</h3>

        <p>
          Double click the file, and have fun :)
        </p>
      </li>
    </ol>

  `}/>

</ComponentPage>
