<script lang="ts"> // ???? </script>

<style lang="scss">
  @use "../styles/variables" as *;

  .iframe-cont {
    border-radius: 24px;
    overflow: hidden;
    width: fit-content;
    height: fit-content;
  }

  h2, h3 {
    > i {
      color: $accent;
      margin-right: .5em;
    }
  }

  a.button {
    color: $text-col !important;
    text-decoration: none;
  }

  .donation-wrapper {
    display: flex;
    gap: 2.5em;

    & > .col-r {
      flex-grow: 1;
        max-width: 500px;
    }
  }
</style>

{#snippet SelfLink(
  name: string,
  url: string,
  asButton: boolean = false,
  icon: string = "",
)}
  <a
    target="_blank"
    rel="me nofollow noopener"
    href="https://{url}"
    class:button={asButton}
  >
    {#if icon}
      <i class="{icon} icon"></i>
    {/if}
    {name}
  </a>
{/snippet}

<article>

  <div class="donation-wrapper">
    <div class="col-r">
      <h2>
        <i class="fa-solid fa-heart"></i>
        Donations
      </h2>

      <p>
        If you want and are able to, please consider donating on Pitch's
        {@render SelfLink("itch.io", "nnda.itch.io", true, "fa-brands fa-itch-io")}
        page, or on my
        {@render SelfLink("Ko-fi", "ko-fi.com/nnda", true, "fa-brands fa-ko-fi")}
        page (or via the widget to the right)!
      </p>

      <!-- <p>
        You can also become a patron on my
        {@render SelfLink("Patreon", "patreon.com/nnda", true, "fa-brands fa-ko-fi")}
        page, for exclusive contents, devlogs, and more perks!
      </p> -->

      <br>

      <h2>Other Ways to Support</h2>
      <br>

      <h3>
        <i class="fa-solid fa-bullhorn"></i>
        Spread The Words!
      </h3>
      <p>
        {@render SelfLink("Rate", "nnda.itch.io/pitch/rate")} the project on itch.io,
        and {@render SelfLink("star", "github.com/nndda/Pitch")} the GitHub repository! share Pitch to fellow itch.io creators and anyone that might find it helpful!
      </p>

      <br>

      <h3>
        <i class="fa-solid fa-comments"></i>
        Feedbacks!
      </h3>
      <p>
        Found bugs? things you found annoying? feature ideas? component ideas?? feel free to submit them in the Pitch's itch.io page {@render SelfLink("comment section", "nnda.itch.io/pitch/comments")}, GitHub {@render SelfLink("issues tab", "github.com/nndda/Pitch/issues")}, or even to me directly!
      </p>

      <br>

      <h3>
        <i class="fa-solid fa-file-code"></i>
        Feeling Technical?
      </h3>
      <p>
        Pitch is open source, and is open to PRs!
      </p>

    </div>

    <div class="col-l">
      <h3>Ko-fi</h3>
      <div class="iframe-cont">

        <iframe
          id='kofiframe'
          src='https://ko-fi.com/nnda/?hidefeed=true&widget=true&embed=true&preview=true'
          style='border:none;padding:4px;background:transparent;'
          height='625'
          title='nnda'
        ></iframe>

      </div>
    </div>
  </div>

</article>
