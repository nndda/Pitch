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

<style lang="scss">
  @use "../styles/variables" as *;
  @use "sass:color";

  article > h1:first-child {
    opacity: 0;
    height: 0;
    // color: color.mix($text-col, $background, 40%);
    // font-weight: 200;
    // font-size: 1.8em;
    // margin-block: 1em;
  }
</style>

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
  <h1>{currentTab}</h1>

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
