<script lang="ts">
  import { onMount, type Component } from "svelte";

  import { project } from "@db";
  import { LabelScopes } from "./labels/";
  import { TabsComponentPage } from "@elements";
  import { tagsData } from "@pitch/meta";

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

  onMount(() => {
    document.getElementById("wrapper")!.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
</script>

<style lang="scss">
  @use "./page.scss";
</style>

{#if data.tags}
  <ul class="page-header-list">
    {#each data.tags as tag}
      <li class="note">
        <b class="label {tag}">
          <i class="{tagsData[tag].icon}"></i>
          <span>
            {tag}
          </span>
        </b>
        <p>{tagsData[tag].desc}</p>
      </li>
    {/each}
  </ul>
{/if}

{#if data.notes}
  <ul class="page-header-list">
    {#each data.notes as note}
      <li class="note">
        <b class="label note">
          <span>
            Note
          </span>
        </b>
        <p>
          {@html note}
        </p>
      </li>
    {/each}
  </ul>
{/if}

{#if $project}

<div
  class="heading"
  data-comp-name={data.nameDisplay ?? data.name}
>
  <div class="labels">
    <LabelScopes componentData={data}/>
  </div>

<!--
  <div class="flex-space"></div>

  <div class="comp-btns">
    CSS source
    <ul class="buttons-list">
      <li>
        <button
          class="custom-tip"
          onclick={() => {
            copyStr(data.css.raw);
          }}
        >
          <i class="icon fa-solid fa-copy"></i>
          <span class="custom-tip-content">
            Copy
          </span>
        </button>
      </li>
      <li>
        <button class="custom-tip">
          <i class="icon fa-solid fa-eye"></i>
          <span class="custom-tip-content">
            View
          </span>
        </button>
      </li>
    </ul>
  </div>
-->

</div>

<TabsComponentPage
  data={data}
  PageDocumentation={PageDocumentation}
  PageExamples={PageExamples}
/>

{/if}
