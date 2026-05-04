<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeHTML } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Hide any lines of text. Hover over it to show the content.
  </p>

  <CodeHTML html={`

    <p>
      The one who stole Nina's muffins was
      <span class="custom-hd">
        Mr. Snuffles.
      </span>
    </p>

  `}/>

  <CodeHTML html={`

    <p>
      The killer is
      <span class="custom-hd">
        pretty sus
      </span>.
      I'm shocked, shocked I say!
    </p>

  `}/>

</ComponentPage>
