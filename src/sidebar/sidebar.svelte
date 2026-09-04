<script lang="ts">
  import {
    onMount,
  } from "svelte";

  import {
    project,
    projectUpdate,
  } from "../storage/db";

  import {
    goToPage,
    unselectSidebarPage,
  } from "../states/page.svelte";

  import {
    constructRule,
    isInputVariablesCompatible,
  } from "../pages/elements/input";


  import {
    toast,
    toastErr,
  } from "../scripts/toast";
  import { slug } from "../scripts/slugify";

  import Profile from "../pages/elements/profile.svelte";

  import CSSViewer from "../pages/css-viewer";


  // Pages
  import {
    Home,
    Support,
    Settings,

    AdvancedSearch,
  } from "../pages";

  // Resources
  import {
    GettingStarted,
    PitchApp,
    OtherResources,
    Showcase,
  } from "../pages/resources";


  import {
    runtimeData,
    catMeta,

    compCheckboxCache,
    compElCache,

    runtimeDataInit,
    inputStyling,
  } from "../states/runtime";

  let
    navEl: HTMLElement
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
  onMount(async () => {
    for (const catId in runtimeData) {
      const catComps = runtimeData[catId].components;

      for (const compId in catComps) {
        const compData = catComps[compId];

        if (compData.type === "item") {
          if (compData.wip) {
            delete catComps[compId];
          } else if (compData.group) {
            catComps[compData.group].items ??= [ compData.li! ];
          }
        }
      }

      // bruh
      // TODO: refactor/optimize. I feel like this should/can be done with just one for-loop
      for (const compId in catComps) {
        const compData = catComps[compId];

        if ("checked" in compData) {
          compData.li!.classList.toggle(
            "compatible-all",
            await isInputVariablesCompatible(compData.manifest),
          )

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

<style lang="scss"> @use "./sidebar/sidebar.scss"; </style>

{#snippet PageListItem(
  page: PageData,
)}

  {@const {
    title,
    content,

    icon,
    attr,
  } = page}

  {@const chkId = slug(`chk-${title}`)}

  {@const onchange = content ? () => {
    goToPage(page);
  } : null}

  <li
    class="comp-item page-item"
    class:wip={!onchange}
  >
    <i class={icon} data-page-icon={title}></i>

    <input
      type="radio"
      id={chkId}
      name="page-view"
      onchange={onchange}
      disabled={!onchange}
      checked={title === "Home"}
    >
    <label
      class="comp-name-label page"
      for={chkId}
      data-page-name={title}
    >
      {title}
      <!-- TODO: there has to be a better way -->
      {#if title === "Support Me?"}
        <span
          class="custom-plzzz"
          class:hidden={!$project?.app.settings.app.sidebar.showPlzzz}
        ></span>
      {/if}
    </label>

    {#if !onchange}

      <!--
      <div class="custom-tip-content">
        Work-in-progress
      </div>
      -->

      <div>
        <span class="tags">
          <span class="wip-icon">
            <i class="fa-solid fa-road-barrier"></i>
          </span>
          <!--
          <span class="custom-lb wip-badge">
            WIP
          </span>
          -->
        </span>
      </div>
    {/if}
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

      checked={$project?.app.uiState[catId] ?? false}

      onchange={async ev => {
        // @ts-ignore
        await projectUpdate({ ["app.uiState." + catId]: ev.currentTarget.checked })
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

  class:hide-wip-comps={!$project?.app.settings.app.sidebar.showWipComps}
  class:hide-wip-pages={!$project?.app.settings.app.sidebar.showWipPages}
  class:faved-badge-on-hover={!$project?.app.settings.app.sidebar.showFavedBadge}

  class:show-scope-color={$project?.app.settings.app.sidebar.showScopeColor}
  class:scope-project={$project?.scope === "project"}
  class:scope-profile={$project?.scope === "profile"}
  class:scope-jam={$project?.scope === "jam"}

  bind:this={navEl}
>
  <div class="page-lists">
    <Profile/>

    <hr/>

    <ul>
      {#each [

        Home,
        Support,
        Settings,

      ] as page}

        {@render PageListItem(page)}

      {/each}
    </ul>

    <h2
      class="cat-heading"
      class:on-hover={$project?.app.settings.app.sidebar.categoryActionOnHover}
    >
      <span class=text>
        Resources
      </span>

      {@render HeadingCatToggle("resources")}
    </h2>

    <ul>
      {#each [

        GettingStarted,
        PitchApp,
        OtherResources,
        Showcase,

      ] as page}

        {@render PageListItem(page.default)}

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
      {@render PageListItem(AdvancedSearch)}
    </ul>

    {#each Object.entries(runtimeData) as catEntry}

      {@const catData = catEntry[1]}
      {@const catId = catData.name}

      {@const catCompList = `comp-list-${catId}`}
      {@const catCompInputName = `cat-inp-${catId}`}

      <h2
        class="cat-heading cat-comp"
        class:has-count={$project?.app.settings.app.sidebar.showSelectedCount}
        class:on-hover={$project?.app.settings.app.sidebar.categoryActionOnHover}
      >
        <i class="icon {catMeta[catData.name].icon}"></i>

        <span
          class="text"
        >
          {catData.name}
          <small
            class:hidden={!$project?.app.settings.app.sidebar.showSelectedCount}
          >
            <span bind:this={runtimeData[catId].selectedCountEl}>0</span> selected
          </small>
        </span>

        {@render HeadingCatToggle(catId)}

        <button
          id={catId}
          class="cat-toggle icon-only"

          onclick={async ev => {
            const
              el = ev.currentTarget
            , checked = el.getAttribute("data-status") as string === "select-all"
            ;

            let
              updatesTotal: number = 0
            ;

            try {
              updatesTotal += await projectUpdate(proj => {
                // Bulk update the component's selection DB
                proj.components[catId] = Object.keys(compCheckboxCache[catId]).reduce(
                  (
                    prev, compId,
                  ) => {
                    if (
                      // TODO: I feel like there's a better approach.
                      // Query the visible <li> elements of components' list.
                      // This works with filters, since filters just toggle the components
                      // <li>'s visibility based on its metadata.
                      runtimeData[catId].components[compId].li!.checkVisibility()
                    ) {
                      prev[compId] = checked;
                      compCheckboxCache[catId][compId].checked = checked;
                    }

                    return prev;
                  }, {} as RecordBoolean,
                );
              });

              if (updatesTotal > 0) {

                // Auto copy
                if ($project?.app.settings.app.autoCopy) {
                  copyStr(
                    await compile(),
                  );
                }

              } else {
                toastErr(`Failed adding components`);
              }

            } catch(err) {
              toastErr(`${err}`);
            }

            updateCatSelectionState(catId);

            el.disabled = false;

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
                <i class="icon fa-solid fa-folder-open"></i><span class="comp-name-label">{compData.name}</span>
              </div>
            </li>

          {:else if compData.wip}

            <li
              class="comp-item wip"
              class:sub={compData.manifest.sub}
            >
              <div>
                <i class="fa-solid fa-square-xmark"></i><span
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

            {@const compHumanName = compData.manifest.nameDisplay ?? compData.manifest.name}

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
              class:sub-2={
                compData.manifest.sub &&
                // NOTE: questionable
                "group" in (runtimeData[catId].components[slug(compData.group as string)])
              }
              class:is-faved={compData.isFaved}
              class:is-hacky={compData.isHacky}
              class:is-experimental={compData.isExperimental}
              class:is-flavour={compData.manifest.flavour}

              data-scope-partial={compScopeData("partial")}
              data-scope-none={compScopeData("none")}

              bind:this={compElCache[catId][compId]}
              bind:this={runtimeData[catId].components[compId].li}
            >

              <input
                type="checkbox"
                id={idIncl}
                name={catCompInputName}

                checked={
                  $project?.components[catData.name][compId] ?? false
                }

                data-compId={compId}

                onchange={async ev => {
                  const
                    compRuntimeData = runtimeData[catId].components[compId]
                  , checked = ev.currentTarget.checked
                  ;

                  let
                    updated = false
                  ;

                  try {
                    const
                      // Update the project's DB selection state
                      updates = await projectUpdate(proj => {
                        if (!(catId in proj.components)) {
                          proj.components[catId] = {}
                        }

                        // Delete the key if not checked (not selected), instead of flagging it to false
                        // if (checked) {
                        //   proj.components[catId][compId] = true;
                        // } else {
                        //   delete proj.components[catId][compId];
                        // }

                        // Flag false explicitly if not checked, rather than deleting the key
                        proj.components[catId][compId] = checked;
                      })
                    ;

                    // If the DB gets updated...
                    if (updates > 0) {

                      updateCatSelectionState(catId);

                      // Auto copy
                      if ($project?.app.settings.app.autoCopy) {
                        copyStr(
                          await compile(),
                        );
                      }

                      // Notify the user about the component's selection state
                      toast(
                        checked ?
                          // NOTE: not sure which icon is better :/
                          // `<i class="fa-solid fa-check-to-slot"></i> <b>${compHumanName}</b> added` :
                          `<i class="fa-solid fa-square-check"></i> <b>${compHumanName}</b> added` :
                          `<i class="fa-solid fa-border-none"></i> <b>${compHumanName}</b> removed`
                      );

                      updated = true;

                    } else {

                      // If nothing gets updated...
                      // Notify the user
                      toastErr(
                        checked ?
                          `Failed to remove <b>${compHumanName}</b>` :
                          `Failed to add <b>${compHumanName}</b>`
                      );

                    }

                  } catch (err) {
                    toastErr(`${err}`);
                  }

                  if (updated) {

                    syncCompCheckedState(catId, compRuntimeData, checked);

                  } else {

                    // Revert back selection state if failed to update
                    ev.currentTarget.checked = !checked;

                  }
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

                onchange={
                  compData.manifest.page ?
                    async () => {
                      goToPage({
                        title: compHumanName,
                        content: compData.manifest.page,

                        icon: catMeta[catId].icon,

                        componentData: compData.manifest,
                        attr: compData,
                      });
                    } : null
                }
              >

              <label
                class="comp-name-label"
                data-comp-name={compHumanName}
                for={idView}
              >
                {compData.manifest.name}
              </label>

              <span class="tags">
                {#if compData.manifest.flavour}
                  <span class="custom-tip">
                    <i class="flavour fa-solid fa-ice-cream"></i>
                    <span class="custom-tip-content">
                      Flavour
                    </span>
                  </span>
                {/if}

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

                checked={$project?.faves[compId] ?? false}

                onchange={async ev => {
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

                  try {
                    const
                      // Update the project's DB faved state
                      updates = await projectUpdate(proj => {
                        if (faved) {
                          proj.faves[compId] = true;
                        } else {
                          delete proj.faves[compId];
                        }
                      })
                    ;

                    // If the DB gets updated...
                    if (updates > 0) {
                      // Notify the user about the component's favourited state
                      toast(
                        faved ?
                          `<i class="fa-solid fa-star"></i> Added <b>${compHumanName}</b> to favourites` :
                          `<i class="fa-regular fa-star"></i> Removed <b>${compHumanName}</b> from favourites`
                      );
                    } else {
                      // If nothing gets updated...
                      // Notify the user
                      toastErr(
                        faved ?
                          `Failed to remove <b>${compHumanName}</b> from favourites` :
                          `Failed to add <b>${compHumanName}</b> to favourites`
                      );
                    }
                  } catch (err) {
                    toastErr(`${err}`)
                  }

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
        onclick={async () => {
          copyStr(
            await compile(),
          );
        }}
      >
        <i class="icon fa-solid fa-copy"></i>
        Copy
      </button>

      <button
        onclick={() => {
          unselectSidebarPage();
          goToPage(CSSViewer);
        }}
      >
        <i class="icon fa-solid fa-eye"></i>
        View
      </button>
    </div>
  </div>
</nav>
