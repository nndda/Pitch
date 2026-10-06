<script lang="ts">
  import { ComponentRef } from "@elements";
  import Examples from "./examples";
</script>

<p>
  Basic Label usage.
</p>

<Examples.basic/>

<p>
  As a heading badge/label, using <code>&lt;small&gt;</code> element:
</p>

<Examples.heading/>

<p>
  Inline use in a <code>&lt;p&gt;</code> element:
</p>

<Examples.inline_paragraph/>

<p>
  Centered grouped container using <code>text-center</code> class, and increased <code>font-size</code> of <code>2em</code>:
</p>

<Examples.socials/>

<h2>Composing</h2>

<h3>Tooltip</h3>

<p>
  Same as above, but with the text moved inside <ComponentRef comp="Tooltip" withCheckbox={true}/> elements.
</p>

<Examples.socials__tooltip/>
