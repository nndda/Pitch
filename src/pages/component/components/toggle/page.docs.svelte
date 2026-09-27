<script lang="ts">
  import Examples from "./examples";
</script>

<p>
  Switch between two to up to five contents on your page.
</p>

<Examples.lang/>

<h2>Usage</h2>

<p>
  For each <code>&lt;a&gt;</code> elements with the class <code>.custom-toggle</code>, change the <code>href</code> attribute to includes your project page URL before the <code>#</code>. <br> i.e. from <code>#toggle-a</code> to <code>https://username.itch.io/project-name#toggle-a</code>.
</p>

<p>
  To add more content, add more <code>&lt;a&gt;</code> elements under <code>.custom-toggles</code>, and update the <code>toggle-*</code> on the <code>href</code> and <code>name</code> attributes appropriately.
</p>

<p>
  Each <code>toggle-*</code> represents its <code>.custom-content-*</code> container:
</p>

<ul>
  <li>
    If <code>toggle-a</code> is clicked <i class="fa-solid fa-arrow-right"></i> <code>.custom-content-a</code> will be shown
  </li>
  <li>
    If <code>toggle-b</code> is clicked <i class="fa-solid fa-arrow-right"></i> <code>.custom-content-b</code> will be shown
  </li>
  <li>
    and so on...<br>up until <code>toggle-e</code> <i class="fa-solid fa-arrow-right"></i> <code>.custom-content-e</code>
  </li>
</ul>

<blockquote class="custom-callout">

  <h4>Important Notes</h4>

  <p>
    This components comes with a few caveats and drawbacks:
  </p>

  <ul>
    <li>
      Contains unconventional CSS/HTML codes and/or implementation.
    </li>

    <li>
      The page will "jump" to the Toggle's button element, when it is clicked.
    </li>

    <li>
      Everytime the Toggle switched content, it will piles on the browser's history and cluttering it, if it were switched many times.
    </li>

    <li>
      If you change the project's URL, or the username of the project's host, you have to change the <code>href</code> of <code>a.custom-toggle</code> accordingly.
    </li>
  </ul>

</blockquote>
