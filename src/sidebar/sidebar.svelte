<script lang=ts>
  import {
    onMount,
    type Component,
  } from "svelte";

  // TODO: move everything that can be moved to script

  import {
    getPages,
    pitchVer,
  } from "./sidebar";

  import {
    state,
    backToHome,
    switchPage,
  } from "../states/components.svelte";

  import {
    initiateBooleanStorageAPI,

    type BooleanStorageAPI,
  } from "../states/storage.svelte";

  import slugify from "slugify";
  slugify.extend({
    "👉": "uw",
    "👈": "wu",
  });

  // TODO: pile all page-type component to a single entry
  // Pages
  // Resources
  import OtherResources from "../pages/resources/other-resources.svelte";
  import Showcase from "../pages/resources/showcase.svelte";

  type SinglePageEntry = {
    title: string,
    icon: string,
    page: Component | null,
  }

  type PageEntry = Record<string, {src: string, comp: Component}[]>

  type PageComponentImport = Record<string, Component>

  const pagesCatId: string[] = [];
  const pagesCatIdSlug: string[] = [];

  const
    pages: PageEntry = 
      {
        Components: getPages( import.meta.glob("/pages/component/components/*.svelte", { eager: true, }) as PageComponentImport ),
        Decorations: getPages( import.meta.glob("/pages/component/decorations/*.svelte", { eager: true, }) as PageComponentImport ),
      }

  , pagesIcon: Record<string, string> = {
      Components: "fa-solid fa-bars-progress",
      Decorations: "fa-solid fa-paint-roller",
    }
  ;

  const compSelections: Record<string, BooleanStorageAPI> = {};
  const {
    state: compFaves,
    update: updateCompFaves,
  }: BooleanStorageAPI = initiateBooleanStorageAPI("pitchv3-faves");

  const compCheckboxCache: Record<string, Record<string, HTMLInputElement>> = {};

  const uiState: BooleanStorageAPI = initiateBooleanStorageAPI("pitchv3-uistate");

  const catSelectionButtonCache: Record<string, HTMLButtonElement> = {};
  function updateCatSelectionState(catId: string): void {
    let
      selected: number = 0
    , total: number = 0
    ;

    for (const compId in compSelections[catId].state) {
      total += 1;
      if (compSelections[catId].state[compId]) selected += 1;
    }

    if (!Object.hasOwn(catSelectionButtonCache, catId)) {
      catSelectionButtonCache[catId] = document.getElementById(catId) as HTMLButtonElement;
    }

    // TODO: optimize attributes logic
    catSelectionButtonCache[catId].setAttribute("aria-label", "Clear selection");
    catSelectionButtonCache[catId].setAttribute("data-status", "select-none");

    if (selected == 0) { // select all
      // button is 'empty square'
      catSelectionButtonCache[catId].setAttribute("data-status", "select-all");
      catSelectionButtonCache[catId].setAttribute("aria-label", "Select All");

      catSelectionButtonCache[catId].setAttribute("data-icon", "fa-square");

    } else if (selected === total) { // clear all selections
      // button is 'checkmark square'
      catSelectionButtonCache[catId].setAttribute("data-icon", "fa-square-check");

    } else { // also clear all selection(s)
      // button is 'minus square'
      catSelectionButtonCache[catId].setAttribute("data-icon", "fa-square-minus");

    }

    compSelections[catId].updateAll();
  }


  // bruh
  // TODO: optimize setup/initialization
  for (const cat in pages) {

    const catId: string = "cat-" + slugify(cat, { lower: true, });

    compCheckboxCache[catId] = {};
    
    pagesCatId.push(cat);
    pagesCatIdSlug.push(catId);
    
    compSelections[catId] = initiateBooleanStorageAPI(`pitchv3-comps-${catId}`);

    for (const page in pages[cat]) {
      const { src, comp } = pages[cat][page];
      const compData: ComponentData = comp.data;

      if (compData.scopes !== "group-only") {
        // @ts-ignore
        const compId: string = catId + slugify("--" + compData.name, { lower: true, });

        compSelections[catId].state[compId] = compSelections[catId].state[compId] ?? false
      }

    }

    compSelections[catId].updateAll();
  }

  onMount((): void => {
    for (const catId of pagesCatIdSlug) {
      updateCatSelectionState(catId);
    }
  });

</script>


{#snippet PageListItem(
  id: string,
  label: string,
  icon: string,
  onchange: any = null,
)}

  {@const chkId: string = slugify(`chk-${id}`)}

  <li class="comp-item">
    <i class="{icon}"></i>

    <input
      type="radio"
      id="{chkId}"
      name="page-view"
      onchange={onchange}
    >
    <label
      class="comp-name-label"
      for="{chkId}"
    >
      {label}
      <!-- TODO: there has to be a better way -->
      {#if id === "support"}
        <!-- &nbsp; ❤️ -->
        <span class="custom-plzzz"></span>
      {/if}
    </label>
  </li>

{/snippet}

{#snippet HeadingCatToggle(
  id: string,
)}

  {@const catId: string = `cat-heading-${id}`}

    <input
      type="checkbox"
      class="toggle"
      id="{catId}"

      checked={uiState.state[catId] ?? false}

      onchange={(ev) => {
        uiState.update(catId, ev.currentTarget.checked);
      }}
    >
    <label class="caret-toggle" for="{catId}">
      <i class="fa-solid fa-caret-down"></i>
    </label>

{/snippet}

<nav id="sidebar">
  <div class="page-lists">

    <h1 class="cat-heading pitch-title">
      <img class="logo" alt="Pitch logo" src="/assets/pitch-icon-s.png">
      <span class="text">
        Pitch
        <small>
          v{pitchVer}
        </small>
      </span>
    </h1>

    <hr>

    <ul>
      {@render PageListItem(
        "home",
        "Home",
        "fa-solid fa-house",
        backToHome,
      )}

      {@render PageListItem(
        "support",
        "Support Me?",
        "fa-solid fa-heart",
        backToHome,
      )}
    </ul>

    <h2 class="cat-heading">
      <span class=text>
        Resources
      </span>

      {@render HeadingCatToggle("resources")}
    </h2>

    <ul>
      {#each <SinglePageEntry[]>[

        {
          title: "Getting Started",
          icon: "fa-solid fa-book-bookmark",
          page: null,
        },

        {
          title: "itch.io's HTML quirks",
          icon: "fa-solid fa-book-bookmark",
          page: null
        },

        {
          title: "Other Resources",
          icon: "fa-solid fa-box-open",
          page: OtherResources,
        },

        {
          title: "Showcase",
          icon: "fa-solid fa-star",
          page: Showcase,
        },

      ] as { title, icon, page, } }

        {@render PageListItem( slugify(title), title, icon, switchPage( title, page as Component ), )}

      {/each}
    </ul>

    <hr>

    <div class="btn-group filter-group">
      <span>
        <i class="fa-solid fa-filter"></i>
        Filter
      </span>

      <input type="checkbox" name="filter-group" id="faved">
      <label class="button button-check custom-tip" for="faved">
        <i class="fa-solid fa-star"></i>

        <span class="custom-tip-content">
          Favourited
        </span>
      </label>

      <input type="checkbox" name="filter-group" id="non-hacky">
      <label class="button button-check custom-tip" for="non-hacky">
        <i class="fa-solid fa-flask"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Hacky Components
        </span>
      </label>

      <input type="checkbox" name="filter-group" id="non-experimental">
      <label class="button button-check custom-tip" for="non-experimental">
        <i class="fa-solid fa-vial"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Experimental Components
        </span>
      </label>
    </div>

    {#each pagesCatId as cat, i }

      {@const catId: string = pagesCatIdSlug[i]}
      {@const catComponentList: string = `comp-list-${catId}`}

      {@const catComponentInputName: string = `cat-inp-${catId}`}

      <h2 class="cat-heading cat-comp">
        <i class="icon {pagesIcon[cat]}"></i>

        <span class="text">
          {cat}
        </span>

        {@render HeadingCatToggle(catId)}

        <button
          id="{catId}"
          class="cat-toggle icon-only"

          onclick={(ev) => {
            const checked: boolean = ev.currentTarget.getAttribute("data-status") as string === "select-all";

            for (const compChk in compCheckboxCache[catId]) {
              compCheckboxCache[catId][compChk].checked = checked;

              compSelections[
                ev.currentTarget.id
              ].state[
                compCheckboxCache[catId][compChk].getAttribute("data-compId") as string
              ] = checked;
            }

            updateCatSelectionState(catId);
            compSelections[catId].updateAll();
          }}

          aria-label="Select all"
        >
          <i class="fa-regular fa-square custom-tip">
            <span class="custom-tip-content custom-left">
              Select all
            </span>
          </i>

          <i class="fa-solid fa-square-check custom-tip">
            <span class="custom-tip-content custom-left">
              Select none
            </span>
          </i>

          <i class="fa-regular fa-square-minus custom-tip">
            <span class="custom-tip-content custom-left">
              Select none
            </span>
          </i>
        </button>
      </h2>

      <ul id="{catComponentList}">
        {#each pages[cat] as {src, comp}, i}

          //                                      👇 this is so dumb
          {@const compData: ComponentData = (comp as any).data}
          {@const compPage: Component = (comp as any).default}

          {@const compId: string = catId + slugify("--" + compData.name, { lower: true, })}

          {#if compData.scopes === "group-only"}

            <li class="comp-item">
              <input
                type="checkbox"
                id={`chk-${compId}`}

                onchange={(ev) => {
                    ev?.currentTarget.checked
                }}
              >
              <label class="checkbox caret-toggle right" for={`chk-${compId}`}>
                <i class="fa-regular fa-square-caret-down"></i>
              </label>
              <b
                class="comp-name-label"
              >
                {compData.name}
              </b>
            </li>

          {:else}

            <li class="comp-item {compData.sub ? "sub" : ""}">
              <input
                type="checkbox"
                id={`incl-${compId}`}
                name="{catComponentInputName}"

                checked={compSelections[catId].state[compId] ?? false}

                data-compId="{compId}"

                onchange={(ev) => {
                  compSelections[catId].update(
                    compId,
                    ev?.currentTarget.checked,
                  );

                  updateCatSelectionState(catId);
                }}

                bind:this={compCheckboxCache[catId][compId]}
              >
              <label class="checkbox" for={`incl-${compId}`}>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-square-check"></i>
              </label>

              <input
                type="radio"
                id={`chk-${compId}`}
                name="page-view"

                onchange={() => {
                  state.currentId = compData.name;
                  state.currentPage = compPage;
                }}
              >

              <label
                class="comp-name-label"
                for={`chk-${compId}`}
              >
                {compData.name}
              </label>

              {#if compData.tags}
                <span class="tags">
                  {#each compData.tags as tag }
                      {#if tag == "experimental"}
                        <span class="custom-tip">
                          <i class="experimental fa-solid fa-vial"></i>

                          <span class="custom-tip-content">
                            Experimental
                          </span>
                        </span>
                      {/if}
                  {/each}
                </span>
              {/if}

              <input
                type="checkbox"
                id={`fave-${compId}`}

                checked={compFaves[compId] ?? false}

                onchange={(ev) => {
                  updateCompFaves(compId, ev.currentTarget.checked);
                }}
              >
              <label class="checkbox fave" for={`fave-${compId}`}>
                <span class="checked-not custom-tip">
                  <i class="fa-regular fa-star"></i>
                  <span class="custom-tip-content">
                    Favourite
                  </span>
                </span>

                <span class="checked custom-tip">
                  <i class="fa-solid fa-star"></i>
                  <span class="custom-tip-content">
                    Un-favourite
                  </span>
                </span>
              </label>
            </li>

          {/if}
        {/each}
      </ul>
    {/each}

    <p>
      Don't see what you're looking for?
      <br>
      <a href="https://github.com/nndda/Pitch/issues/new/choose">Suggest a component!</a>
      or even
      <a href="https://github.com/nndda/Pitch/issues/new/choose">submit one!</a>
    </p>

  </div>

  <div class="action-cont">
    <div class="btn-group css-copy">
      <span>
        <i class="icon fa-brands fa-css"></i>
        CSS
      </span>

      <button>
        <i class="icon fa-solid fa-copy"></i>
        Copy
      </button>

      <button>
        <i class="icon fa-solid fa-eye"></i>
        View
      </button>
    </div>
  </div>

</nav>
