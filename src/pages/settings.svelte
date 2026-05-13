<script lang="ts">
  import {
    settings,
    type RecordString,
  } from "../states/storage.svelte";
  type SettingsKey = keyof typeof settings.state;

  // NOTE: current implementation can only have one-level of nested item though :/
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
        use_layer: {
          name: `Use <code>@layer</code>`,
          desc: `Wrap the CSS output inside <code>@layer</code>, and provides another <code>@layer</code> for overriding the CSS.`,
        },
        isolate_comment_section: {
          name: "Isolate comment section",
          desc: "Disallow comment section from using the CSS components.",
        },
      },

      app: {
        auto_copy: {
          name: "Auto-copy",
          desc: "Copy the CSS, every time a component gets added/removed.",
        },
        show_home_tips: {
          name: "Show tips",
          desc: "Show tips box on the home page.",
        },

        sidebar: {
          show_plzzz: {
            name: "Show 👉👈 decoration",
          },
          show_selected_count: {
            name: "Show selected component count",
          },
          category_action_on_hover: {
            name: "Show category actions on hover",
          },
          show_faved_badge: {
            name: "Always show component's favourite badge",
          },
          show_wip_comps: {
            name: "Show WIP components"
          },
          show_wip_pages: {
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
    gap: 1.5em;
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
      /* margin: .5em 0; */
      /* text-indent: 2em; */
      margin-left: 2em;;
    }
  }
</style>

{#snippet Item(
  id: SettingsKey,
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

        checked={settings.state[id]}
        onchange={ev => {
          settings.update(
            id,
            ev.currentTarget.checked,
          )
        }}
      />
      <label for={id}>
        <i class="fa-regular fa-circle checked-not"></i>
        <i class="fa-solid fa-circle-check checked"></i>
        {@html itemData.name}
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
          {@render Item(`${cat}.${item}` as SettingsKey, itemData)}
        {:else}
          <fieldset class="group">
            <legend>{nameMap[item]}</legend>

            {#each Object.keys(itemData) as itemSub}
              {@render Item(`${cat}.${item}.${itemSub}` as SettingsKey, (itemData as { [itemSub: string]: SettingsItem} )[itemSub])}
            {/each}
          </fieldset>
        {/if}
      {/each}
    </fieldset>
  {/each}
</form>
