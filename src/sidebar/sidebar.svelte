<script lang="ts">
  import {
    onMount,
    type Component,
  } from "svelte";

  import {
    state,
    backToHome,
    switchPage,
  } from "../states/components.svelte";

  import {
    ui,
    faves,
    inputs,
    settings,
    projects,
    currentProject,
  } from "../states/storage.svelte";
  const
    projectScopes = projects.state[currentProject.get()!].scope
  ;

  import {
    constructRule,
    isInputVariablesCompatible,
  } from "../pages/component/_template/input";
  document.documentElement.setAttribute(
    "style",
    constructRule(inputs.state),
  );

  import { slug } from "../scripts/slugify";

  import Profile from "../pages/elements/profile.svelte";

  // TODO: pile all page-type component to a single entry
  // TODO: lazyload/dynamic import
  // Pages
  import SupportMe from "../pages/support.svelte";
  // import Theme from "../pages/theme.svelte";
  import Settings from "../pages/settings.svelte";
  // Resources
  import GettingStarted from "../pages/resources/getting-started.svelte";
  // import OtherResources from "../pages/resources/other-resources.svelte";
  import Showcase from "../pages/resources/showcase.svelte";

  import {
    runtimeData,
    catMeta,

    compCheckboxCache,
    compElCache,

    runtimeDataInit,
  } from "../states/runtime";

  let
    navEl: HTMLElement
  ;

  const
    {
      state: compFaves,
      update: updateCompFaves,
    } = faves
  ;

  runtimeDataInit();

  import {
    updateCatSelectionState,
    syncCompCheckedState,
    syncCompGroupItemsClass,
  } from "./sidebar";

  import { compile } from "../scripts/compiler";
  import { copyStr } from "../scripts/copy";

  // TODO ...
  onMount(() => {
    for (const catId in runtimeData) {

      const
        catComps = runtimeData[catId].components
      ;

      for (const compId in catComps) {
        const
          compData = catComps[compId]
        ;

        if (compData.type === "item") {

          if (compData.wip) {
            delete catComps[compId];

          } else if (compData.group) {
            const
              compParent = catComps[compData.group]
            ;

            compParent.items ??= [];
            compParent.items.push( compData.li! );
          }

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

    (document.getElementById("css-copy-button") as HTMLButtonElement).disabled = false;
  });

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

  <li
    class="comp-item page-item"
    class:wip={!onchange}
  >
    <i class={icon} data-page-icon={label}></i>

    <input
      type="radio"
      id={chkId}
      name="page-view"
      onchange={onchange}
      disabled={!onchange}
      checked={label === "Home"}
    >
    <label
      class="comp-name-label page"
      for={chkId}
      data-page-name={label}
    >
      {label}
      <!-- TODO: there has to be a better way -->
      {#if label === "Support Me?"}
        <!-- &nbsp; ❤️ -->
        <span
          class="custom-plzzz"
          class:hidden={!settings.state["app.sidebar.show_plzzz"]}
        ></span>
      {/if}
    </label>

    <!--
    {#if !onchange}
      <div class="custom-tip-content">
        Work-in-progress
      </div>
      <div>
        <span class="tags">
          <span class="wip-icon">
            <i class="fa-solid fa-road-barrier"></i>
          <span class="custom-lb wip-badge">
            WIP
          </span>
        </span>
      </div>
    {/if}
    -->
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

      checked={ui.state[catId] ?? false}

      onchange={ev => {
        ui.update(catId, ev.currentTarget.checked);
      }}
    >
    <label class="caret-toggle custom-tip" for={catId}>
      <i class="fa-solid fa-caret-down"></i>
      <span class="custom-tip-content custom-left">
        <span class="collapse">Collapse</span>
        <span class="expand">Expand</span>
      </span>
    </label>

{/snippet}

<nav
  id="sidebar"
  class:hide-wip-comps={!settings.state["app.sidebar.show_wip_comps"]}
  class:hide-wip-pages={!settings.state["app.sidebar.show_wip_pages"]}
  class:faved-badge-on-hover={!settings.state["app.sidebar.show_faved_badge"]}

  class:show-scope-color={settings.state["app.sidebar.show_scope_color"]}
  class:scope-project={projectScopes === "project"}
  class:scope-profile={projectScopes === "profile"}
  class:scope-jam={projectScopes === "jam"}

  bind:this={navEl}
>
  <div class="page-lists">
    <Profile/>

    <hr/>

    <ul>
      {@render PageListItem(
        "Home",
        "fa-solid fa-house",
        backToHome,
      )}

      {@render PageListItem(
        "Support Me?",
        "fa-solid fa-heart",
        switchPage("Support this project!!", SupportMe),
      )}

      {@render PageListItem(
        "Theme",
        "fa-solid fa-palette",
        null,
        // switchPage("Theme", Theme),
      )}

      {@render PageListItem(
        "Settings",
        "fa-solid fa-gear",
        switchPage("Settings", Settings),
      )}

    </ul>

    <h2
      class="cat-heading"
      class:on-hover={settings.state["app.sidebar.category_action_on_hover"]}
    >
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
        //   title: "Tips",
        //   icon: "fa-solid fa-book-bookmark",
        //   page: null
        // },

        {
          title: "Other Resources",
          icon: "fa-solid fa-box-open",
          page: null,
        },

        {
          title: "Showcase",
          icon: "fa-solid fa-star",
          page: Showcase,
        },

      ] as { title, icon, page, } }

        {@render PageListItem( title, icon, page !== null ? switchPage( title, page as Component ) : null, )}

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
          for (const catId in runtimeData) { updateCatSelectionState(catId); }
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
          for (const catId in runtimeData) { updateCatSelectionState(catId); }
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
          for (const catId in runtimeData) { updateCatSelectionState(catId); }
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

    <ul>
      {@render PageListItem(
        "Advanced search",
        "fa-solid fa-magnifying-glass",
        null,
        // switchPage("Theme", Theme),
      )}
    </ul>

    {#each Object.entries(runtimeData) as catEntry}

      {@const catId = catEntry[0]}
      {@const catData = catEntry[1]}

      {@const catCompList = `comp-list-${catId}`}
      {@const catCompInputName = `cat-inp-${catId}`}

      <h2
        class="cat-heading cat-comp"
        class:has-count={settings.state["app.sidebar.show_selected_count"]}
        class:on-hover={settings.state["app.sidebar.category_action_on_hover"]}
      >
        <i class="icon {catMeta[catData.name].icon}"></i>

        <span
          class="text"
        >
          {catData.name}
          <small
            class:hidden={!settings.state["app.sidebar.show_selected_count"]}
          >
            <span bind:this={runtimeData[catId].selectedCountEl}>0</span> selected
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
              ;

              if (runtimeData[catId].components[compId].li!.checkVisibility()) {
                compChkbox.checked = checked;

                // BUG: toggling this also nuked WIP components
                // This line is apparently the source of it...???
                runtimeData[catId].selection.state[compId] = checked;
              }
            }

            updateCatSelectionState(catId);
            runtimeData[catId].selection.flush();
          }}

          bind:this={runtimeData[catId].catSelectBtn}

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

            <li
              class="comp-item group"

              bind:this={runtimeData[catId].components[compId].li}
            >
              <div>
                <i class="icon fa-solid fa-folder-open"></i>
                <span
                  class="comp-name-label"
                >
                  {compData.name}
                </span>
              </div>
            </li>

          {:else if compData.wip}

            <li
              class="comp-item wip"
              class:sub={compData.manifest.sub}
            >
              <div>
                <i class="icon fa-solid fa-calendar"></i><span
                  class="comp-name-label"
                >
                  {compData.manifest.name}
                </span>

                <span class="tags">
                  <span class="custom-lb wip-badge">
                    WIP
                  </span>
                </span>
              </div>
            </li>

          {:else if compData.type === "item" || compData.type === "item+group"}

            {@const idIncl = `incl-${compId}`}
            {@const idView = `view-${compId}`}
            {@const idFave = `fave-${compId}`}

            {@const compScopeData = (scope: ScopeStatus): string | false => {
              const
                compScope = compData.manifest.scopes as Record<string, Scopes>
              ;

              return compScope[scope] &&
                (
                  typeof compScope[scope] === "string"
                    ? compScope[scope]
                    : compScope[scope].join(" ")
                )
            }}

            <li
              class="comp-item"
              class:sub={compData.manifest.sub}
              class:is-faved={compData.isFaved}
              class:is-hacky={compData.isHacky}
              class:is-experimental={compData.isExperimental}

              class:compatible-all={isInputVariablesCompatible(compData.manifest)}
              data-scope-partial={compScopeData("partial")}
              data-scope-none={compScopeData("none")}

              bind:this={compElCache[catId][compId]}
              bind:this={runtimeData[catId].components[compId].li}
            >

              <input
                type="checkbox"
                id={idIncl}
                name={catCompInputName}

                checked={runtimeData[catId].selection.state[compId] ?? false}

                data-compId={compId}

                onchange={ev => {
                  const
                    compRuntimeData = runtimeData[catId].components[compId]
                  , checked = ev.currentTarget.checked
                  ;

                  syncCompCheckedState(catId, compRuntimeData, checked);

                  runtimeData[catId].selection.update(compId, checked);

                  updateCatSelectionState(catId);
                }}

                bind:this={compCheckboxCache[catId][compId]}
                bind:this={(runtimeData[catId].components[compId] as ComponentRuntimeItem).chkBox}
              >
              <label class="checkbox" for={idIncl}>
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-square-check"></i>
              </label>

              <input
                type="radio"
                id={idView}
                name="page-view"

                onchange={async () => {
                  if (compData.manifest.page) {
                    const
                      page = await compData.manifest.page() as Component
                    ;

                    state.currentId = compData.manifest.name;
                    state.currentData = compData.manifest;
                    state.attr = compData;
                    state.currentPage = page;
                  }
                }}
              >

              <label
                class="comp-name-label"
                data-comp-name={compData.manifest.nameDisplay ?? compData.manifest.name}
                for={idView}
              >
                {compData.manifest.name}
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
                  , compRuntimeData = (runtimeData[catId].components[compId] as ComponentRuntimeItem)
                  ;

                  compRuntimeData.li!.classList.toggle("is-faved", faved);

                  if (compRuntimeData.group) {
                    syncCompGroupItemsClass(
                      runtimeData[catId].components[compRuntimeData.group],
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
        id="css-copy-button"
        disabled
        onclick={() => {
          copyStr(
            compile()
          );
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
