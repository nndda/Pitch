<!-- TODO: disable ToC on home page -->

<script>
  import Accordion from "./home-preview/accordion.svelte";
  import InfoList from "./home-preview/info-list.svelte";
  import Callout from "./home-preview/callout.svelte";
  import Labels from "./home-preview/labels.svelte";
  import SpeedDial from "./home-preview/speed-dial.svelte";
  import DotLeader from "./home-preview/dot-leader.svelte";
  import TimelineList from "./home-preview/timeline-list.svelte";
  import TreeList from "./home-preview/tree-list.svelte";
  import Table from "./home-preview/table.svelte";
</script>

<style lang="scss">
  @use "./home.scss";
</style>

<article>

  <div class="custom-indev">
    <div>
      Under development
    </div>
  </div>

  <header class="intro">

    <img alt="" class="pitch-logo" src="/assets/pitch-icon-s.png" width="150">

    <h2 class="pitch-title">
      Pitch<small>.css</small>
    </h2>

    <p class="labels">

      <button class="">
        <i class="icon fa-solid fa-book-bookmark"></i>
        Getting started
      </button>

      <button class="">
        <i class="icon fa-brands fa-creative-commons"></i>
        CC0
      </button>

      <br>

      <button class="">
        <i class="icon fa-solid fa-star"></i>
        Rate
      </button>
      <button class="">
        <i class="icon fa-solid fa-heart"></i>
        Support this project!
      </button>

    </p>

    <p class="desc">
      Welcome to Pitch! the catalogue of CSS components, decorations, and tweaks, designed specifically for itch.io project pages.
    </p>
  </header>

  <br>
  <!-- <hr> -->
  <br>

  <!-- <h2>Preview</h2> -->

  <div class="preview-grid-wrapper">

    <div class="preview-grid">

      <Labels/>
      <InfoList/>
      <Accordion class="span-2"/>
      <Callout class="span-3"/>
      <SpeedDial/>
      <DotLeader class="span-2"/>
      <TimelineList class="span-2"/>
      <TreeList/>
      <Table class="span-3"/>

    </div>

  </div>

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
