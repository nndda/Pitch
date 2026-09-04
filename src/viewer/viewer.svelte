<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { IconTooltip } from "../pages/elements";
  import { currentPage } from "../states/page.svelte";
  import { project, projectUpdate } from "../storage/db";
  import { generateToC } from "./toc";

  let
    tocContent: HTMLUListElement = $state()!
  , tocWrapper: HTMLElement
  ;

  $effect(() => {
    generateToC(tocContent, currentPage.title);
  });

  onMount(() => {
    const
      initialToCState = true
      // initialToCState = ui.state["toc-collapsed"] ?? true
    ;

    (document.getElementById("toc-toggle") as HTMLInputElement).checked = !initialToCState;
    tocWrapper.classList.toggle(
      "collapsed",
      initialToCState,
    );
  });
</script>

<main id="viewer">
  <header>
    <!-- <button
      id="page-prev"
      class="icon-onlyb"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button> -->

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

    <!-- <button
      id="page-prev"
      class="icon-onlyb"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button> -->

    <!-- <div class="flex-space"></div> -->

    <!-- <div class="hr-v"></div> -->

    <div class="flex-space"></div>

    <div class="social-link-cont">
      {#each [
        {
          name: "Bluesky",
          url: "bsky.app/profile/nnda.dev",
          icon: "bluesky"
        },
        {
          name: "Patreon",
          url: "www.patreon.com/nnda",
          icon: "patreon"
        },
        {
          name: "Ko-fi",
          url: "ko-fi.com/nnda",
          icon: "ko-fi"
        },
        {
          name: "itch.io",
          url: "nnda.itch.io/",
          icon: "itch-io"
        },
        {
          name: "GitHub",
          url: "github.com/nndda/Pitch",
          icon: "github"
        },
      ] as { name, url, icon }}
        <a
          target="_blank"
          href="https://{url}"
          rel="nofollow noopener"
          class="social-link custom-tip button"
        >
          <i class="fa-brands fa-{icon}"></i>
          <span class="custom-tip-content">
            {name}
          </span>
        </a>
      {/each}
    </div>

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

        if (ev.currentTarget.checked) {
          generateToC(tocContent, currentPage.title);
        }
      }}
    >
    <label class="button button-check custom-tip" for="toc-toggle">
      <i class="fa-solid fa-table-list"></i>

      <span class="custom-tip-content custom-left">
        Table of content
      </span>
    </label>
  </header>

  <!-- <hr> -->

  <div class="split">

    <section id="wrapper">

      <!-- NOTE: not sure if relying on `title` is enough :/ -->
      {#key currentPage.title}

        {#if currentPage.content}
          {#await currentPage.content() then Page}

            <!--
            <div
              id="viewer-loading"
            >

              <strong>
                Loading ...
              </strong>

            </div>
            -->

          <!-- {:then Page} -->

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

          <!-- {:catch err} -->

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

          <br>

          <h2>Table of content</h2>

          <hr>

          <h3>{currentPage.title}</h3>
          <ul id="toc-content" bind:this={tocContent}></ul>

        </div>
      {/key}
    </nav>

  </div>
</main>
