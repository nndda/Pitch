<script lang="ts">
  import { slug } from "@utils";

  const {
      name,
      data,
      onactive,
    }: {
      name: string,
      data: TabsData[],
      // TODO: onactive implementation kinda stinky atm
      onactive?: TabsOnActiveFn,
    } = $props()
  ;

  interface TabsData {
    name: string,
    icon?: string,
  }

  type TabsOnActiveFn = (name: string) => void;

</script>

<style lang="scss">
  @use "../styles/variables" as *;

  .tabs {
    display: flex;
    gap: .75em;
    border:0;
    padding: .5em 1em;;
    margin-top: 1em;
    margin-bottom: 1em;
    background: $background;
    border-radius: 7px;

    & input {
      display: none;;
    }

    & > label {
      display: flex;
      gap: .5em;
      // background: red;
      padding: .75em 1em;
      opacity: .8;

      &:not(:has(> input:checked)) {
        cursor: pointer;

        &:hover {
          text-decoration: underline 1px solid;
        }
      }

      &:has(> input:checked) {
        opacity: 1;
        font-weight: bold;
        border-bottom: 3px solid $accent;
      }
    }

  }
</style>

<fieldset class="tabs">
  {#each data as tab, i}
    <label>
      <input
        type="radio"
        name={slug(name)}
        id="tab-{slug(tab.name)}"
        checked={i === 0}

        onchange={ev => {
          if (onactive) {
            if (ev.currentTarget.checked) {
              onactive(name);
            }
          }
        }}
      />

      {#if tab.icon}
        <i class={tab.icon}></i>
      {/if}

      {tab.name}
    </label>
  {/each}
</fieldset>
