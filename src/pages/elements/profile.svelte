<script lang="ts">
  import {
    type Component,
  } from "svelte";

  import {
    currentProject,
    switchContext,
  } from "../../states/storage.svelte";

  import {
    projectCount,
    projectArr,
  } from "../../storage/db";

  import {
    switchPage,
    unselectSidebarPage,
  } from "../../states/components.svelte";

  // Projects
  import ProjectNew from "../projects/new.svelte";

</script>

<style lang="scss">
  @use "../../styles/variables" as *;

  .profile-cont {
    display: flex;
    align-items: center;
    gap: 1em;
    margin: .8em;
  }

  .avatar {
    overflow: hidden;
    border-radius: 7px;
    width: 50px;
    height: 50px;
    /* background: $text-col; */
  }

  .info {
    flex-grow: 1;
  }

  #pitch-displayname {
    font-size: 1.25em;
    font-family: Ubuntu;
  }

  .project-cont {
    display: flex;
    flex-direction: column;
  }

  .projects.btn-group {
    & > :is(button, .button) {
      padding: .35em;
      height: 2em;

      &:not(:last-child) {
        border-right: 1px solid $border-col;
      }
    }
  }

  .project-dropdown {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>

<div class="profile-cont">
  <div class="avatar">
    <img id="pitch-avatar" src="./icon.svg" alt="">
  </div>

  <div class="info">
    <div id="pitch-displayname">
      Pitch
    </div>
    <small id="pitch-userurl">v3.0.0</small>
  </div>
</div>

<div class="project-cont">
  <div class="btn-group projects">
    <button
      class="custom-tip"
      onclick={() => {
        unselectSidebarPage();
        switchPage("New project", ProjectNew as Component, { mode: "new" })();
      }}
      disabled={ $projectCount >= 50 }
    >
      <i class="fa-solid fa-plus"></i>

      <span class="custom-tip-content custom-right">
        Create new project
      </span>
    </button>

    <button
      class="custom-tip"
      onclick={() => {
        unselectSidebarPage();
        switchPage("Edit project", ProjectNew as Component, { mode: "edit" })();
      }}
    >
      <i class="fa-solid fa-pencil"></i>

      <span class="custom-tip-content custom-right">
        Edit project
      </span>
    </button>

    <select
      class="project-dropdown button"
      name="cars"
      id="cars"
      onchange={ev => {
        switchContext(ev.currentTarget.value);
      }}
    >
      {#each $projectArr as project, i}
        <option
          value={project.name}
          selected={currentProject.get() === project.name}
        >
          {project.name}
        </option>
      {/each}
    </select>
  </div>
</div>
