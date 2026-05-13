<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import {
    Bar,
    PageRef,
  } from "./elements";

  import Tip from "./resources/tips.svelte";

  import Previews from "./previews/all.svelte";

  let
    tocToggleLabel: HTMLLabelElement
  ;

  onMount(() => {
    const
      tocToggle = document.getElementById("toc-toggle") as HTMLInputElement
    ;

    tocToggleLabel = document.querySelector("#toc-toggle + label") as HTMLLabelElement;

    if (tocToggle.checked) {
      tocToggle.click()
    }

    tocToggleLabel.classList.add("hidden");
  });

  onDestroy(() => {
    tocToggleLabel.classList.remove("hidden");
  });
</script>

<style lang="scss">
  @use "./home.scss";
</style>


<article class="home">

  <div class="banner-list">

    {#if !navigator.clipboard}
      <Bar
        name="WARNING!"
        type="warning"
      >
        It seems that your browser doesn't support the clipboard API :/ Try Pitch in a different browser.
      </Bar>
    {/if}

    <Bar
      name="Hey!"
    >
      Dev here. I'm struggling financially right now. If you like this project, please consider <PageRef name="Support Me?" label="donating"/> <i class="fa-solid fa-heart"></i>
    </Bar>

  </div>

  <header class="intro">

    <div>
      <img alt="" class="pitch-logo" src="/assets/pitch-icon-s.png" width="150">
    </div>

    <div class="header-content">
    <h2 class="pitch-title">
      Pitch<small>.css</small>
    </h2>

      <p class="labels">

        <PageRef name="Getting Started"/>
        <PageRef name="Showcase"/>

        <button>
          <i class="icon fa-brands fa-creative-commons"></i>
          CC0
        </button>

      </p>

      <p class="desc">
        Welcome to Pitch! a catalogue of CSS components, decorations, and tweaks, designed specifically for itch.io project pages.
      </p>
    </div>

    <div class="tips">

      <Tip/>

    </div>
  </header>

  <br>
  <!-- <hr> -->
  <br>

  <!-- <h2>Preview</h2> -->

  <Previews/>

  <br>

  <h2>License</h2>

  <ul class="custom-ul">
    <li>The Pitch web app is licensed under <a href="https://github.com/nndda/Pitch/blob/main/LICENSE" target="_blank" referrerpolicy="origin" rel="nofollow noopener">GNU AGPLv3</a>.</li>
    <li>The CSS components are licensed under <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en" target="_blank" referrerpolicy="origin" rel="nofollow noopener">CC0</a>.</li>
    <li>The placeholder content in the HTML preview and/or in the image preview may be subject to different license or copyright restrictions.</li>
  </ul>

  <footer>
    Copyright &copy; 2023-2026 nnda
  </footer>

</article>
