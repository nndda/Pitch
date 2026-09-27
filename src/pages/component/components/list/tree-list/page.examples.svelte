<script lang="ts">
  import { ComponentRef } from "@elements";

  import Examples from "./examples";
  import ExamplesDotLeader from "../../dot-leader/examples";
</script>

<p>
  Tree List with headings.
</p>

<Examples.heading/>

<p>
  Also see <ComponentRef comp="Tree List — Directory" withCheckbox={true}/> flavour.
</p>

<Examples.directory/>

<p>
  Combined with <ComponentRef comp="Dot Leader" withCheckbox={true}/> component.
</p>

<ExamplesDotLeader.dvorakh__tree_list/>
