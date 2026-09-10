<script lang="ts">
  import { onMount, tick } from "svelte";
  import { fade } from "svelte/transition";

  import { IconTooltip } from "../pages/elements";
  import { currentPage, tocHeadings, generateToC } from "../states/page.svelte";
  import { project, projectUpdate } from "../storage/db";
  import ComponentInput from "../pages/elements/input.svelte";

  let
    tocWrapper: HTMLElement
  ;

  onMount(() => {
    const
      initialToCState = true
      // initialToCState = ui.state["toc-collapsed"] ?? true
    , mut = new MutationObserver(generateToC);
    ;

    (document.getElementById("toc-toggle") as HTMLInputElement).checked = !initialToCState;
    tocWrapper.classList.toggle(
      "collapsed",
      initialToCState,
    );


    tick().then(() => {
      mut.observe(
        document.getElementById("wrapper")!,
        {
          childList: true,
          subtree: true,
          attributes: true,
        },
      );
    });
  });
</script>

<main id="viewer">
  <header>

    {#key currentPage.componentData}
      {#if currentPage.componentData}

        {@const { catId, compId }: {
          catId: string,
          compId: string
        } = currentPage.attr}

        <div class="heading-comp-actions">

          <input
            type="checkbox"
            id="heading-comp-incl"

            checked={
              $project?.components[catId][compId] ?? false
            }

            onchange={async ev => {
              await currentPage.componentData?.api?.toggleInclude(ev.currentTarget.checked);
            }}
          >

          <label class="checkbox fave" for="heading-comp-incl">

            <IconTooltip
              icon="fa-regular fa-square-plus"
              tooltip="Add"

              elClass="checked-not"
            />

            <IconTooltip
              icon="fa-solid fa-square-check"
              tooltip="Remove"

              elClass="checked"
            />

          </label>

          <input
            type="checkbox"
            id="heading-comp-fave"

            checked={$project?.faves[compId] ?? false}

            onchange={async ev => {
              await currentPage.componentData?.api?.toggleFavourite(ev.currentTarget.checked);
            }}
          >

          <label class="checkbox fave" for="heading-comp-fave">

            <IconTooltip
              icon="fa-regular fa-star"
              tooltip="Favourite"

              elClass="checked-not"
            />

            <IconTooltip
              icon="fa-solid fa-star"
              tooltip="Un-favourite"

              elClass="checked"
            />

          </label>

        </div>
      {/if}
    {/key}

    <h1 class="page-heading">
      <i
        class="page-icon {currentPage.icon}"
      ></i>
      {currentPage.title}
    </h1>

    <div class="flex-space"></div>

    <input
      type="checkbox"
      class="toggle"
      id="toc-toggle"
      aria-label="Table of Content"

      onchange={async ev => {
        // TODO: I think ToC states are not working :/

        const tocCollapsed = !ev.currentTarget.checked;

        await projectUpdate({ ["app.uiState.TOCCollapsed"]: tocCollapsed});

        tocWrapper.classList.toggle("collapsed", tocCollapsed);

      }}
    >
    <label class="button button-check custom-tip" for="toc-toggle">
      <i class="fa-solid fa-table-list"></i>

      <span class="custom-tip-content custom-left">
        Table of content
      </span>
    </label>
  </header>

  <div class="split">

    <section id="wrapper">

      <!-- NOTE: not sure if relying on `title` is enough :/ -->
      {#key currentPage.title}
        {#if currentPage.content}
          {#await currentPage.content() then Page}

            <div
              id="page"
              in:fade={{ duration: 200 }}
              out:fade={{ duration: 150 }}
            >

              <Page
                data={currentPage.componentData?.manifest}
                {...currentPage.attr}
              />

            </div>

          {/await}
        {/if}
      {/key}
    </section>

    <nav
      id="toc"
      bind:this={tocWrapper}
    >
      {#key currentPage.content}
        <div
          class="toc-inner"

          in:fade={{ duration: 200 }}
          out:fade={{ duration: 150 }}
        >

          {#if currentPage.componentData?.manifest.input}

              <ComponentInput
                data={
                  currentPage.componentData.manifest as ComponentData & { input: ComponentUserInputItem[] }
                }
                inputs={$project?.inputs ?? {}}
              />

          {/if}

          <br>

          <h2>Table of content</h2>

          <hr>

          <h3>{currentPage.title}</h3>

          {#key tocHeadings}
            <ul id="toc-content">
              {#each tocHeadings as el}
                <li
                  class="lv-{parseInt(el.tagName.at(1)!)}"
                >
                  <button class="icon-only">
                    {el.textContent}
                  </button>
                </li>
              {/each}
            </ul>
          {/key}

        </div>
      {/key}
    </nav>

  </div>
</main>
