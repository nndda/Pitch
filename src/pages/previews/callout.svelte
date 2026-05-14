<script>
  const props = $props();
  import { ComponentRef } from "../component/_template/components";
</script>

<div class="comp-cont {props.class ?? ""}">
  <div class="preview">
    <ComponentRef comp="Callout"/>
  </div>

  <blockquote class="custom-callout">

    <h3>⚠ Content Warning</h3>

    <p>
      This project contains the following:
      <br>
      Strong language, mild violence, blood, and flashing lights.
    </p>

  </blockquote>
</div>
