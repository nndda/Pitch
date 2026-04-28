<script>
  const props = $props();
</script>

<div class="comp-cont {props.class ?? ""}">
  <button class="preview">
    Callout
  </button>

  <blockquote class="custom-callout">

    <h3>⚠ Content Warning</h3>

    <p>
      This project contains the following:
      <br>
      Strong language, mild violence, blood, and flashing lights.
    </p>

  </blockquote>
</div>
