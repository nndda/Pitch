<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  import Header from "./home.header.svelte";
  import Footer from "./home.footer.svelte";

  import { Skeleton } from "@elements";
  import { runtimeSessionData } from "@runtime";
  import { ComponentSelectionChanged, event } from "@runtime/events";

  let sidebarRightToggleLabel: HTMLLabelElement
  ,   selectedCompsCount: number = $state(0)

  ,   catalogueRendered = $state(false)

  ,   catalogueSearchBar: HTMLInputElement
  ,   catalogueCategory = $state("All")

  ,   catalogueNoHacky = $state(false)
  ,   catalogueNoExperimental = $state(false)
  ;

  function updateCompCount() {
    selectedCompsCount = 0;

    for (const catId in runtimeSessionData.selectedCompCount) {
      selectedCompsCount += runtimeSessionData.selectedCompCount[catId];
    }
  }

  event.addEventListener(ComponentSelectionChanged, updateCompCount);

  interface RuntimeSearchData extends SearchKeys {
    el: HTMLElement,
    elHide(): void,
    elShow(): void,
  };

  const catSearchData: RuntimeSearchData[] = [];

  function initializeCatalogue() {
    import("fuse.js").then(({ default: Fuse }) => {

      for (const searchNode of document.querySelectorAll(".cat-container .comp-cat-searchable-data")) {
        const
          searchData: SearchKeys = JSON.parse(searchNode.getAttribute("data-search-key")!)
        , el = searchNode.parentElement as HTMLElement
        ;

        catSearchData.push(
          {
            el: el,
            elHide() { el.classList.add("hidden"); },
            elShow() { el.classList.remove("hidden"); },

            ...searchData,
          }
        )
      }

      // console.log(catSearchData);

      const fuse = new Fuse(catSearchData, {
        keys: [ "name", "keywords", ],
        threshold: 0.45,
      });

      // TODO: debounce or sm
      catalogueSearchBar.addEventListener("input", (ev) => {
        const keyword = (ev.currentTarget as HTMLInputElement).value;

        if (keyword.trim() === "") {

          for (const item of catSearchData) {
            item.elShow();
          }

        } else {

          for (const item of catSearchData) {
            item.elHide();
          }

          for (const result of fuse.search(keyword)) {
            result.item.elShow();
          }

        }
      });

      catalogueRendered = true;

    });
  }

  onMount(() => {
    const
      sidebarRightToggle = document.getElementById("sidebar-right-toggle") as HTMLInputElement
    ;

    sidebarRightToggleLabel = document.querySelector("label:has(#sidebar-right-toggle)") as HTMLLabelElement;

    if (sidebarRightToggle.checked) {
      sidebarRightToggle.click()
    }

    sidebarRightToggleLabel.classList.add("hidden");

    updateCompCount();
  });

  onDestroy(() => {
    sidebarRightToggleLabel.classList.remove("hidden");
  });
</script>

<style lang="scss">
  @use "./home.scss";

  :global .cat-container {
    &.cat-only- {
      &components {
        & .cat-el:not([data-cat="Components"]) {
          display: none;
        }
      }

      &decorations {
        & .cat-el:not([data-cat="Decorations"]) {
          display: none;
        }
      }

      &tweaks {
        & .cat-el:not([data-cat="Tweaks"]) {
          display: none;
        }
      }
    }

    &.cat-no- {
      &hacky {
        & .comp-cont.is-hacky {
          display: none;
        }
      }

      &experimental {
        & .comp-cont.is-experimental {
          display: none;
        }
      }
    }
  }
</style>

<article class="home">

  <Header/>

  <br>

  <div
    class="home-cat-heading custom-tip"
    class:disabled={!catalogueRendered}
  >
    {#if !catalogueRendered}
      <div class="custom-tip-content" style="min-width: 65%;">
        <div class="custom-indev">
          <div style="margin-inline: auto;">Loading catalogue</div>
        </div>
      </div>
    {/if}

    <i class="fa-solid fa-magnifying-glass"></i>
    <input
      type="text"
      placeholder="Search component"
      id="catalogue-search-bar"
      bind:this={catalogueSearchBar}
    />

    <select
      value={catalogueCategory}
      onchange={ev => {
        catalogueCategory = ev.currentTarget.value;
      }}
    >
      <option id="search-id-all" value="All">
        All
      </option>

      {#await import("@pitch/meta")}
        <option>Components</option>
      {:then { cat }}
        {#each cat as c}
          <option id="search-id-{c}" value={c}>
            {c}
          </option>
        {/each}
      {/await}
    </select>

    <!-- <div class="flex-space"></div> -->

    <div class="btn-group filter-group">
      <!--
      <label class="checkbox button button-check custom-tip">
        <input
          type="checkbox"
          name="filter-group"

          onchange={null}
        >

        <i class="fa-solid fa-star"></i>

        <span class="custom-tip-content">
          Favourited
        </span>
      </label>
      -->

      <label class="checkbox button button-check custom-tip">
        <input
          type="checkbox"
          name="filter-group"

          onchange={ev => {
            catalogueNoHacky = ev.currentTarget.checked;
          }}
        >

        <i class="fa-solid fa-flask"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Hacky Components
        </span>
      </label>

      <label class="checkbox button button-check custom-tip">
        <input
          type="checkbox"
          name="filter-group"

          onchange={ev => {
            catalogueNoExperimental = ev.currentTarget.checked;
          }}
        >

        <i class="fa-solid fa-vial"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Experimental Components
        </span>
      </label>
    </div>

    <div class="flex-space"></div>

    <span>{selectedCompsCount} selected</span>
  </div>

  <div
    class="cat-container"

    class:cat-only-components={catalogueCategory === "Components"}
    class:cat-only-decorations={catalogueCategory === "Decorations"}
    class:cat-only-tweaks={catalogueCategory === "Tweaks"}

    class:cat-no-hacky={catalogueNoHacky}
    class:cat-no-experimental={catalogueNoExperimental}
  >

    {#await Promise.all([
      import("./previews/components/index.svelte"),
    ])}

      <Skeleton/>

    {:then [ { default: PreviewCatalogueComponents }, ]}

      <div in:fade={{ duration: 500 }}>
        <PreviewCatalogueComponents/>
      </div>

      { initializeCatalogue() }

    {/await}

  </div>

  <Footer/>
</article>
