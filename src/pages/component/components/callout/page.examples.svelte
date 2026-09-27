<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
  import ExamplesAccordion from "../accordion/examples";
</script>

<p>
  Nested Callout.
</p>

<Examples.nested/>

<h2>
  Composing
</h2>

<h3>
  In Development Sign
</h3>

<p>
  With <ComponentRef comp="In Development Sign" withCheckbox={true}/> as the heading.
</p>

<Examples.development__in_development_sign/>

<h3>
  Accordion
</h3>

<p>
  With <ComponentRef comp="Accordion" withCheckbox={true}/> inside.
</p>

<ExamplesAccordion.requirements__callout/>
