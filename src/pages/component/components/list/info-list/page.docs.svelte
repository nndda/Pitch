<script lang="ts">
  import Examples from "./examples";
</script>

<p>
  Custom class that style description list element to two-column layout.
</p>

<Examples.basic/>

<h2>Multiple Items</h2>

<p>
  Add new item by adding another <code>&lt;dd&gt;</code>.
</p>

<Examples.line_breaks/>

<blockquote class="custom-callout">
  <h3>
    <i class="fa-solid fa-info-circle"></i>
    Title/Info Column
  </h3>

  <p>
    Text on the left column (the key/name/title field) will not wrap.
  </p>
</blockquote>

<Examples.wrapping/>

<p>
  If you'd like to have the left-column text wrapped, add the following CSS in this preview.
</p>

<Examples.wrapping_enabled/>

<h2>Aligning</h2>

<p>
  Info List are center-aligned by default. Add class <code>custom-left</code> to align it to the left.
</p>

<Examples.basic_left_aligned/>
