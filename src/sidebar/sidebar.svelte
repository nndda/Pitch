<script lang=ts>
  import {
    type Component,
  } from "svelte";

  import {
    getPages,
    pitchVer,
  } from "./sidebar";

  import {
    state,
    backToHome,
  } from "../states/components.svelte";

  type PageEntries = [
    string,
    {
      src: string,
      comp: Component,
    }[],
  ][];

  type PageComponentImport = Record<string, Component>

  const
    pages: PageEntries = Object.entries(
      {
        Components: getPages( import.meta.glob("/pages/component/components/*.svelte", { eager: true, }) as PageComponentImport ),
      },
    )

  , pagesIcon: Record<string, string> = {
      Components: "fa-solid fa-bars-progress",
    }
  ;
</script>


{#snippet PageListItem(
  id: string,
  label: string,
  icon: string,
  onchange: any = null,
)}
  <li class=comp-item>
    <i class="{icon}"></i>

    <input
      type=radio
      id="chk-{id}"
      name="page-view"
      onchange={onchange}
    >
    <label
      class=comp-name-label
      for="chk-{id}"
    >
      {label}
    </label>
  </li>
{/snippet}

{#snippet HeadingCatToggle(
  id: string,
)}
    <input type=checkbox class=toggle id="cat-{id}">
    <label class="caret-toggle" for="cat-{id}">
      <i class="fa-solid fa-caret-down"></i>
    </label>
{/snippet}

<nav id=sidebar>
  <div class=page-lists>

    <h1 class="cat-heading pitch-title">
      <img class=logo alt="Pitch logo" src="/assets/pitch-icon-s.png">
      <span class=text>
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
        "Support Me!",
        "fa-solid fa-heart",
        backToHome,
      )}
    </ul>

    <h2 class=cat-heading>
      <span class=text>
        Resources
      </span>

      {@render HeadingCatToggle("resources")}
    </h2>

    <ul>
      {@render PageListItem(
        "getting-started",
        "Getting Started",
        "fa-solid fa-book-bookmark",
        null,
      )}

      {@render PageListItem(
        "itch-html",
        "itch.io's HTML quirks",
        "fa-solid fa-book-bookmark",
        null,
      )}

      {@render PageListItem(
        "itch-css-resources",
        "Other Resources",
        "fa-solid fa-box-open",
        null,
      )}

      {@render PageListItem(
        "pitch-showcase",
        "Showcase",
        "fa-solid fa-star",
        null,
      )}
    </ul>

    <hr>

    {#each pages as [cat, compsData]}
      <h2 class=cat-heading>
        <i class="icon {pagesIcon[cat]}"></i>

        <span class=text>
          {cat}
        </span>

        {@render HeadingCatToggle(cat)}

        <input type=checkbox id="incl-{cat}">
        <label class=checkbox for="incl-{cat}">
          <i class="fa-regular fa-square"></i>
          <i class="fa-solid fa-square-check"></i>
        </label>

      </h2>
      <ul>
        {#each compsData as {src, comp}, i}
          {@const compData: ComponentData = comp.data}
          {@const compPage: Component = comp.default}

          <li class=comp-item>
            <input type=checkbox id="incl-{compData.name}">
            <label class=checkbox for="incl-{compData.name}">
              <i class="fa-regular fa-square"></i>
              <i class="fa-solid fa-square-check"></i>
            </label>

            <input
              type=radio
              id="chk-{compData.name}"
              name="page-view"
              onchange={() => {
                state.currentId = compData.name;
                state.currentPage = compPage;
            }}>

            <label
              class=comp-name-label
              for="chk-{compData.name}"
            >
              {compData.name}
            </label>

            {#if compData.tags}
              <span class=tags>
                {#each compData.tags as tag }
                    {#if tag == "experimental"}
                      <i class="experimental fa-solid fa-vial"></i>
                    {/if}
                {/each}
              </span>
            {/if}

            <input type=checkbox id="fave-{compData.name}">
            <label class="checkbox fave" for="fave-{compData.name}">
              <i class="checked-not fa-regular fa-star"></i>
              <i class="checked fa-solid fa-star"></i>
            </label>
          </li>
        {/each}
      </ul>
    {/each}

    <p>
      Don't see what you're looking for?
      <br>
      <a href="https://github.com/nndda/Pitch/issues/new/choose">Suggest a component!</a> or even <a href="https://github.com/nndda/Pitch/issues/new/choose">contribute one!</a>
    </p>

  </div>

  <div class=action-cont>
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
