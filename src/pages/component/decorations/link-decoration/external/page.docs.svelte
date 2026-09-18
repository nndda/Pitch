<script lang="ts">
  import { CodeEditor } from "@elements";
</script>

<p>
  Decorate links pointing to external page/site.
</p>

<CodeEditor html={`

  <p>
    The source code for this project is available on the <a class="custom-link-ext" href="https://github.com/nndda/Pitch" target="_blank">GitHub repository</a>! Licensed under GNU AGPLv3 and CC0!
  </p>

`}/>
