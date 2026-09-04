<script lang="ts">
  import PageRef from "../elements/page-ref.svelte";

  import { switchContext } from "../../states/storage.svelte";
  import {
    db,
    projectDefault,
    projectUpdate,
    projectCount,
    project,

    type ProjectsDB,
  } from "../../storage/db";


  import { currentPage } from "../../states/page.svelte";

  // TODO: typing headache
  // @ts-ignore
  const mode = currentPage?.attr?.mode! ?? "new";


  let
    noticeSameName: boolean = $state(false)
  ;

  // TODO: I feel like there's room for refactor
  async function onNameChange(ev: Event & {
      currentTarget: EventTarget & HTMLInputElement
  }) {
    const
      newName = ev.currentTarget.value
    , isNameAlreadyUsed = (await db.projects.get(newName) !== undefined)
    ;

    if (mode === "edit") {
      noticeSameName = (
        (newName !== $project?.name)
          &&
        isNameAlreadyUsed
      )
    } else if (mode === "new") {
      noticeSameName = isNameAlreadyUsed
    }

    if (noticeSameName) {
      (document.querySelector(".proj-name-display") as HTMLElement).textContent = newName;
    }
  }
</script>

<style lang="scss">
  @use "../../styles/variables" as *;

  #proj-new {
    max-width: 400px;
    margin: auto;

    & > h2 {
      margin-top: 1em;
    }
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: .5em;
    padding: 1em;
    margin-block: 1.5em;

    & > p {
      margin: .3em 0;
    }

    & label {
      padding: .3em 0;

      &:not(:first-child) {
        padding-top: 1em;
      }
    }

    & input[type="color"] {
      height:1.5em;
      min-width: 50%;
      padding: 0;
      margin: 0;
    }

    & input[type="text"] {
      min-width: 50%;
    }
  }

  .input-group {
    display: flex;
    align-items: center;

    & > label {
      flex-grow: 1;
    }
  }

  #proj-create {
    width: 100%;
  }

  [name="proj-scope-select"] {
    &:checked {
      & + label {
        font-weight: bold;
      }
    }

    &:not(:checked) + label {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .notice {
    font-size: .9em;
    color: $primary;
  }

  .delete-btn {
    width: 100%;
    margin: 1em 0;
    color:  #eb4646;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
</style>

{#if $project}

<form
  id="proj-new"
  onsubmit={ev => {
    ev.preventDefault();
  }}
>

  <h2>
    {#if mode === "new"}
      Create new project
    {:else if mode === "edit"}
      Edit project
    {/if}
  </h2>

  <fieldset class="group">
    <!-- <legend>Project's identity</legend> -->

    <label for="proj-name">
      Name
    </label>
    <input
      type="text"
      id="proj-name"
      autocomplete="off"
      placeholder="e.g. My Epic Project"

      data-default={$project.name}

      oninput={onNameChange}

      value={mode === "edit" ? $project.name ?? "" : ""}
    />

    <span
      class="notice"
      class:hidden={!noticeSameName}
    >
      <i class="fa-solid fa-circle-info"></i>
      Project <b><q class="proj-name-display"></q></b> already exists
    </span>

    <!--
    <label for="proj-url">
      itch.io URL <small>(optional)</small>
    </label>
    <input
      type="text"
      id="proj-url"
      autocomplete="off"
      placeholder="e.g. https://nnda.itch.io/pitch"
      value={mode === "edit" ? $project.url : ""}
    />
    -->
  </fieldset>

  <fieldset class="group">
    <legend>Scope</legend>

    <div class="input-group">
      <input
        type="radio"
        id="proj-scope-project"
        name="proj-scope-select"
        value="project"
        checked
      />

      <label for="proj-scope-project">
        <i class="fa-regular fa-circle checked-not"></i>
        <i class="fa-solid fa-circle-check checked"></i>
        Project page
      </label>

      <input
        type="radio"
        id="proj-scope-profile"
        name="proj-scope-select"
        value="profile"
      />

      <label for="proj-scope-profile">
        <i class="fa-regular fa-circle checked-not"></i>
        <i class="fa-solid fa-circle-check checked"></i>
        Profile page
      </label>

      <input
        type="radio"
        id="proj-scope-jam"
        name="proj-scope-select"
        value="jam"
      />

      <label for="proj-scope-jam">
        <i class="fa-regular fa-circle checked-not"></i>
        <i class="fa-solid fa-circle-check checked"></i>
        Jam page
      </label>
    </div>
  </fieldset>

  {#if mode === "new"}
    <fieldset class="group">
      <legend>
        Theme
        <small>(optional)</small>
      </legend>

      <p>
        You can change this anytime at <PageRef name="Theme"/>
      </p>

      <div class="input-group">
        <label for="proj-theme-text">
          Text
        </label>

        <input
          type="color"
          id="proj-theme-text"
          value="#eaeaea"
        />
      </div>

      <div class="input-group">
        <label for="proj-theme-link">
          Link
        </label>

        <input
          type="color"
          id="proj-theme-link"
          value="#fc3a78"
        />
      </div>

      <div class="input-group">
        <label for="proj-theme-bg">
          Background
        </label>

        <input
          type="color"
          id="proj-theme-bg"
          value="#171620"
        />
      </div>

      <div class="input-group">
        <label for="proj-theme-font">
          Font
        </label>

        <input
          type="text"
          id="proj-theme-font"
          value="Lato"
        />
      </div>
    </fieldset>
  {/if}

  <!-- <hr/> -->

  <button
    class="accent"
    id="proj-create"
    type="button"
    onclick={async () => {
      function getValue(id: string): string {
        console.log("id: ", id)
        return (document.getElementById(id) as HTMLInputElement).value;
      }

      const
        projId = getValue("proj-name")
      , isNameChanged = projId !== $project.name
      , newData: Partial<ProjectsDB> = {
          scope: (document.querySelector(`[name="proj-scope-select"]:checked`) as HTMLInputElement).value as Scope,

          ...(
            mode === "new" ? { theme: {
              text_col: getValue("proj-theme-text"),
              link_col: getValue("proj-theme-link"),
              background: getValue("proj-theme-bg"),
              font_family: getValue("proj-theme-font"),
            }} : {}
          ),
        }
      ;

      if (mode === "edit") {
        await projectUpdate(newData);

        if (isNameChanged) {
          await db.transaction("rw", db.projects, async () => {
            await db.projects.add({
              ...$project,
              name: projId,
            });
            await db.projects.delete($project.name)
          });
        }
      } else if (mode === "new") {
        await db.projects.add({
          ...projectDefault,
          ...newData,
          name: projId,
        });
      }

      switchContext(projId);
    }}
  >
    {#if mode === "new"}
      <i class="fa-solid fa-plus icon"></i>
      Create project
    {:else if mode === "edit"}
      <i class="fa-solid fa-pencil icon"></i>
      Update project
    {/if}
  </button>

  {#if mode === "edit" && $projectCount > 1}
    <button
      class="no-style delete-btn"
      type="button"
      onclick={async () => {
        if (
          confirm(`Delete project "${$project.name ?? ""}"?`)
        ) {
          await db.projects.delete($project.name);

          switchContext((await db.projects.toCollection().first())?.name!);
        }
      }}
    >
      <i class="fa-solid fa-trash"></i>
      Delete project
    </button>
  {/if}

</form>

{/if}
