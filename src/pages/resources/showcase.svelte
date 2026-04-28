<script lang="ts">
  import {shuffle} from "lodash";

  interface ShowcaseEntry {
    title?: string,
    desc?: string,

    author: {
      name: string,
      username: string,
    },

    itchioSlug?: string, // user.itch.io/project, user.itch.io
    image: string,

    type: Scope,
  }

  const authorNnda = {
    name: "nnda",
    username: "nnda",
  }

  // TODO: separate data to its own file
  const entries: ShowcaseEntry[] = shuffle([

    {
      author: authorNnda,
      image: "nnda.itch.io.png",

      type: "profile",
    },

    {
      title: "In Plain Sight",
      desc: "",
      author: authorNnda,

      itchioSlug: "nnda.itch.io/in-plain-sight",
      image: "nnda.itch.io__in-plain-sight.png",

      type: "project",
    },

    {
      title: "Paws 'n plates",
      desc: "",
      author: authorNnda,

      itchioSlug: "nnda.itch.io/paws-n-plates",
      image: "nnda.itch.io__paws-n-plates.png",

      type: "project",
    },

    {
      title: "Obscura",
      desc: "",

      author: authorNnda,

      itchioSlug: "nnda.itch.io/obscura",
      image: "nnda.itch.io__obscura.png",

      type: "project",
    },

    {
      title: "Floral Vintage",
      desc: "",

      author: authorNnda,

      itchioSlug: "nnda.itch.io/vintage-tilesets",
      image: "nnda.itch.io__vintage-tilesets.png",

      type: "project",
    },

  ]);
</script>

<style lang="scss">
  @use "./showcase.scss";
</style>

<article>

  <h2>Page Showcase</h2>

  <p>
    Below are some of the coolest &amp; most epic itch.io's pages that make use of Pitch to draw inspiration from!
  </p>

  <p>
    The items displayed are randomly sorted every time you open this page.
  </p>

  <div class="showcase-grid">

  {#each entries as {title, desc, author, itchioSlug, image, type}}

    <div class="entry">
      <h4 class="title">

        {#if type === "project"}

          <a href="https://{itchioSlug}/" target="_blank" rel="nofollow noopener">
            {title}
          </a>

          <span class="author">
            by
            <a href="https://{author.username}.itch.io/" target="_blank" rel="nofollow noopener">
              {author.name}
            </a>
          </span>

        {:else if type === "profile"}

          <a href="https://{author.username}.itch.io/" target="_blank" rel="nofollow noopener">
            {author.name}
          </a>

          <span class="author profile-page-tag">
            {author.username}.itch.io
          </span>

        {/if}

      </h4>

      <div class="thumb">
        <img src="/assets/showcase/{image}" alt="">
      </div>

      <div class="info">
        <div class="type">
          <i class="icon fa-solid
            {
              type === "project" ? "fa-gamepad" :
              type === "profile" ? "fa-user" :
              type === "jam" ? "fa-ranking-star" :
              ""
            }
          "></i>

          {type} page

        </div>
      </div>

    </div>

  {/each}

  </div>

  <br>
  <hr>
  <br>

  <h2>Submit Your Page!</h2>

  <p>
    Want to see your page here??
    <br>
    Submit one via:
  </p>

  <ul class="custom-ul">
    <li>
      Pitch's <a href="https://github.com/nndda/Pitch/issues" target="_blank" rel="nofollow noopener">GitHub repository issues tab</a>.
    </li>
    <li>
      Pitch's <a href="https://nnda.itch.io/pitch/comments" target="_blank" rel="nofollow noopener">itch.io page comment</a>.
    </li>
    <li>
      Message me directly:
      <ul>
        <li>
          <i class="fa-solid fa-envelope"></i>
          <a href="mailto:talk@nnda.dev" target="_blank" rel="nofollow noopener">talk@nnda.dev</a>
        </li>
        <li>
          <i class="fa-brands fa-bluesky"></i>
          <a href="https://bsky.app/profile/nnda.dev" target="_blank" rel="nofollow noopener">@nnda.dev</a>
        </li>
      </ul>
    </li>
  </ul>

  <h3>Submission Criteria</h3>

  <p>
    Your page must follows these criteria to be accepted in the showcase page:
  </p>

  <ul class="custom-ul">
    <li>
      The page must use at least <strong>3 Pitch's components, tweaks, or decorations</strong>.
      <ul>
        <li>
          The CSS components may be modified to your taste.
        </li>
      </ul>
    </li>
    <li>
      The page must not contain NSFW content.
    </li>
    <li>
      The page must follow <a href="https://itch.io/docs/creators/quality-guidelines" target="_blank" rel="nofollow noopener">itch.io Creator Guidelines.</a>
    </li>
  </ul>

</article>
