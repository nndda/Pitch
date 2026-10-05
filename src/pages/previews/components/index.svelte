<script lang="ts">
  import { PreviewCatalogue } from "@elements";

  import Accordion from "./accordion.svelte";
  import InfoList from "./info-list.svelte";
  import Callout from "./callout.svelte";
  import CodeBlock from "./code-block.svelte";
  import Input from "./input.svelte";
  import Labels from "./labels.svelte";
  import SpeedDial from "./speed-dial.svelte";
  import SpoilerOnHover from "./spoiler-on-hover.svelte";
  import DotLeader from "./dot-leader.svelte";
  import TimelineList from "./timeline-list.svelte";
  import TreeList from "./tree-list.svelte";
  import TreeListDirectory from "./tree-list.directory.svelte";
  import Table from "./table.svelte";
</script>

<PreviewCatalogue cat="Components">

  <Labels/>
  <InfoList/>
  <Accordion class="span-2"/>
  <Callout class="span-2"/>
  <TreeList/>
  <SpeedDial/>
  <DotLeader class="span-2"/>
  <TimelineList class="span-2"/>
  <Input/>
  <SpoilerOnHover/>
  <TreeListDirectory class="span-2"/>
  <Table class="span-4"/>
  <CodeBlock class="span-4"/>

</PreviewCatalogue>
