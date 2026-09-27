<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
</script>

<p>
  Alternating colors on each item for longer list.
</p>

<Examples.long_alternating/>

<h2>Composing</h2>

<h3>Callout</h3>

<p>
  Wrapped inside <ComponentRef comp="Callout" withCheckbox={true}/>.
</p>

<Examples.requirements__callout/>
