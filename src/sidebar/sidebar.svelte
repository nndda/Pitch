<script lang="ts">
  import { onMount } from "svelte";

  import { catMetadata } from "@pitch/meta";
  import { project, projectUpdate } from "@db";
  import { IconTooltip, Profile } from "@elements";
  import { isInputVariablesCompatible } from "@elements/input";
  import { goToPage, unselectSidebarPage } from "../states/page.svelte";
  import { slug, copyStr, toastErr } from "@utils";
  import { compile } from "@pitch/css";
  import { runtimeData, compCheckboxCache, runtimeDataInit } from "@runtime";

  import { updateCatSelectionState, syncCompCheckedState, syncCompGroupItemsClass } from "./sidebar";

  // Pages
  import pagesMain, { AdvancedSearch, pagesResources, pagesSpellbooks } from "@pages";

  let navEl: HTMLElement;

  runtimeDataInit();

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

<style lang="scss">
  @use "./sidebar/sidebar.scss";
</style>

{#snippet PageListItem(
  page: PageData,
)}

  {@const {
    title,
    content,

    icon,
    attr,

    subPages,
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

    <label
      class="comp-name-label page"
      for={chkId}
      data-page-name={title}
    >
      <input
        type="radio"
        id={chkId}
        name="page-view"
        onchange={onchange}
        disabled={!onchange}
        checked={title === "Home"}
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

    {#if subPages}
      {@render PageCatalogue({
        items: subPages,
      })}
    {/if}
  </li>
{/snippet}

{#snippet HeadingCatToggle(
  id: string,
)}

  {@const catId = `cat-heading-${id}`}

  <label class="checkbox caret-toggle custom-tip" for={catId}>
    <input
      type="checkbox"
      class="toggle"
      id={catId}

      checked={$project?.app.uiState[catId] ?? false}

      onchange={async ev => {
        // @ts-ignore
        await projectUpdate({ ["app.uiState." + catId]: ev.currentTarget.checked });
      }}
    >

    <i class="fa-solid fa-caret-down"></i>

    <span class="custom-tip-content custom-left">
      <span class="collapse">Collapse</span>
      <span class="expand">Expand</span>
    </span>
  </label>
{/snippet}

{#snippet PageCatalogue({name, items}: {
  name?: string,
  items: PageData[],
})}
  {#if name}
    <h2
      class="cat-heading"
      class:on-hover={$project?.app.settings.app.sidebar.categoryActionOnHover}
    >
      <span class="text">
        {name}
      </span>

      {@render HeadingCatToggle(name)}
    </h2>
  {/if}

  <ul>
    {#each items as pageData}

      {@render PageListItem(pageData)}

    {/each}
  </ul>
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

    {@render PageCatalogue({
      items: pagesMain,
    })}

    {@render PageCatalogue({
      name: "Resources",
      items: pagesResources,
    })}

    <hr>

    <div class="btn-group filter-group">
      <span>
        <i class="fa-solid fa-filter"></i>
        Filter
      </span>

      <label class="checkbox button button-check custom-tip" for="faved">
        <input
          type="checkbox"
          name="filter-group"
          id="faved"

          onchange={ev => {
            navEl.classList.toggle("faves-only", ev.currentTarget.checked);
            for (const catId in runtimeData) { updateCatSelectionState(catId); }
          }}
        >

        <i class="fa-solid fa-star"></i>

        <span class="custom-tip-content">
          Favourited
        </span>
      </label>

      <label class="checkbox button button-check custom-tip" for="non-hacky">
        <input
          type="checkbox"
          name="filter-group"
          id="non-hacky"

          onchange={ev => {
            navEl.classList.toggle("no-hacky", ev.currentTarget.checked);
            for (const catId in runtimeData) { updateCatSelectionState(catId); }
          }}
        >

        <i class="fa-solid fa-flask"></i>
        <i class="fa-solid fa-slash"></i>

        <span class="custom-tip-content">
          No Hacky Components
        </span>
      </label>

      <label class="checkbox button button-check custom-tip" for="non-experimental">
        <input
          type="checkbox"
          name="filter-group"
          id="non-experimental"

          onchange={ev => {
            navEl.classList.toggle("no-experimental", ev.currentTarget.checked);
            for (const catId in runtimeData) { updateCatSelectionState(catId); }
          }}
        >

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

    {#each Object.entries(runtimeData) as [ _, catData ]}

      {@const catId = catData.name}

      {@const catCompList = `comp-list-${catId}`}
      {@const catCompInputName = `cat-inp-${catId}`}

      <h2
        class="cat-heading cat-comp"
        class:has-count={$project?.app.settings.app.sidebar.showSelectedCount}
        class:on-hover={$project?.app.settings.app.sidebar.categoryActionOnHover}
      >
        <i class="icon {catMetadata[catData.name].icon}"></i>

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
                proj.components[catId] = Object.keys(compCheckboxCache).reduce(
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
                      compCheckboxCache[compId].checked = checked;
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
        {#each Object.entries(catData.components) as [ compId, compData ]}

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

          {:else if
            compData.type === "item" ||
            compData.type === "item+group"
          }

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

              data-comp-name={compHumanName}

              bind:this={runtimeData[catId].components[compId].li}
            >

              <label class="checkbox" for={idIncl}>
                <input
                  type="checkbox"
                  id={idIncl}
                  name={catCompInputName}

                  class="comp-checkbox"

                  checked={
                    $project?.components[catData.name][compId] ?? false
                  }

                  data-compId={compId}

                  onchange={async ev => {
                    await compData.api?.toggleInclude(ev.currentTarget.checked);
                  }}

                  bind:this={compCheckboxCache[compId]}
                  bind:this={(runtimeData[catId].components[compId] as ComponentRuntimeItem).chkBox}
                >
                <i class="fa-regular fa-square"></i>
                <i class="fa-solid fa-square-check"></i>
              </label>

              <label
                class="checkbox comp-name-label"
                data-comp-name={compHumanName}
                for={idView}
              >
                <input
                  type="radio"
                  id={idView}
                  name="page-view"

                  onchange={compData.api?.openPage}
                >
                {compData.manifest.name}
              </label>

              <span class="tags">

                {#if compData.manifest.flavour}

                  <IconTooltip
                    icon="flavour fa-solid fa-ice-cream"
                    tooltip="Flavour"
                  />

                {/if}

                {#if compData.isExperimental}

                  <IconTooltip
                    icon="experimental fa-solid fa-vial"
                    tooltip="Experimental"
                  />

                {/if}

              </span>

              <label class="checkbox fave" for={idFave}>
                <input
                  type="checkbox"
                  id={idFave}

                  checked={$project?.faves[compId] ?? false}

                  onchange={async ev => {
                    await compData.api?.toggleFavourite(ev.currentTarget.checked ?? false);
                  }}
                >

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

            </li>

          {/if}
        {/each}
      </ul>
    {/each}

    <h2
      class="cat-heading cat-comp cat-spellbook"
      class:on-hover={$project?.app.settings.app.sidebar.categoryActionOnHover}
    >
      <span class=text>
        <i class="fa-solid fa-book-skull"></i>
        Spellbook
      </span>

      {@render HeadingCatToggle("spellbook")}
    </h2>

    {@render PageCatalogue({
      items: pagesSpellbooks,
    })}

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
        <!-- <i class="icon fa-brands fa-css"></i> -->
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
          import("../pages/css-viewer")
            .then(page => {
              goToPage(page.default);
            })
          ;
        }}
      >
        <i class="icon fa-solid fa-eye"></i>
        View
      </button>
    </div>
  </div>
</nav>
