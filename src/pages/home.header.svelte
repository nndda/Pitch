<script lang="ts">
  import { fade } from "svelte/transition";

  import { Bar, PageRef, Skeleton } from "@elements";
  import { project } from "@db";

  import pitchLogo from "/icon.svg?url";
</script>

<style lang="scss">
  @use "../styles/variables" as *;
  @use "sass:color";

  .banner-list {
    position: sticky;
    top: .5em;

    display: flex;
    flex-direction: column;

    gap: .65em;
    z-index: 999;
  }

  .intro {
    display: grid;
    /* grid-gap: 1em; */
    /* display: grid; */
    /* grid-template-columns: auto 200px; */
    grid-template-areas:
      "app tips"
     "actions tips"
    ;
    margin-top: 1em;
    padding: 1em;

    min-height: 260px;

    /* background: $background-dark; */
  }

  .intro-app {
    grid-area: app;

    display: flex;
  }

  .user-actions {
    grid-area: actions;
  }

  .tips {
    position: relative;
    min-height: 230px;
    grid-area: tips;
  }

  .pitch-logo-container {
    position: relative;
    padding-right: 1em;
  }

  .pitch-title {
    font-family: Ubuntu;
    font-size: 2em;
    font-weight: 300;
    color: $accent;

    & > small {
      color: $text-col;
      font-family: "Roboto Mono";
    }
  }

  .header-content {
    flex-grow: 1;
  }

  .header-labels {
    display: flex;
    flex-wrap: wrap;
    gap: .25em .5em;
    margin: 0;
  }

  .desc {
    max-width: 400px;
    font-size: 1.1em;
  }

  .made-with-love {
    & > i {
      color: $accent;
    }
  }
</style>

<div class="banner-list">

  {#if !navigator.clipboard}
    <Bar
      name="WARNING!"
      type="warning"
    >
      It seems that your browser doesn't support the clipboard API :/ Try Pitch in a different browser.
    </Bar>
  {/if}

  <Bar name="Hey!">
    Dev here. I'm struggling financially right now. If you like this project, please consider <PageRef name="Support Me?" label="donating"/> <i class="fa-solid fa-heart"></i>
  </Bar>

</div>

<header class="intro">
  <div class="intro-app">
    <div class="pitch-logo-container">
      <img alt="" class="pitch-logo" src={pitchLogo} width="150">
    </div>

    <div class="header-content">
      <h2 class="pitch-title">
        Pitch<small>.css</small>
      </h2>

      <p class="header-labels">
        <button>
          <i class="icon fa-solid fa-box-open"></i>
          v{VERSION}
        </button>

        <button>
          <i class="icon fa-brands fa-creative-commons"></i>
          CC0
        </button>

        <button class="made-with-love">
          Made with
          <i class="fa-solid fa-heart"></i>
        </button>

        <!-- <b class="flex-break"></b> -->

        <!--
        <button class="in-development">
          <i class="icon fa-solid fa-road-barrier"></i>
          Development preview
        </button>
        -->
      </p>

      <p class="desc">
        Welcome to Pitch! a CSS toolkit made specifically for itch.io project pages.
      </p>
    </div>
  </div>

  <nav class="user-actions">
    <!--
    <i class="fa-solid fa-clock-rotate-left"></i>
    Continue where you left: <PageRef name="Settings"/>

    <button>
      <i class="fa-solid fa-plus"></i>
      New Project
    </button>

    <PageRef name="Getting Started"/>
    <PageRef name="Showcase"/>
    -->
  </nav>

  {#if $project?.app.settings.app.showHomeTips}
    <div class="tips">
      {#await import("./resources/tips.svelte")}
        <Skeleton/>
      {:then Tips}
        <div in:fade={{ duration: 150 }}>
          <Tips.default/>
        </div>
      {/await}
    </div>
  {/if}
</header>
