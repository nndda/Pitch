<script lang="ts">
  const
    {
      comp,
      // TODO:
      withCheckbox,
    }: {
      comp: string,
      withCheckbox?: true,
    } = $props()

  , liEl = document.querySelector(`#sidebar .comp-item[data-comp-name="${comp}"]`) as HTMLLIElement
  , liElChk = liEl.querySelector("input.comp-checkbox") as HTMLInputElement

  , uid = $props.id()
  ;

  let
    // svelte-ignore non_reactive_update
    chk: HTMLInputElement
  ;

  // svelte-ignore state_referenced_locally
  if (withCheckbox) {
    liElChk.addEventListener("change", ev => {
      chk.checked = liElChk.checked;
    });
  }

</script>

<button
  onclick={() => {
    (
      liEl.querySelector(`label.comp-name-label`) as HTMLLabelElement
    ).click();
  }}
>
  {#if withCheckbox}
    <label
      class="checkbox custom-tip"
      for="comp-ref-{uid}"
    >
      <input
        type="checkbox"
        id="comp-ref-{uid}"

        bind:this={chk}

        onchange={ev => {
          liElChk.checked = ev.currentTarget.checked;
        }}
      >
      <i class="fa-regular fa-square"></i>
      <i class="fa-solid fa-square-check"></i>
      <span class="custom-tip-content">
        add component
      </span>
    </label>
  {/if}
  {comp}
</button>
