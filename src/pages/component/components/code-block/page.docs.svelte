<script lang="ts">
  import { CodeEditor } from "@elements";
  import Examples from "./examples";
</script>

<p>
  Code block component with number lines on the side.
</p>

<CodeEditor html={`

<div class="custom-code"><code>
</code><code>.custom-uwu &#123;
</code><code>  color: darkblue;
</code><code>  background: cyan;
</code><code>&#125;
</code><code>
</code></div>

`}/>

<h2>Highlight Lines</h2>

<p>
  Highlight lines by adding <code>custom-hl</code> class to the <code>&lt;code&gt;</code> line.
</p>

<Examples.theatre/>
