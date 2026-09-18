<script lang="ts">
  import type { Component } from "svelte";
  import { CodeViewerCSS, Tabs } from "@elements";

  const
    {
      data,
      PageDocumentation,
      PageExamples,
    }: {
      data: ComponentData,
      PageDocumentation: Component,
      PageExamples: Component,
    } = $props()
  ;

  let currentTab = $state("Documentation");
</script>

<Tabs
  name={data.nameDisplay ?? data.name}

  data={[
    {
      name: "Documentation",
      icon: "fa-solid fa-book-bookmark",
    },
    {
      name: "Examples",
      icon: "fa-solid fa-folder-open",
    },
    {
      name: "Source Code",
      icon: "fa-solid fa-code",
    },
  ]}

  onactive={name => {
    currentTab = name;
  }}
/>

<article>
  {#if currentTab === "Documentation"}
    <PageDocumentation/>
  {:else if currentTab === "Examples"}
    <PageExamples/>
  {:else if currentTab === "Source Code"}
    <CodeViewerCSS css={data.css.raw}/>
  {/if}
</article>
