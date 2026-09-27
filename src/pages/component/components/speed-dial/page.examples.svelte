<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
</script>

<h2>Composing</h2>

<h3>Tooltip</h3>

<p>
  Every buttons on Speed Dial were designed to only have icon. To label the button, pair it with the <ComponentRef comp="Tooltip" withCheckbox={true}/> component.
</p>

<Examples.basic__tooltip/>
