<script lang="ts">
  import { onMount, type Component } from "svelte";
  import {
    currentProject,

    user as userData,
    projects,
    theme,

    switchContext,

    type ItchProfile,
  } from "../../states/storage.svelte";

  import { switchPage } from "../../states/components.svelte";

  // Projects
  import ProjectNew from "../projects/new.svelte";

  const
    isInsideItch = typeof Itch !== "undefined"
  ;

  function unselectSidebarPage() {
    const currentPageList = document.querySelector(`input[name="page-view"]:checked`) as HTMLInputElement | null;

    if (currentPageList) {
      currentPageList.checked = false;
    }
  }

  onMount(() => {
    if (isInsideItch) {
      fetch(
        "https://itch.io/api/1/jwt/me",
        {
          headers: {
            Authorization: process.env.ITCHIO_API_KEY as string,
          },
        },
      )
        .then(res => res.json())
        .then(json => JSON.parse(json))
        .then(({ user }: { user: ItchProfile }) => {

          userData.merge(user);
          userData.flush();

          (
            document.getElementById("pitch-avatar") as HTMLImageElement
          ).src = user.cover_url;

          document.getElementById("pitch-displayname")!.textContent = user.display_name;
          document.getElementById("pitch-userurl")!.textContent = user.username + ".itch.io";

        })
      ;
    }
  });
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
    background: $text-col;
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
    /* gap: .5em; */
  }
  .project-label {
    display: none;
    padding: .4em .65em;
    font-size: .9em;
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
    <img id="pitch-avatar" src="https://itch.io/static/images/frog.png" alt="">
  </div>

  <div class="info">
    <div id="pitch-displayname">Guest</div>
    <small id="pitch-userurl">itch.io</small>
  </div>
  <!--
  <div>
    <button>
      <i class="fa-solid fa-right-from-bracket"></i>
    </button>
  </div>
  -->
</div>

<div class="project-cont">
  <div class="btn-group projects">
    <button
      class="custom-tip"
      onclick={() => {
        unselectSidebarPage();
        switchPage("New project", ProjectNew as Component, { mode: "new" })();
      }}
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
      {#each Object.keys(projects.state) as projId, i}
        <option
          value={projId}
          selected={currentProject.get() === projId || i === 0}
        >
          {projects.state[projId].name}
        </option>
      {/each}
    </select>
    <!--
    <button>
      <i class="fa-solid fa-square-caret-down"></i>
    </button>
    -->
  </div>
</div>
