<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
  import ExamplesLabel from "../label/grouped/examples";
  import ExamplesSpeedDial from "../speed-dial/examples";
</script>

<p>
  Multiple Tooltip for an image, with custom text alignments for the contents:
</p>

<Examples.image/>

<h2>Composing</h2>

<h3>Label</h3>

<p>
  Tooltip on grouped <ComponentRef comp="Label" withCheckbox={true}/> components.
</p>

<ExamplesLabel.socials__tooltip/>

<h3>Speed Dial</h3>

<p>
  Tooltip use on <ComponentRef comp="Speed Dial" withCheckbox={true}/> component.
</p>

<ExamplesSpeedDial.basic__tooltip/>
