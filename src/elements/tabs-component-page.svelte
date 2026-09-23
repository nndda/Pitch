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
      PageExamples: Component | null,
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
    ...(PageExamples ? [
      {
        name: "Examples",
        icon: "fa-solid fa-folder-open",
      },
    ] : []),
    {
      name: "flex-space",
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
  {:else if PageExamples && currentTab === "Examples"}
    <PageExamples/>
  {:else if currentTab === "Source Code"}
    <CodeViewerCSS
      css={data.css.raw}
      noDedent={true}
    />
  {/if}
</article>
