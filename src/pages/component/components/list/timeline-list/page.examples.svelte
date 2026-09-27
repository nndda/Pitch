<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
</script>

<h2>Composing</h2>

<h3>Label</h3>

<p>
  Using <ComponentRef comp="Label" withCheckbox={true}/> to indicate the changes' type.
</p>

<Examples.changelogs__label/>

<h3>Read More</h3>

<p>
  The same example as above, but wrapped in <ComponentRef comp="Read More" withCheckbox={true}/> component:
</p>

<Examples.changelogs__read_more/>
