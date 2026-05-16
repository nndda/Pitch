<script>
  const props = $props();
  import { ComponentRef } from "../component/_template/components";
</script>

<div class="comp-cont {props.class ?? ""}">
  <div class="preview">
    <ComponentRef comp="Tree List"/>
  </div>

  <ul class="custom-tree">
    <li>
      Plant-based
      <ul class="custom-tree-dashed">
        <li>
          Fruits
          <ul>
            <li>Salak</li>
            <li>Mangosteen</li>
          </ul>
        </li>
        <!-- <li>
          Veggies
          <ul>
            <li>Salsify</li>
            <li>Kohlrabi</li>
          </ul>
        </li> -->
      </ul>
    </li>
    <li>
      Animal-based
      <ul class="custom-tree-dotted">
        <li>Beef</li>
        <li>Jellyfish</li>
      </ul>
    </li>
  </ul>
</div>
