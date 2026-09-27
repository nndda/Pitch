<script lang="ts">
  import Examples from "./examples";
</script>

<p>
  Little snippet that pops up when hovered.
</p>

<Examples.abbr/>

<h2>Positioning</h2>

<p>
  The Tooltip content is positioned at the bottom by default. To change its position, add one of these class to the <code>.custom-tip-content</code> element:
</p>

<ul>
  <li>
    <code>custom-top</code>
  </li>
  <li>
    <code>custom-left</code>
  </li>
  <li>
    <code>custom-right</code>
  </li>
</ul>

<Examples.positioning/>

<h2>Multiple Tooltip Contents</h2>

<p>
  You can have multiple Tooltip content on an element, as long as each of its position is different.
</p>

<Examples.multiple/>

<h2>A Note on Spacing and Positioning</h2>

<p>
  Make sure to position and space the Tooltip element correctly among your page's contents and layout, so that the Tooltip content can be seen on any screen size correctly.
</p>

<p>
  You might want to set <code>overflow: visible;</code> on <code>.inner_column</code> so that the Tooltip won't get clipped, if it gets out of the page's boundary.
</p>
