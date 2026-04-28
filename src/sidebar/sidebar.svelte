<script lang="ts">
  import {
    onMount,
    type Component,
  } from "svelte";

  // NOTE: I kinda want to move these types definition somewhere,
  // but there's some issues and stuff with the importing/exporting and namespace and such
  // TODO?: maybe pile the types to the global component manifest's d.ts?

  type SinglePageEntry = {
    title: string,
    icon: string,
    page: Component | null,
  }

  interface PageEntry {
    [key: string]: {
      icon: string,
      data: {
        src: string,
        comp: Component,
      }[],
    }
  }

  type PageComponentImport = Record<string, Component>

  interface ComponentRuntimeItem {
    type: "item" | "item+group", // not very sure abt the "item+group" implementation tbh...
    css: CSSData,

    name: string,
    nameDisplay?: string,

    li: HTMLLIElement | null,
    chkBox: HTMLInputElement | null,

    page: Component,

    checked: boolean,

    group?: string,
    items?: HTMLLIElement[],

    isFaved: boolean,
    isHacky: boolean,
    isExperimental: boolean,

    tags?: ComponentTags[],
  }

  interface ComponentRuntimeItemGroup {
    type: "group",

    name: string,

    li: HTMLLIElement | null,

    checkedAll: boolean,

    hasFaved: boolean,
    hasHacky: boolean,
    hasExperimental: boolean,

    items: HTMLLIElement[],
  }

  interface ComponentCategoryData {
    name: string,
    components: {
      [compId: string]: ComponentRuntimeItem | ComponentRuntimeItemGroup,
    },
    selection: StorageAPI<boolean>,
    selectedCountEl: HTMLElement | null,
    catSelectBtn: HTMLButtonElement | null,
  }

  interface ComponentRuntimeData {
    [catId: string]: ComponentCategoryData,
  }

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
    initiateStorageAPI,
    compsUserInputStorage,

    type StorageAPI,
  } from "../states/storage.svelte";

  import {
    // applyUserInput,
    constructRule,
  } from "../pages/component/_template/input";

  document.documentElement.setAttribute(
    "style",
    constructRule(compsUserInputStorage.state),
  );

  import {
    slug,
    createCompIdFunc,
  } from "../scripts/slugify";

  // TODO: pile all page-type component to a single entry
  // Pages
  // Resources
  import GettingStarted from "../pages/resources/getting-started.svelte";
  import OtherResources from "../pages/resources/other-resources.svelte";
  import Showcase from "../pages/resources/showcase.svelte";


  let
    navEl: HTMLElement
  ;

  const
    pagesCatIdSlug: string[] = []

  , pages: PageEntry = {

      Components: {
        icon: "fa-solid fa-bars-progress",
        data: getPages( import.meta.glob("/pages/component/components/*.svelte", { eager: true, }) as PageComponentImport ),
      },

      Decorations: {
        icon: "fa-solid fa-paint-roller",
        data: getPages( import.meta.glob("/pages/component/decorations/*.svelte", { eager: true, }) as PageComponentImport ),
      },

    }

  , {
      state: compFaves,
      update: updateCompFaves,
    } = initiateStorageAPI<boolean>("faves")

  , compsRuntimeData: ComponentRuntimeData = {}

  , compCheckboxCache: Record<string, Record<string, HTMLInputElement>> = {}

  , compElCache: Record<string, Record<string, HTMLLIElement>> = {}

  , uiState = initiateStorageAPI<boolean>("uistate")

  ;

  function updateCatSelectionState(catId: string): void {
    let
      selected: number = 0
    , total: number = 0

    , selectedVisible: number = 0
    , totalVisible: number = 0
    ;

    const
      catData = compsRuntimeData[catId]
    , selectEl = catData.catSelectBtn!
    ;

    for (const compId in catData.components) {
    // for (const compId in catData.selection.state) {
      const isVisible = catData.components[compId].li!.checkVisibility();

      total += 1;

      if (isVisible) {
        totalVisible += 1;
      }

      // if (catData.selection.state[compId]) {
      //   selected += 1;
      // };

      // TODO: i feel like there's better pattern
      if ("chkBox" in catData.components[compId]) {
        const checked = catData.components[compId].chkBox!.checked;

        if (checked) {
          selected += 1

          if (isVisible) {
            selectedVisible += 1;
          }
        }
      }
    }

    // TODO: optimize attributes logic
    selectEl.setAttribute("aria-label", "Clear selection");
    selectEl.setAttribute("data-status", "select-none");

    if (selectedVisible == 0) { // select all
      // button is 'empty square'
      selectEl.setAttribute("data-status", "select-all");
      selectEl.setAttribute("aria-label", "Select All");

      selectEl.setAttribute("data-icon", "fa-square");

    } else if (selectedVisible === totalVisible) { // clear all selections
      // button is 'checkmark square'
      selectEl.setAttribute("data-icon", "fa-square-check");

    } else { // also clear all selection(s)
      // button is 'minus square'
      selectEl.setAttribute("data-icon", "fa-square-minus");

    }

    catData.selectedCountEl!.textContent = `${selected}`;
    catData.selection.flush();
  }

  // bruh
  // TODO: optimize setup/initialization
  for (const cat in pages) {

    const
      catId = "cat-" + slug(cat)
    ;

    compsRuntimeData[catId] = {
      name: cat,
      components: {},
      selection: initiateStorageAPI<boolean>(`comps-${catId}`),
      selectedCountEl: null,
      catSelectBtn: null,
    };

    compElCache[catId] = {};
    compCheckboxCache[catId] = {};

    pagesCatIdSlug.push(catId);

    const slugifyId = createCompIdFunc(catId);
    // function slugifyId(compName: string): string {
    //   return slugify(catId + "__" + compName, slugifyOpt)
    // }

    for (const page in pages[cat].data) {
      const
        {
          src,
          comp,
        } = pages[cat].data[page]
      , compData: ComponentData = (comp as any).data
      , compId = slugifyId(compData.name)
      ;

      if (compData.scopes !== "group-only") {

        // Component selected state
        compsRuntimeData[catId].selection.state[compId] = compsRuntimeData[catId].selection.state[compId] ?? false

        compsRuntimeData[catId].components[compId] = {
          type: "item",
          css: compData.css,

          name: compData.name,
          nameDisplay: compData?.nameDisplay,

          li: null,
          chkBox: null,

          page: (comp as any).default,

          checked: compsRuntimeData[catId].selection.state[compId],

          isFaved: compFaves[compId] ?? false,
          isHacky: compData.tags?.includes("hacky") ?? false,
          isExperimental: compData.tags?.includes("experimental") ?? false,

        } as ComponentRuntimeItem;

        if (compData.sub) {
          // compsRuntimeData[catId].components[compId] = {
          //   ... compsRuntimeData[catId].components[compId],

          //   // type: "item+group",
          //   group: slugifyId(compData.sub),
          // };

          compsRuntimeData[catId].components[compId].group = slugifyId(compData.sub);
        }

        // for (const input of compData.input ?? []) {
        //   if (compsUserInputStorage.state[input.var]) {

        //   } else {
        //     if (input.default) {
        //       if (input.type === "string") {
        //         compsUserInputStorage.state[input.var] = '"' + input.default + '"';
        //       } else {
        //         compsUserInputStorage.state[input.var] = input.default;
        //       }
        //     }
        //   }
        // }

      } else {

        compsRuntimeData[catId].components[compId] = {
          type: "group",

          name: compData.name,

          li: null,

          checkedAll: false,

          hasFaved: false,
          hasHacky: false,
          hasExperimental: false,

          items: [],

        } as ComponentRuntimeItemGroup;

      }

    }

    compsRuntimeData[catId].selection.flush();
    compsUserInputStorage.flush();
  }


  function syncCompCheckedState(
    catId: string,
    compRuntimeData: ComponentRuntimeItem | ComponentRuntimeItemGroup,
    checked: boolean,
  ): void {
    if ("group" in compRuntimeData && compRuntimeData.group) {
      const
        compGroupData = compsRuntimeData[catId].components[compRuntimeData.group]
      ;
      if (compGroupData.type === "item") {
        const
          chkBox = compGroupData.chkBox!
        ;
        if (!chkBox.checked) {
          chkBox.checked = checked;
        }

        chkBox.disabled = checked;
      }
    }
  }

  function syncCompGroupItemsClass(
    compGroupData: ComponentRuntimeItem | ComponentRuntimeItemGroup,
    className: string,
  ): void {
    const hasAnyClass = compGroupData.items!.some(el => {
      return el.classList.contains(className)
    });

    if (className === "is-faved") {
      compGroupData.li!.classList.toggle(
        "has-faved",
        hasAnyClass,
      );

      return;
    }

    compGroupData.li!.classList.toggle(
      className,
      hasAnyClass,
    );
  }

  // TODO: move compiler to its own module
  interface CSSCompilerOption {
    compressed?: boolean,
    layer?: boolean,
  }

  function compileComponent(option: CSSCompilerOption = {}): string {
    const
      cssOut: string[] = []
    ;

    for (const catId in compsRuntimeData) {
      const
        compCatData = compsRuntimeData[catId].components
      ;

      for (const compId in compCatData) {
        if (compCatData[compId].type === "item") {
          const
            compData = compCatData[compId] as ComponentRuntimeItem
          ;

          if (compData.chkBox!.checked) {
            cssOut.push(compData.css.compressed);
          }
        }
      }
    }

    return cssOut.join("");
  }

  // TODO ...
  onMount(() => {
    for (const catId of pagesCatIdSlug) {

      const
        catComps = compsRuntimeData[catId].components
      ;

      for (const compId in catComps) {
        const
          compData = catComps[compId]
        ;

        if (compData.type === "item" && compData.group) {
            const
              compParent = catComps[compData.group]
            ;

            compParent.items ??= [];
            compParent.items.push( compData.li! );
        }
      }

      // bruh
      // TODO: refactor/optimize. I feel like this should/can be done with just one for-loop
      for (const compId in catComps) {
        const
          compData = catComps[compId]
        ;

        if ("checked" in compData) {
          syncCompCheckedState(catId, compData, compData.checked);
        }

        if ("items" in compData) {
        // if (compData.type === "group") {
          syncCompGroupItemsClass(compData, "is-faved");
          // syncCompGroupItemsClass(compData, "is-hacky");
          // syncCompGroupItemsClass(compData, "is-experimental");
        }
      }

      updateCatSelectionState(catId);
    }

    CSSCopyBtn.disabled = false;
  });

  let
    CSSCopyBtn: HTMLButtonElement
  ;

</script>

<style lang="scss">
  @use "./sidebar/sidebar.scss";
</style>


{#snippet PageListItem(
  label: string,
  icon: string,
  onchange: any = null,
)}

  {@const chkId = slug(`chk-${label}`)}

  <li class="comp-item">
    <i class={icon}></i>

    <input
      type="radio"
      id={chkId}
      name="page-view"
      onchange={onchange}
      checked={label === "Home"}
    >
    <label
      class="comp-name-label"
      for={chkId}
    >
      {label}
      <!-- TODO: there has to be a better way -->
      {#if label === "Support Me?"}
        <!-- &nbsp; ❤️ -->
        <span class="custom-plzzz"></span>
      {/if}
    </label>
  </li>

{/snippet}

{#snippet HeadingCatToggle(
  id: string,
)}

  {@const catId = `cat-heading-${id}`}

    <input
      type="checkbox"
      class="toggle"
      id={catId}

      checked={uiState.state[catId] ?? false}

      onchange={ev => {
        uiState.update(catId, ev.currentTarget.checked);
      }}
    >
    <label class="caret-toggle custom-tip" for={catId}>
      <i class="fa-solid fa-caret-down"></i>
      <!--
      <span class="custom-tip-content custom-left collapse">
        Collapse
      </span>
      <span class="custom-tip-content custom-left expand">
        Expand
      </span>
       -->
    </label>

{/snippet}

<nav id="sidebar" bind:this={navEl}>
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
        "Home",
        "fa-solid fa-house",
        backToHome,
      )}

      {@render PageListItem(
        "Support Me?",
        "fa-solid fa-heart",
        backToHome,
      )}
      <!--
      {@render PageListItem(
        "Settings",
        "fa-solid fa-gear",
        backToHome,
      )}
      -->
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
          page: GettingStarted,
        },

        // {
        //   title: "itch.io's HTML quirks",
        //   icon: "fa-solid fa-book-bookmark",
        //   page: null
        // },

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

        {@render PageListItem( title, icon, switchPage( title, page as Component ), )}

      {/each}
    </ul>

    <hr>

    <div class="btn-group filter-group">
      <span>
        <i class="fa-solid fa-filter"></i>
        Filter
      </span>

      <input
        type="checkbox"
        name="filter-group"
        id="faved"

        onchange={ev => {
          navEl.classList.toggle("faves-only", ev.currentTarget.checked);
          for (const catId in compsRuntimeData) { updateCatSelectionState(catId); }
        }}
      >
      <label class="button button-check custom-tip" for="faved">
        <i class="fa-solid fa-star"></i>

        <span class="custom-tip-content">
          Favourited
        </span>
      </label>

      <input
        type="checkbox"
        name="filter-group"
        id="non-hacky"

        onchange={ev => {
          navEl.classList.toggle("no-hacky", ev.currentTarget.checked);
          for (const catId in compsRuntimeData) { updateCatSelectionState(catId); }
        }}
      >
      <label class="button button-check custom-tip" for="non-hacky">
        <i class="fa-solid fa-flask"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Hacky Components
        </span>
      </label>

      <input
        type="checkbox"
        name="filter-group"
        id="non-experimental"

        onchange={ev => {
          navEl.classList.toggle("no-experimental", ev.currentTarget.checked);
          for (const catId in compsRuntimeData) { updateCatSelectionState(catId); }
        }}
      >
      <label class="button button-check custom-tip" for="non-experimental">
        <i class="fa-solid fa-vial"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Experimental Components
        </span>
      </label>
    </div>

    {#each Object.entries(compsRuntimeData) as catEntry}

      {@const catId = catEntry[0]}
      {@const catData = catEntry[1]}

      {@const catCompList = `comp-list-${catId}`}
      {@const catCompInputName = `cat-inp-${catId}`}

      <h2 class="cat-heading cat-comp">
        <i class="icon {pages[catData.name].icon}"></i>

        <span class="text">
          {catData.name}
          <small>
            <span bind:this={compsRuntimeData[catId].selectedCountEl}>0</span> selected
          </small>
        </span>

        {@render HeadingCatToggle(catId)}

        <button
          id={catId}
          class="cat-toggle icon-only"

          onclick={ev => {
            const
              checked = ev.currentTarget.getAttribute("data-status") as string === "select-all"
            ;

            for (const compId in compCheckboxCache[catId]) {
              const
                compChkbox = compCheckboxCache[catId][compId]
              // , compLi = compsRuntimeData[catId].components[compId].li!
              ;

              if (compsRuntimeData[catId].components[compId].li!.checkVisibility()) {
                compChkbox.checked = checked;

                compsRuntimeData[catId].selection.state[compId] = checked;
              }
            }

            updateCatSelectionState(catId);
            compsRuntimeData[catId].selection.flush();
          }}

          bind:this={compsRuntimeData[catId].catSelectBtn}

          aria-label="Select all"
          data-icon
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

      <ul id={catCompList} class="comp-list">
        {#each Object.entries(catEntry[1].components) as compEntry}

          {@const compId = compEntry[0]}
          {@const compData = compEntry[1]}

          {#if compData.type === "group"}

            {@const chkId = `chk-${compId}`}

            <li
              class="comp-item group"

              bind:this={compsRuntimeData[catId].components[compId].li}
            >
              <!--
              <input
                type="checkbox"
                id={chkId}

                checked={uiState.state[chkId] ?? false}

                onchange={ev => {
                  uiState.update(chkId, ev.currentTarget.checked);
                }}
              >
              <label class="checkbox caret-toggle right" for={chkId}>
                <i class="fa-regular fa-square-caret-down"></i>
              </label>
              <b
                class="comp-name-label"
              >
                {compData.name}
              </b>
              -->

              <div>
                <i class="icon fa-solid fa-circle"></i>
                <span
                  class="comp-name-label"
                >
                  {compData.name}
                </span>
              </div>
            </li>

          {:else}

            {@const idIncl = `incl-${compId}`}
            {@const idView = `view-${compId}`}
            {@const idFave = `fave-${compId}`}

            <li
              class="comp-item"
              class:sub={compData.group}
              class:is-faved={compData.isFaved}
              class:is-hacky={compData.isHacky}
              class:is-experimental={compData.isExperimental}

              bind:this={compElCache[catId][compId]}
              bind:this={compsRuntimeData[catId].components[compId].li}
            >

              <input
                type="checkbox"
                id={idIncl}
                name={catCompInputName}

                checked={compsRuntimeData[catId].selection.state[compId] ?? false}

                data-compId={compId}

                onchange={ev => {
                  const
                    compRuntimeData = compsRuntimeData[catId].components[compId]
                  , checked = ev.currentTarget.checked
                  ;

                  syncCompCheckedState(catId, compRuntimeData, checked);

                  compsRuntimeData[catId].selection.update(compId, checked);

                  updateCatSelectionState(catId);
                }}

                bind:this={compCheckboxCache[catId][compId]}
                bind:this={(compsRuntimeData[catId].components[compId] as ComponentRuntimeItem).chkBox}
              >
              <label class="checkbox" for={idIncl}>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-square-check"></i>
              </label>

              <input
                type="radio"
                id={idView}
                name="page-view"

                onchange={() => {
                  state.currentId = compData.name;
                  state.currentPage = compData.page;
                }}
              >

              <label
                class="comp-name-label"
                for={idView}
              >
                {compData.name}
              </label>

              <span class="tags">
                {#if compData.isExperimental}
                  <span class="custom-tip">
                    <i class="experimental fa-solid fa-vial"></i>
                    <span class="custom-tip-content">
                      Experimental
                    </span>
                  </span>
                {/if}
              </span>

              <input
                type="checkbox"
                id={idFave}

                checked={compFaves[compId] ?? false}

                onchange={ev => {
                  const
                    faved = ev.currentTarget.checked ?? false
                  , compRuntimeData = (compsRuntimeData[catId].components[compId] as ComponentRuntimeItem)
                  ;

                  compRuntimeData.li!.classList.toggle("is-faved", faved);

                  if (compRuntimeData.group) {
                    syncCompGroupItemsClass(
                      compsRuntimeData[catId].components[compRuntimeData.group],
                      "is-faved",
                    );
                  }

                  updateCompFaves(compId, faved);
                }}
              >
              <label class="checkbox fave" for={idFave}>
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

      <button
        disabled
        bind:this={CSSCopyBtn}
        onclick={() => {
          import("../scripts/copy").then(val => {
            val.copyStr(
              compileComponent()
            );
          });
        }}
      >
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
