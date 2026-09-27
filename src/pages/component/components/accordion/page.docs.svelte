<script lang="ts">
  import Examples from "./examples";
</script>

<p>
  Turn walls of texts into list of collapsible contents. It’s basically just a styled list of <code>&lt;details&gt;</code> elements.
</p>

<Examples.faq/>

<p>
  You can also add elements other than <code>&lt;details&gt;</code> directly inside <code>.custom-accrd</code>. Like a header or footer:
</p>

<Examples.faq_with_heading/>
<Examples.license/>

<h2>Sizing</h2>

<p>
  Adjust the width manually by overriding its <code>max-width</code> property.
</p>

<Examples.widths/>
