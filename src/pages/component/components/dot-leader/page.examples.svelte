<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
</script>

<p>
  Nested Dot Leader list with heading.
</p>

<Examples.pricing_nested_heading/>

<h2>Composing</h2>

<p>
  With <ComponentRef comp="Tree List" withCheckbox={true}/> component.
</p>

<Examples.dvorakh__tree_list/>
