<script lang="ts">
    import { onMount } from "svelte";
    import {
      inputStyling,
      itchStyling,
    } from "../../../states/runtime";

  const
    { html }:
    { html: string, }
    = $props()
  ;

  let
    shadowCont: HTMLElement
  ;

  onMount(() => {
    // TODO: these could be abstracted
    const shadow = shadowCont.attachShadow({ mode: "open", });
    shadow.adoptedStyleSheets = [
      itchStyling,
      inputStyling,
    ];

    const shadowWrapper = document.createElement("div");
    shadowWrapper.id = "wrapper";

    const shadowHTMLContainer = document.createElement("div");
    shadowHTMLContainer.innerHTML = html;
    shadowWrapper.appendChild(shadowHTMLContainer);

    shadow.appendChild(shadowWrapper);
  });
</script>

<div
  bind:this={shadowCont}
>

</div>
