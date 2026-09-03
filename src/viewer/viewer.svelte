<script lang="ts">
  import { onMount } from "svelte";

  import { currentPage } from "../states/page.svelte";

  import { projectUpdate } from "../storage/db";
  import { generateToC } from "./toc";

  let
    tocContent: HTMLUListElement
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
      {#if currentPage.content}
        {#await currentPage.content()}

          <strong>
            Loading ...
          </strong>

        {:then Page}

          <Page
            data={currentPage.componentData}
            {...currentPage.attr}
          />

        {:catch err}

        {/await}
      {/if}
    </section>

    <nav
      id="toc"
      bind:this={tocWrapper}
    >
      <div class="toc-inner">
        <h1>Table of content</h1>

        <hr>

        <h2>{currentPage.title}</h2>

        <ul id="toc-content" bind:this={tocContent}>

        </ul>
      </div>
    </nav>

  </div>
</main>
