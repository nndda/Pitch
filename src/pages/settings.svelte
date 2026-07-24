<script lang="ts">
  import {
    Dexie,
  } from "dexie";

  import {
    getProject,
    projectUpdate,
    // type ProjectsDB,
  } from "../storage/db";

  let
    settingsObj: Object = {}
  ;
  getProject().then(proj => {
    settingsObj = proj?.app.settings!;
  });

  // NOTE: still figuring out this for the below
  // type SettingsKey = keyof ProjectsDB["app"]["settings"]
  // NOTE: there has to be a better way.
  // current implementation can only have one-level of nested item :/
  interface SettingsData {
    [cat: string]: {
      [item: string]: SettingsItem | {
        [itemSub: string]: SettingsItem,
      },
    },
  }

  interface SettingsItem {
    name: string,
    type?: "boolean" | "string" | "number",
    desc?: string,
  }

  const
    settingsData: SettingsData = {
      css: {
        minify: {
          name: "Minify output",
          desc: "Minify the CSS output, reducing its size, at the cost of readability.",
        },
        isolateCommentSection: {
          name: "Isolate comment section",
          desc: "Disallow comment section from using the CSS components.",
        },
      },

      app: {
        autoCopy: {
          name: "Auto-copy",
          desc: "Copy the CSS, every time a component gets added/removed.",
        },
        showHomeTips: {
          name: "Show tips",
          desc: "Show tips box on the home page.",
        },

        sidebar: {
          showScopeColor: {
            name: "Color the component list item based on their scopes",
            desc: `Components that are partially compatible with the current scope will be colored yellow.<br> And components that are not compatible at all will be marked yet.`
          },
          showPlzzz: {
            name: "Show 👉👈 decoration",
          },
          showSelectedCount: {
            name: "Show selected component count",
          },
          categoryActionOnHover: {
            name: "Show category actions on hover",
            desc: `Actions on the category heading, such as expanding/collapsing or selecting/deselecting will be shown when hovered instead.`,
          },
          showFavedBadge: {
            name: "Always show component's favourite badge",
          },
          showWipComps: {
            name: "Show WIP components"
          },
          showWipPages: {
            name: "Show WIP pages",
          },
        },
      },
    }

  , nameMap: RecordString = {
      css: "CSS",
      app: "Pitch App",
      sidebar: "Sidebar",
    }
  ;
</script>

<style lang="scss">
  @use "../styles/variables" as *;

  #settings-form {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    gap:2em;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 1.75em;
    padding: 2em;

    & > legend {
      color: $accent;
      font-size: 2em;
      font-weight: bold;
      font-family: Ubuntu;
      letter-spacing: .05em;
    }

    & > .group {
      & > legend {
        font-size: 1.5em;
      }

      & label {
        font-size: 1.1em;
        font-weight: 400;
      }
    }
  }

  .input-group {
    display: flex;
    flex-direction: column;

    & > label {
      font-size: 1.2em;
      font-weight: bold;
      font-family: Ubuntu;

      & > i {
        margin-right: .5em;
      }

      &:hover {
        text-decoration: underline;
      }
    }

    & > p {
      margin-left: 2em;
      margin-bottom: 0;
    }
  }
</style>

{#snippet Item(
  id: string,
  itemData: SettingsItem | {
    [itemSub: string]: SettingsItem,
  },
)}
  <!-- TODO: the conditional would be kinda useless when other types gets added -->
  {#if itemData.type === "boolean" || !itemData.type}
    <div class="input-group">

      <input
        type="checkbox"
        id={id}

        checked={Dexie.getByKeyPath(settingsObj, id)}

        onchange={async ev => {
          // @ts-ignore
          await projectUpdate({ ["app.settings." + id]: ev.currentTarget.checked });
        }}
      />
      <label for={id}>
        <i class="fa-regular fa-circle checked-not"></i>
        <i class="fa-solid fa-circle-check checked"></i>
        {@html itemData.name}
        <!-- <code><small>{id}</small></code> -->
      </label>

      {#if itemData.desc}
        <p>{@html itemData.desc}</p>
      {/if}
    </div>
  {/if}
{/snippet}

<form
  id="settings-form"
  onsubmit={ev => {
    ev.preventDefault();
  }}
>
  {#each Object.keys(settingsData) as cat}
    <fieldset class="group">
      <legend>{nameMap[cat]}</legend>

      {#each Object.keys(settingsData[cat]) as item}
        {@const itemData = settingsData[cat][item]}

        {#if itemData.name}
          {@render Item(`${cat}.${item}`, itemData)}
        {:else}
          <fieldset class="group">
            <legend>{nameMap[item]}</legend>

            {#each Object.keys(itemData) as itemSub}
              {@render Item(`${cat}.${item}.${itemSub}`, (itemData as { [itemSub: string]: SettingsItem} )[itemSub])}
            {/each}
          </fieldset>
        {/if}
      {/each}
    </fieldset>
  {/each}
</form>
