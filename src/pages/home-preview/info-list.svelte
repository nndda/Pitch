<script>
  const props = $props();
</script>

<div class="comp-cont {props.class ?? ""}">
  <button class="preview">
    Info List
  </button>

  <dl class="custom-info">

    <dt>Story</dt>
    <dd>
      <a target="_blank" href="https://itch.io">Witty writer</a>
    </dd>


    <dt>Arts</dt>
    <dd>
      <!-- <a target="_blank" href="https://itch.io">Illustrious illustrator</a> -->
        <!-- <br> -->
      <a target="_blank" href="https://itch.io">Adorable assets</a>
    </dd>


    <dt>Codes</dt>
    <dd>
      <a href="https://itch.io/">Proficient programmer</a>
    </dd>


    <dt>Labels</dt>
    <dd>
      <span class="custom-lb">some</span>
      <i class="custom-lb">labels</i>
    </dd>


    <dt>Shortcut</dt>
    <dd>
      <kbd>CTRL</kbd> + <kbd>F</kbd>
    </dd>

  </dl>
</div>
