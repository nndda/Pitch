<script lang="ts">
  import Accordion from "./accordion.svelte";
  import InfoList from "./info-list.svelte";
  import Callout from "./callout.svelte";
  import Labels from "./labels.svelte";
  import SpeedDial from "./speed-dial.svelte";
  import DotLeader from "./dot-leader.svelte";
  import TimelineList from "./timeline-list.svelte";
  import TreeList from "./tree-list.svelte";
  import Table from "./table.svelte";
</script>

<style lang="scss">
  .preview-grid {
    display: grid;
    grid-template-columns: repeat(4, 25%);
  }

  :global {
    .span-2 {
      grid-column: span 2;
    }
    .span-3 {
      grid-column: span 3;
    }
    .span-4 {
      grid-column: span 4;
    }
  }

  :global .comp-cont {
    position: relative;
    margin: .35em;
    padding: 1em;
    padding-top: 3em;
    border-radius: 7px;
    background: var(--b);

    & > .preview {
      & > button {
        position: absolute;
        top: 1em;
        left: 1em;
        opacity: .5;
      }
    }

    & a {
      color: var(--l) !important;

      &.custom-lb {
        color: var(--fg) !important;
      }
    }
  }

</style>

<div class="preview-grid-wrapper">

  <div class="preview-grid">

    <Labels/>
    <InfoList/>
    <Accordion class="span-2"/>
    <Callout class="span-2"/>
    <TreeList/>
    <SpeedDial/>
    <DotLeader class="span-2"/>
    <TimelineList class="span-2"/>
    <Table class="span-4"/>

  </div>

</div>
