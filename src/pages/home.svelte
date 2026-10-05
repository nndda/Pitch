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
  ;

  function updateCompCount() {
    selectedCompsCount = 0;

    for (const catId in runtimeSessionData.selectedCompCount) {
      selectedCompsCount += runtimeSessionData.selectedCompCount[catId];
    }
  }

  event.addEventListener(ComponentSelectionChanged, updateCompCount);

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
</style>

<article class="home">

  <Header/>

  <br>

  <div class="home-cat-heading custom-tip">
    <div class="custom-tip-content" style="min-width: 65%;">
      <div class="custom-indev">
        <div style="margin-inline: auto;">Section in development</div>
      </div>
    </div>

    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" placeholder="Search component"/>

    <select>
      <option id="search-id-all">
        All
      </option>

      {#await import("@pitch/meta") then { cat }}
        {#each cat as c}
          <option id="search-id-{c}">
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

          onchange={null}
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
          onchange={null}
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

  <div class="cat-container">

    {#await Promise.all([
      import("./previews/components/index.svelte"),
    ])}

      <Skeleton/>

    {:then [ {default: PreviewCatalogueComponents}, ]}

      <div in:fade={{ duration: 500 }}>
        <PreviewCatalogueComponents/>
      </div>

    {/await}

  </div>

  <Footer/>
</article>
