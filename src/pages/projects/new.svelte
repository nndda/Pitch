<script lang="ts">
  import PageRef from "../elements/page-ref.svelte";

  import {
    currentProject,
    projects,

    settings,
    theme,
    faves,
    inputs,
    codes,

    switchContext,
  } from "../../states/storage.svelte";

  import {
    catMeta,
    runtimeData,
  } from "../../states/runtime";

  const
    { mode = "new" }: { mode: "new" | "edit" } = $props()
  , currentProjectId = currentProject.get() ?? ""
  ;

  let
    nameField: HTMLInputElement
  , noticeSameName: boolean = $state(false)
  ;

  function onNameChange() {
    const
      newName = nameField.value
    ;

    if (mode === "edit") {
      noticeSameName = (
        (newName !== projects.state[currentProjectId].name)
          &&
        (newName in projects.state)
      )
    } else if (mode === "new") {
      noticeSameName = (
        newName in projects.state
      )
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

      bind:this={nameField}
      data-default={projects.state[currentProjectId].name}

      oninput={onNameChange}

      value={mode === "edit" ? projects.state[currentProjectId].name ?? "" : ""}
    />

    <span
      class="notice"
      class:hidden={!noticeSameName}
    >
      <i class="fa-solid fa-circle-info"></i>
      Project <b><q class="proj-name-display"></q></b> already exists
    </span>

    <label for="proj-url">
      itch.io URL <small>(optional)</small>
    </label>
    <input
      type="text"
      id="proj-url"
      autocomplete="off"
      placeholder="e.g. https://nnda.itch.io/pitch"
      value={mode === "edit" ? projects.state[currentProjectId].url : ""}
    />
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
    onclick={() => {
      function getValue(id: string): string {
        return (document.getElementById(id) as HTMLInputElement).value;
      }

      const projId = getValue("proj-name");

      if (mode === "edit") {
        for (const state of [
          settings,
          theme,
          faves,
          inputs,
          codes,
        ]) {
          state.changeContext(projId);
        }

        for (const cat in runtimeData) {
          runtimeData[cat].selection.changeContext(projId);
        }

        delete projects.state[currentProjectId];
        projects.flush();
      }

      projects.update(projId, {
        name: projId,
        url: getValue("proj-url"),
        scope: (document.querySelector(`#proj-new [name="proj-scope-select"]:checked`) as HTMLInputElement).value as Scope,
      });

      if (mode === "new") {
        theme.state.text_col = getValue("proj-theme-text");
        theme.state.link_col = getValue("proj-theme-link");
        theme.state.background = getValue("proj-theme-bg");
        theme.state.font_family = getValue("proj-theme-font")

        theme.duplicateLocal(projId);
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

  {#if mode === "edit" && Object.keys(projects.state).length > 1}
    <button
      class="no-style delete-btn"
      type="button"
      onclick={() => {
        if (
          confirm(`Delete project "${projects.state[currentProjectId].name ?? ""}"?`)
        ) {

          for (const state of [
            settings,
            theme,
            faves,
            inputs,
            codes,
          ]) {
            state.destroy();
          }

          for (const cat in runtimeData) {
            runtimeData[cat].selection.destroy();
          }

          delete projects.state[currentProjectId];
          projects.flush();

          switchContext(Object.keys(projects.state)[0]);

        }
      }}
    >
      <i class="fa-solid fa-trash"></i>
      Delete project
    </button>
  {/if}

</form>
